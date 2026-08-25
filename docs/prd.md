# PRD v0 — Veo Prompt Generator

- 项目：`veo-prompt-generator`
- 阶段：02-product
- 日期：2026-08-25
- 状态：v0.1（Owner 已确认商业化：v1 免费 + v1.1 Pro 套餐；域名首选 veopromptgenerator.com，待购买）

## 1. 机会读取（来自 01-research）

- 主词：**veo 3 prompt generator**（变体：veo 3.1 prompt generator、veo prompt builder、cinematic veo prompts）
- 意图：transactional/commercial——用户要一个能立刻产出可用 prompt 的工具，不是读文章。
- SERP 缝隙：Top 10 由 GitHub 个人项目、editingtools.io、promptark.net 等小站占据；无巨头独占，交互深度普遍浅（多数只是下拉选选项）。
- 竞品最低能力（competitive minimum）：选择式 prompt 构建 + 复制按钮 + 免注册。
- 风险：Google 官方 Prompt Guide 承担定义性流量；Veo 版本迭代快，需跟进 `veo 3.1`、未来的 `veo 4` 换版词。
- 证据缺口：volume/KD/Trends 数字未验证（`missing_keyword_tool_access`）——不影响 PRD 结构，影响上线优先级判断。

## 2. ICP

| 用户 | 场景 | 痛点 | 付费/转化信号 |
|---|---|---|---|
| **A. 短视频创作者 / TikTok·Reels 博主**（主 ICP） | 想用 Veo 3 做爆款短视频，不会写结构化 prompt | 反复试错浪费生成额度 | 对"爆款模板/风格预设"需求强，Pro 转化明确 |
| B. 独立营销人 / 小代理 | 给客户出 AI 视频素材 | 需要可复用、可交付的 prompt 资产 | 目录页/批量预设吸引力强 |
| C. AI 尝鲜用户 | 看到别人 Veo 作品想复刻 | 不知道描述语言（镜头/音频/光影术语） | 免费用量引流，转化弱 |

主 ICP 选 A：痛点急（生成额度贵，试错成本真金白银）、可触达（TikTok/Reddit r/aivideo）、付费路径清晰。

## 3. 定位与边界

- 一句话定位：**"The fastest way to write Veo 3 prompts that actually look good"——选择式 + 术语库的 Veo prompt 生成器。**
- 替代方案：官方 Prompt Guide（定义性，非工具）、GitHub 开源 generator（无 SEO 无体验）、ChatGPT 通用对话（无结构、无 Veo 术语约束）。
- 差异化：把 cinematic 术语（镜头运动、灯光、音频、字幕规则）做成**结构化选项 + 实时预览拼装**，比竞品的浅下拉更深一层；每类选项附 3 秒术语解释，服务 ICP C 的学习需求。
- **NOT-DO（v1 明确不做）**：
  - 不实际生成视频（不接 Veo API，不出生成额度）
  - 无登录、无支付、无上传、无邮件
  - 不做多模型（Sora/Runway/Pika）聚合，v1 只做 Veo
  - 不做 UGC prompt 市场或评论系统
  - 不爬取/复制官方指南内容成镜像页

## 4. 站点类型

工具站：单页交互 generator 为核心 + 少量长尾内容页引流。交互基线 = 竞品最低能力（构建 + 复制 + 免注册）再加一层：结构化 JSON 输出切换、术语提示。

## 5. 页面矩阵（Route Contract 初稿）

| URL | index | 主词 | H1 | CTA | schema | 备注 |
|---|---|---|---|---|---|---|
| `/` | ✅ | veo 3 prompt generator | Veo 3 Prompt Generator | 复制 prompt | WebApplication + FAQ | 核心工具页 |
| `/veo-3-1-prompt-generator` | ✅ | veo 3.1 prompt generator | Veo 3.1 Prompt Generator | 复制 prompt | WebApplication | 换版词承接，v1.1 上线 |
| `/veo-3-prompt-examples` | ✅ | veo 3 prompt examples | Veo 3 Prompt Examples | Try this prompt | CollectionPage | 20+ 真实可用示例，内链回 `/` |
| `/veo-3-prompt-guide` | ✅ | how to write veo 3 prompts | How to Write Veo 3 Prompts | Use the generator | Article | 术语教学，不镜像官方指南 |
| `/about` | ✅ | — | About | — | — | E-E-A-T 基础页 |
| `/privacy` | ✅ | — | Privacy Policy | — | — | 无 cookie/无追踪基线 + 分析声明 |
| `/terms` | ✅ | — | Terms of Service | — | — | |

- 内链：examples/guide 每条示例/术语均链回 `/`；`/` 页脚链长尾页。
- 素材需求：示例页需要"prompt → 效果描述"配对文案（不用他人视频素材，避免版权风险——效果用文字描述或自生成占位）。

## 6. Data Contract（前端可消费）

```jsonc
// GET /api/prompt-templates（静态 JSON 即可，v1 无需动态后端）
{
  "version": "1",
  "categories": {
    "camera":   { "options": [{ "id": "dolly-in", "label": "Dolly in", "term_tip": "..." }] },
    "lighting": { "options": [ /* ... */ ] },
    "audio":    { "options": [ /* ... */ ] },
    "style":    { "options": [ /* ... */ ] },
    "subject":  { "free_text": true }
  },
  "presets": [ { "id": "cinematic-trailer", "name": "Cinematic Trailer", "selections": { } } ]
}
```

- v1 默认**本地模板拼装**，不依赖 AI Key；`AI_ENABLED=false`。
- 若后续启用 Workers AI：输出仍走同一 JSON 形状，前端无感。
- 无数据库、无用户数据写入 → 无 D1/R2/KV 需求。

## 7. P0 用户任务（QA 验收基准）

1. 落地 `/`，30 秒内不读文档拼出一条完整 Veo 3 prompt 并复制成功。
2. 切换 Text / JSON 输出格式，两者内容一致。
3. 悬停任一术语选项能看到 3 秒内可读完的解释。
4. 从 `/veo-3-prompt-examples` 点任一示例，一键载入 generator 并还原该 prompt。
5. 移动端完成 1–4。

## 8. 风险

- P0：Veo 4 发布导致主词贬值 → 缓解：路由结构支持快速加 `/veo-4-prompt-generator`。
- P1：SERP 竞品跟进同质化 → 靠术语深度与 examples 内容量保持差距。
- P1：volume 未验证即投入 → 建议上线前补关键词工具证据或以极小成本（纯静态）快速上线对冲。

## 9. 下游交接摘要

- 状态：[NEEDS_REVIEW]（v0 草案，待 Owner 确认域名 + 商业化）
- 核心判断：工具站，单页 generator + 3 个长尾页，v1 零后端零凭据，Cloudflare Pages 纯静态可上线。
- 已确认：目标市场、站点类型、主词、NOT-DO、页面矩阵、商业化（v1 免费 + v1.1 Pro）。
- 待确认：域名购买付款、AI 开关、Trends 证据。
- 下一阶段：03-pricing（为 v1.1 Pro 设计 Free/Pro 结构）。
- 不能假设：域名已购买；Veo 3.1 是当前最新版本（写文案前需核实版本号）。
