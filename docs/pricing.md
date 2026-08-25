# 定价报告 v0 — veo-prompt-generator

- 阶段：03-pricing
- 日期：2026-08-25
- 前提：v1 免费上线（纯静态，零边际成本）；v1.1 引入 Pro（Owner 已确认）

## 1. 竞品锚点

| 竞品 | 定价 | 依据 |
|---|---|---|
| editingtools.io veo generator | 免费 | 01-research SERP 实扫 |
| promptark.net | 免费 + 付费计划（细节未核）`[待确认]` | 01-research SERP 实扫 |
| GitHub 开源 generator | 免费 | 同上 |
| 替代方案：ChatGPT Plus | $20/月（公开常识价，写文案前复核）`[待确认]` | 用户现状成本 |
| 替代方案：Gemini AI Pro（含 Veo 额度） | ~$20/月档 `[待确认]` | 用户的真实付费参照系 |

判断： SERP 上免费是基线，**不能对基础 prompt 生成收费**；付费锚点是"帮你省掉 ChatGPT/Veo 额度试错"，锚定在 $20/月参照系下打 3-4 折是安全区间。

## 2. 成本模型

- v1（纯静态模板拼装）：Cloudflare Pages 免费额度内，**免费用户边际成本 ≈ 0**，无滥用风险（无后端调用）。
- v1.1 Pro 的唯一真实边际成本 = AI 增强生成的每调用成本（Workers AI 或 Gemini API）。
- 成本公式（后端按此封顶）：

```text
单 Pro 用户月成本 = min(月调用数, DAILY_AI_CALL_LIMIT × 31) × 单次调用成本
安全线：单 Pro 用户月成本 ≤ 月价的 20%
```

- 精确单次调用成本 `[待确认:启用 AI 前按官方牌价核价]`； Workers AI 免费额度与 Gemini Flash 档位均在此量级，预期远低于安全线。
- 滥用防护：AI 调用按日限额 + Turnstile（项目 env 已有开关位）。

## 3. 套餐矩阵

| | Free | Pro $7/月 或 $49 一次性 | Business |
|---|---|---|---|
| 模板式 prompt 生成 | ✅ 无限 | ✅ 无限 | ✅ |
| 输出格式 | Text | Text + JSON + 批量导出 | 同 Pro |
| 预设库 | 5 个基础预设 | 全部预设（50+，持续更新） | 同 Pro |
| AI 增强改写 | — | 100 次/日 | 团队共享额度 `[待确认]` |
| 保存历史 | — | ✅（D1，云同步） | ✅ |
| 登录 | 不需要 | 需要（Google OAuth） | 需要 |
| 支持 | — | 邮件 | 优先 |
| 状态 | v1 上线 | v1.1 上线 | **仅 Waitlist 按钮，不可购买** |

- Lifetime $49 边界：写明"当前全部 Pro 功能 + 未来 12 个月新增 Pro 功能"，**不写终身无限**。
- 月价 $7、Lifetime $49 为建议值，允许 Owner 在 $5–9 / $39–59 区间内调整 `[待确认:Owner Review 定价]`。

## 4. 免费额度设计逻辑

免费档 = 本地模板拼装，边际成本为零，可以"无限"且不亏穿（这是事实性无限，不违反不写无限原则——但文案仍表述为"unlimited template prompts"限定在模板生成）。
付费触发场景：用户用模板拼出 prompt 后想要"AI 帮我改得更好"或"保存/批量导出"的那一刻——在 generator 输出框旁放升级入口，不在导航栏硬推。

## 5. 转化口径（给文案）

- 定价区顺序：先讲"省掉的试错成本"（Veo 额度/时间），再讲人群（创作者/营销人），最后价格。
- CTA 与路径一致：v1.1 前**不放任何 Pro 按钮**（无支付路径=不出现购买入口）；v1.1 后 "Upgrade" → Stripe Checkout。
- 退款：数字商品，7 天未大量使用可退 `[待确认:合规阶段措辞]`。

## 6. 后端 entitlement 建议

```jsonc
{ "plan": "free|pro|business", "aiCallsUsedToday": 0, "aiDailyLimit": 100,
  "presetsUnlocked": "basic|all", "historyEnabled": false, "exportFormats": ["text"] }
```

Stripe 依赖（v1.1 才配置，不进 v1）：`STRIPE_SECRET_KEY`、`STRIPE_WEBHOOK_SECRET`、`STRIPE_PRICE_ID_MONTHLY`、`STRIPE_PRICE_ID_LIFETIME` + Stripe Tax。

## 7. 验收自检

- [x] 价格有竞品锚点（SERP 免费 + $20 替代成本）和成本依据（静态零边际 + AI 公式封顶）
- [x] 免费额度可体验核心价值（模板生成全功能）且不亏穿（零边际成本）
- [x] 无"无限"滥用（仅限定在模板生成的事实性表述；Lifetime 有 12 个月边界）
- [x] CTA 与真实路径一致（v1 无支付入口；Business 仅 Waitlist）
- [ ] 精确 AI 单次成本与竞品付费档细节 `[待确认]`

## 8. 交接摘要

- 状态：[NEEDS_REVIEW]（价格区间待 Owner 拍板；不影响 04-compliance 并行启动）
- 核心判断：v1 纯免费零成本获客，v1.1 用 AI 增强 + 预设库 + 历史做 Pro，$7/月/$49 Lifetime，Business 只挂 Waitlist。
- 给文案：定价区价值叙事顺序、"unlimited template prompts" 的限定表述。
- 给后端：entitlement 字段、AI 日限额、v1.1 的 Stripe 变量清单。
- 给 QA：Free/Pro 功能边界验证点、未登录点升级 CTA 的行为。
