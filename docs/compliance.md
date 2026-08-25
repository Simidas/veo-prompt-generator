# 04-compliance — veo-prompt-generator

日期：2026-08-25 ｜ 状态：v1 冻结（站点无登录/无支付/无上传/无邮件）

## 数据与 Cookie

- v1 为纯静态站，**无登录、无表单提交、无用户内容上传、无数据库写入**。
- 不使用广告 Cookie；如启用分析，仅使用 Cloudflare Web Analytics（无 Cookie，不存 PII）。若实际未启用，Privacy 中不出现分析声明。
- 无第三方字体/脚本 CDN 依赖，避免向第三方泄露访问数据。

## 免责与商标（P2 风险缓解）

- 全站页脚固定声明："VeoPromptGenerator is an independent tool and is not affiliated with, endorsed by, or sponsored by Google or DeepMind."
- 不使用 Google/DeepMind/Veo 的 Logo、官方配色组合或官方素材；提及 "Veo" 仅为描述兼容模型的事实性使用。
- 输出示例中不复制 Google 官方 Prompting Guide 的原文段落，均为自写内容。

## 法律页面

- `/privacy`：无账号/无追踪基线 + Cloudflare 基础设施日志说明 + 联系邮箱 `[待确认:Owner 邮箱]`。
- `/terms`：工具按"现状"提供、不保证生成效果、输出 prompt 的使用权归用户、不承担用户在第三方平台使用 prompt 的后果。
- 禁用表达：不写 "official"、"best guaranteed"、医疗/法律建议暗示。

## v1.1 前置（记录，不在本站实现）

- 引入 Pro/Stripe 时需补：Stripe 条款链接、退款政策（7 天未大量使用 `[待确认:最终措辞]`）、Turnstile 隐私披露、Google OAuth 隐私披露。

## 验收

- [x] v1 无个人数据收集路径 → Privacy 如实表述
- [x] 商标免责声明进页脚（全站）
- [x] 无夸大/误导承诺表达
- [ ] Owner 联系邮箱 `[待确认]`
