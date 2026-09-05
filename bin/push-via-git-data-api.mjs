// Push local HEAD tree content to GitHub via Git Data API (git 443 egress blocked).
// Aligns the FULL remote tree (content + mode + deletions) with local HEAD, so the
// resulting remote tree SHA must equal `git rev-parse HEAD^{tree}` before the ref is moved.
// Usage: GH_TOKEN=$(gh auth token) node bin/push-via-git-data-api.mjs <commit-message>
import { createHash } from "node:crypto";
import { execSync } from "node:child_process";

const token = process.env.GH_TOKEN;
if (!token) { console.error("GH_TOKEN missing"); process.exit(1); }
const repo = "Simidas/veo-prompt-generator";
const message = process.argv[2];
if (!message) { console.error("usage: node push-via-git-data-api.mjs <commit-message>"); process.exit(1); }

const api = (path, opts = {}) =>
  fetch(`https://api.github.com${path}`, {
    ...opts,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      ...(opts.headers || {}),
    },
  }).then(async (r) => {
    const body = await r.text();
    const j = body ? JSON.parse(body) : null;
    if (!r.ok) throw new Error(`${r.status} ${body.slice(0, 300)}`);
    return j;
  });

const gitBlobSha = (buf) =>
  createHash("sha1").update(`blob ${buf.length}\0`).update(buf).digest("hex");

// Local HEAD: {path -> {mode, sha}} (blobs only)
const localEntries = new Map(
  execSync("git ls-tree -r HEAD", { encoding: "utf8" })
    .split("\n").filter(Boolean)
    .map((line) => {
      const [, mode, type, sha] = line.match(/^(\d+) (\w+) (\S+)\t(.+)$/);
      return [/* path */ sha === undefined ? "" : line.split("\t")[1], { mode, sha }];
    })
    .map(([k, v]) => [k, v])
);

const ref = await api(`/repos/${repo}/git/ref/heads/main`);
const baseSha = ref.object.sha;
const baseCommit = await api(`/repos/${repo}/git/commits/${baseSha}`);
const baseTreeSha = baseCommit.tree.sha;
const remoteTree = await api(`/repos/${repo}/git/trees/${baseTreeSha}?recursive=1`);
if (remoteTree.truncated) throw new Error("remote tree listing truncated; repo too large for this script");
const remoteEntries = new Map(
  remoteTree.tree.filter((e) => e.type === "blob").map((e) => [e.path, { mode: e.mode, sha: e.sha }])
);
console.log(`remote main: ${baseSha} | local HEAD: ${execSync("git rev-parse HEAD").toString().trim()}`);

const tree = [];
let updated = 0, removed = 0;
for (const [path, { mode, sha }] of localEntries) {
  const r = remoteEntries.get(path);
  if (r && r.sha === sha && r.mode === mode) continue;
  if (!r || r.sha !== sha) {
    const buf = execSync(`git show HEAD:${JSON.stringify(path)}`);
    if (gitBlobSha(buf) !== sha) throw new Error(`local blob sha recompute mismatch for ${path}`);
    const up = await api(`/repos/${repo}/git/blobs`, {
      method: "POST",
      body: JSON.stringify({ content: buf.toString("base64"), encoding: "base64" }),
    });
    if (up.sha !== sha) throw new Error(`blob sha mismatch for ${path}`);
  }
  tree.push({ path, mode, type: "blob", sha });
  updated++;
  console.log(`  set ${mode} ${path} -> ${sha.slice(0, 8)}`);
}
for (const path of remoteEntries.keys()) {
  if (!localEntries.has(path)) {
    tree.push({ path, mode: "100644", type: "blob", sha: null });
    removed++;
    console.log(`  delete ${path}`);
  }
}
if (tree.length === 0) { console.log("remote tree already identical to local HEAD — nothing to push"); process.exit(0); }

const newTree = await api(`/repos/${repo}/git/trees`, {
  method: "POST",
  body: JSON.stringify({ base_tree: baseTreeSha, tree }),
});
const localTree = execSync("git rev-parse HEAD^{tree}").toString().trim();
console.log(`changes: ${updated} set, ${removed} deleted | new remote tree: ${newTree.sha} | local HEAD tree: ${localTree}`);
if (newTree.sha !== localTree) {
  console.error("ABORT: resulting remote tree still differs from local HEAD tree — ref NOT updated");
  process.exit(1);
}

const commit = await api(`/repos/${repo}/git/commits`, {
  method: "POST",
  body: JSON.stringify({ message, tree: newTree.sha, parents: [baseSha] }),
});
const patched = await api(`/repos/${repo}/git/refs/heads/main`, {
  method: "PATCH",
  body: JSON.stringify({ sha: commit.sha, force: false }),
});
console.log(`remote main: ${baseSha.slice(0, 8)} -> ${patched.object.sha} (tree ${newTree.sha.slice(0, 8)} identical to local HEAD)`);
