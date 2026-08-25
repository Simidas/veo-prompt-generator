/* Veo Prompt Generator — template-based prompt builder (v1, no backend). */
"use strict";

const DATA = {
  camera: {
    label: "Camera",
    options: [
      { id: "static-tripod", label: "Static tripod shot", fragment: "a locked-off static tripod shot", tip: "No camera movement. Best for dialogue and product detail — the scene moves, the camera doesn't." },
      { id: "dolly-in", label: "Slow dolly in", fragment: "a slow dolly-in that pushes toward the subject", tip: "Camera glides forward on rails. Builds tension or intimacy; ends closer than it starts." },
      { id: "pan-left", label: "Pan left to right", fragment: "a smooth pan from left to right revealing the scene", tip: "Camera rotates horizontally. Great for revealing a landscape or a second subject." },
      { id: "orbit", label: "Orbit around subject", fragment: "a slow orbital shot circling the subject", tip: "Camera arcs 180–360° around the subject. Reads as premium/heroic — common in ads." },
      { id: "handheld", label: "Handheld follow", fragment: "a handheld follow shot with subtle shake", tip: "Documentary energy. The slight instability makes action feel real and unpolished." },
      { id: "crane-up", label: "Crane up", fragment: "a rising crane shot lifting above the scene", tip: "Camera moves vertically up. Classic ending move — reveals scale and context." },
      { id: "fpv", label: "FPV drone flythrough", fragment: "a fast FPV drone flythrough weaving through the scene", tip: "First-person-view drone speed. High-energy openers; keep clips short." }
    ]
  },
  lighting: {
    label: "Lighting",
    options: [
      { id: "golden-hour", label: "Golden hour", fragment: "warm golden-hour sunlight with long soft shadows", tip: "The hour after sunrise or before sunset. Flattering, cinematic, and the safest crowd-pleaser." },
      { id: "neon-night", label: "Neon night city", fragment: "moody neon night lighting with wet-street reflections", tip: "Cyberpunk staple. Colored practicals (signs, headlights) do the storytelling." },
      { id: "soft-studio", label: "Soft studio light", fragment: "clean soft studio lighting with a gradient background", tip: "Even, shadowless light. Default for product shots and talking-head clips." },
      { id: "harsh-noon", label: "Harsh midday sun", fragment: "harsh midday sun with hard shadows and high contrast", tip: "Edgy and realistic. Hard shadows carve shapes — use on purpose, not by accident." },
      { id: "candlelit", label: "Candlelit interior", fragment: "intimate candlelit interior with flickering warm light", tip: "Small warm sources falling off into darkness. Instant period or romance mood." },
      { id: "overcast", label: "Overcast daylight", fragment: "flat overcast daylight with muted colors", tip: "A giant softbox in the sky. Neutral, honest tone — good for documentary looks." },
      { id: "volumetric", label: "Volumetric rays", fragment: "volumetric light rays cutting through haze", tip: "Visible beams through fog/dust. Adds depth and a wow frame almost anywhere." }
    ]
  },
  audio: {
    label: "Audio",
    options: [
      { id: "ambient", label: "Native ambient sound", fragment: "native ambient sound matching the scene, no dialogue", tip: "Veo generates synced environmental audio. State the key sounds you want to hear." },
      { id: "dialogue", label: "Short dialogue line", fragment: 'one short line of dialogue delivered naturally, with ambient sound underneath', tip: "Keep it to one line and put the exact words in quotes in the subject field." },
      { id: "voiceover", label: "Documentary voiceover", fragment: "a calm documentary-style voiceover over natural sound", tip: "Narrator explains while the scene plays. Works with slow camera moves." },
      { id: "music-only", label: "Music-driven, no dialogue", fragment: "driving music with no dialogue, sound design synced to the action", tip: "Let cuts and hits land on the beat; describe the music genre and tempo." },
      { id: "no-audio", label: "No audio", fragment: "no audio", tip: "Use when you'll add your own sound in the edit." }
    ]
  },
  style: {
    label: "Style",
    options: [
      { id: "cinematic-35", label: "Cinematic 35mm film", fragment: "shot on 35mm film with cinematic color grading, shallow depth of field", tip: "The default 'looks expensive' setting. Film grain + shallow focus." },
      { id: "documentary", label: "Documentary realism", fragment: "realistic documentary look, natural colors, no stylization", tip: "Feels like found footage or news. Avoid words like 'epic' here." },
      { id: "anime", label: "Anime", fragment: "vibrant anime style with expressive linework and bold colors", tip: "Strong for stylized action; keep camera moves simple to avoid artifacts." },
      { id: "claymation", label: "Claymation", fragment: "handmade claymation style with visible fingerprints and tactile textures", tip: "Charming and shareable; pairs well with studio lighting." },
      { id: "vintage-film", label: "Vintage 1970s film", fragment: "vintage 1970s film look with faded colors and gentle grain", tip: "Retro nostalgia filter. Faded warm palette, soft contrast." },
      { id: "hyperreal-4k", label: "Hyperreal 4K", fragment: "hyperrealistic 4K detail, crisp textures, HDR", tip: "Maximum fidelity showcase. Demands a clean, well-lit subject." },
      { id: "product-ad", label: "Sleek product ad", fragment: "sleek commercial product-ad aesthetic with seamless transitions", tip: "Hero product on pedestal, orbit camera, soft studio light." }
    ]
  }
};

const PRESETS = {
  "cinematic-trailer": {
    name: "Cinematic Trailer",
    subject: "A lone hiker stops at a cliff edge as mountains stretch to the horizon",
    selections: { camera: "crane-up", lighting: "golden-hour", audio: "music-only", style: "cinematic-35" }
  },
  "product-hero": {
    name: "Product Hero",
    subject: "A matte-black wireless earbud case rotating slowly on a stone pedestal",
    selections: { camera: "orbit", lighting: "soft-studio", audio: "ambient", style: "product-ad" }
  },
  "street-food": {
    name: "Street Food Reel",
    subject: "A chef tosses noodles in a flaming wok, sparks flying toward the lens",
    selections: { camera: "handheld", lighting: "neon-night", audio: "ambient", style: "documentary" }
  },
  "anime-action": {
    name: "Anime Action",
    subject: "A young swordswoman leaps between rooftops, cloak snapping in the wind",
    selections: { camera: "fpv", lighting: "volumetric", audio: "music-only", style: "anime" }
  },
  "cozy-clay": {
    name: "Cozy Claymation",
    subject: "A tiny clay baker pulls steaming bread from a miniature oven",
    selections: { camera: "static-tripod", lighting: "candlelit", audio: "ambient", style: "claymation" }
  },
  "retro-roadtrip": {
    name: "Retro Roadtrip",
    subject: "A convertible cruises a desert highway past vintage billboards",
    selections: { camera: "pan-left", lighting: "harsh-noon", audio: "dialogue", style: "vintage-film" }
  },
  "fpv-warehouse": {
    name: "FPV Warehouse",
    subject: "An FPV drone weaves between robotic arms assembling electric cars",
    selections: { camera: "fpv", lighting: "volumetric", audio: "ambient", style: "hyperreal-4k" }
  },
  "rain-window": {
    name: "Rain Window",
    subject: "Rain streaks down a café window as a woman writes in a notebook, saying \"some days you just start over\"",
    selections: { camera: "dolly-in", lighting: "overcast", audio: "dialogue", style: "cinematic-35" }
  },
  "sunrise-yoga": {
    name: "Sunrise Yoga",
    subject: "A yogi flows through a slow sun salutation on a rooftop as the city wakes below",
    selections: { camera: "static-tripod", lighting: "golden-hour", audio: "ambient", style: "documentary" }
  },
  "storm-chase": {
    name: "Storm Chase",
    subject: "A photographer braves a prairie storm, hair whipping, as a supercell churns on the horizon",
    selections: { camera: "handheld", lighting: "overcast", audio: "ambient", style: "hyperreal-4k" }
  },
  "kid-scifi": {
    name: "Backyard Spaceship",
    subject: "A kid in a cardboard spaceship \"launches\" from a suburban backyard, leaves swirling up like rocket exhaust",
    selections: { camera: "crane-up", lighting: "golden-hour", audio: "music-only", style: "cinematic-35" }
  },
  "forest-fairy": {
    name: "Forest Glow",
    subject: "Tiny glowing spirits drift between mossy tree roots as a fox watches quietly",
    selections: { camera: "dolly-in", lighting: "volumetric", audio: "ambient", style: "cinematic-35" }
  },
  "dj-set": {
    name: "Rooftop DJ",
    subject: "A DJ drops a build-up as the crowd raises hands against a skyline of lasers",
    selections: { camera: "orbit", lighting: "neon-night", audio: "music-only", style: "hyperreal-4k" }
  },
  "vintage-diner": {
    name: "Vintage Diner",
    subject: "A waitress slides a milkshake down a chrome diner counter to a teenager with a pompadour",
    selections: { camera: "pan-left", lighting: "soft-studio", audio: "dialogue", style: "vintage-film" }
  },
  "waterfall-sweat": {
    name: "Waterfall Finish",
    subject: "A trail runner crests a ridge and stops, chest heaving, at a thundering waterfall",
    selections: { camera: "crane-up", lighting: "golden-hour", audio: "ambient", style: "documentary" }
  },
  "museum-heist": {
    name: "Museum Heist",
    subject: "A thief in white gloves slips between laser beams toward a glowing diamond exhibit",
    selections: { camera: "fpv", lighting: "volumetric", audio: "ambient", style: "cinematic-35" }
  },
  "snowy-cabin": {
    name: "Snowy Cabin",
    subject: "Smoke curls from a stone chimney as snow buries a lone cabin deep in pine forest",
    selections: { camera: "static-tripod", lighting: "overcast", audio: "ambient", style: "hyperreal-4k" }
  },
  "robot-barista": {
    name: "Robot Barista",
    subject: "A brass robot arm pulls an espresso shot with surgical precision as steam curls upward",
    selections: { camera: "orbit", lighting: "soft-studio", audio: "ambient", style: "product-ad" }
  },
  "skate-alley": {
    name: "Skate Alley",
    subject: "A skateboarder ollies over a puddle reflecting neon signs, board spinning underfoot",
    selections: { camera: "handheld", lighting: "neon-night", audio: "music-only", style: "documentary" }
  },
  "midnight-library": {
    name: "Midnight Library",
    subject: "A student pulls a glowing book from a midnight library shelf, dust motes swirling in the beam",
    selections: { camera: "dolly-in", lighting: "volumetric", audio: "ambient", style: "cinematic-35" }
  }
};

function getOption(catId, optId) {
  return DATA[catId].options.find(o => o.id === optId) || DATA[catId].options[0];
}

function state() {
  const s = { subject: "", camera: "", lighting: "", audio: "", style: "" };
  for (const cat of Object.keys(DATA)) {
    s[cat] = document.getElementById("sel-" + cat).value;
  }
  const subj = document.getElementById("subject-input");
  s.subject = subj ? subj.value.trim() : "";
  return s;
}

function buildTextPrompt(s) {
  if (!s.subject) return "";
  const cam = getOption("camera", s.camera);
  const light = getOption("lighting", s.lighting);
  const aud = getOption("audio", s.audio);
  const sty = getOption("style", s.style);
  let p = `${s.subject}. Captured as ${cam.fragment}, lit by ${light.fragment}, ${sty.fragment}. Audio: ${aud.fragment}.`;
  p = p.replace(/\s+/g, " ").trim();
  return p.charAt(0).toUpperCase() + p.slice(1);
}

function buildJsonPrompt(s) {
  if (!s.subject) return "";
  return JSON.stringify({
    subject: s.subject,
    camera: getOption("camera", s.camera).label.toLowerCase(),
    lighting: getOption("lighting", s.lighting).label.toLowerCase(),
    audio: getOption("audio", s.audio).label.toLowerCase(),
    style: getOption("style", s.style).label.toLowerCase(),
    output: { format: "text prompt + json", model_targets: ["veo-3", "veo-3.1"] }
  }, null, 2);
}

let outputFormat = "text";

function render() {
  const s = state();
  const out = document.getElementById("prompt-output");
  const prompt = outputFormat === "text" ? buildTextPrompt(s) : buildJsonPrompt(s);
  out.textContent = prompt || "Describe your scene above — your prompt appears here instantly. No sign-up, no limits on template prompts.";
  for (const cat of Object.keys(DATA)) {
    const opt = getOption(cat, s[cat]);
    const tip = document.getElementById("tip-" + cat);
    if (tip) tip.textContent = opt.tip;
  }
}

function copyPrompt() {
  const text = document.getElementById("prompt-output").textContent;
  if (!text || text.startsWith("Describe your scene")) return;
  const btn = document.getElementById("copy-btn");
  const done = () => {
    btn.classList.add("copied");
    btn.textContent = "Copied!";
    setTimeout(() => { btn.classList.remove("copied"); btn.textContent = "Copy prompt"; }, 1500);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
  } else {
    fallbackCopy(text, done);
  }
}

function fallbackCopy(text, done) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand("copy"); done(); } catch (e) { /* no-op */ }
  document.body.removeChild(ta);
}

function applyPreset(id) {
  const p = PRESETS[id];
  if (!p) return;
  const subj = document.getElementById("subject-input");
  if (subj) subj.value = p.subject;
  for (const [cat, optId] of Object.entries(p.selections)) {
    document.getElementById("sel-" + cat).value = optId;
  }
  document.querySelectorAll(".chip").forEach(c => c.classList.toggle("active", c.dataset.preset === id));
  render();
}

function initGenerator() {
  for (const cat of Object.keys(DATA)) {
    const sel = document.getElementById("sel-" + cat);
    if (!sel) continue;
    for (const o of DATA[cat].options) {
      const optEl = document.createElement("option");
      optEl.value = o.id;
      optEl.textContent = o.label;
      sel.appendChild(optEl);
    }
    sel.addEventListener("change", render);
  }
  const subj = document.getElementById("subject-input");
  if (subj) subj.addEventListener("input", render);

  document.querySelectorAll(".chip").forEach(c => {
    c.addEventListener("click", () => applyPreset(c.dataset.preset));
  });

  document.querySelectorAll(".toggle button").forEach(b => {
    b.addEventListener("click", () => {
      outputFormat = b.dataset.format;
      document.querySelectorAll(".toggle button").forEach(x => x.classList.toggle("active", x === b));
      render();
    });
  });

  const copyBtn = document.getElementById("copy-btn");
  if (copyBtn) copyBtn.addEventListener("click", copyPrompt);

  const params = new URLSearchParams(window.location.search);
  if (params.get("preset")) applyPreset(params.get("preset"));
  render();
}

document.addEventListener("DOMContentLoaded", initGenerator);
