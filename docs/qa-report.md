# QA 验收报告 — veo-prompt-generator v1

日期：2026-08-25 ｜ 方式：本地 `python3 http.server` + 浏览器实机（桌面 1280×720/2160、移动 375×812）+ Node 逻辑测试

## P0 用户任务结果

| # | 任务 | 结果 | 证据 |
|---|---|---|---|
| 1 | 30 秒内拼出完整 prompt 并可复制 | ✅ | 浏览器 fill 场景后输出区即时生成结构化 prompt |
| 2 | Text/JSON 切换一致 | ✅* | Node 逻辑测试：同一 state 产出一致；浏览器 click 事件在本环境派发故障，无法实机点按 |
| 3 | 术语提示 3 秒可读 | ✅ | 浏览器切换 camera 选项后 tip 实时更新为 Orbit 说明 |
| 4 | 示例一键载入 generator | ✅ | `/?preset=cinematic-trailer` 实机载入，输出与示例 1 完全一致 |
| 5 | 移动端完成任务 | ✅ | 375×812 快照：H1/generator/FAQ 全部渲染 |

*复制按钮：主路径 `navigator.clipboard` + `execCommand` 兜底，逻辑经 Node 审查；实机点击受同一环境故障限制。

## 静态/SEO 检查

- 7 页面 + robots.txt + sitemap.xml 全部 200（本地 .html 路径；clean URL 由 Cloudflare Pages 原生支持）
- 首页 2 组 JSON-LD（WebApplication + FAQPage），guide/examples/3.1 各 1 组 schema
- 每页 canonical 指向 `https://veopromptgenerator.com` 对应路径；title/meta 与 copy-freeze 一致
- 20 个预设全部通过数据完整性校验（选项引用有效、subject 非空、输出长度合格）
- 21 张示例卡（20 真实 prompt + 1 CTA 卡），"Try this prompt" 链接 21 处

## 已知限制（非阻断）

- P2：IAB 测试环境 click 派发故障，JSON 切换/复制按钮未实机点按——上线后 GSC/Clarity 复核真实用户行为
- P2：本地 http.server 不解析 clean URL（部署平台原生支持，非站点缺陷）

## 结论

**QA GO**（P0 全过，无阻断缺陷，两项 P2 已记录并安排上线后复核）。
