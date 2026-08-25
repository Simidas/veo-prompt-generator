# project-control.md — veo-prompt-generator

> 本文件是项目事实源。聊天只做进度可见性与人工确认；正式任务、返修、复验都以这里为准。

## 项目启动卡

| 项 | 值 |
|---|---|
| 项目 slug | `veo-prompt-generator` |
| 域名 | 首选 `veopromptgenerator.com`（RDAP 实查可注册，未购买）；备选 `veopromptgen.com` `[待确认:购买]` |
| 目标市场 | US / English |
| 站点类型 | 工具站（单页交互 generator + 长尾内容页） |
| 商业化 | v1 免费上线；v1.1 加 Pro 套餐（2026-08-25 用户确认） |
| 主关键词 | veo 3 prompt generator（含 veo 3.1 变体） |
| 登录/支付/AI/邮件 | v1 全部不需要；AI 生成走 Workers AI（可选开关） |
| 技术栈 | Cloudflare Pages（静态）+ Workers（可选） |
| 禁止事项 | 不实际生成视频（不接 Veo API）；v1 无登录无支付无上传 |
| 上线期限 | 未指定 |

## 阶段状态

| 阶段 | 状态 | 备注 |
|---|---|---|
| 01-research | ✅ DONE | 2026-08-25，GK API 不可用，SERP 实扫降级；volume/KD 标 missing_keyword_tool_access |
| 02-product | ✅ v0 完成，待 Owner Review | `docs/prd.md`；缺域名/商业化确认 |
| 03-pricing | ✅ v0 完成，待 Owner 拍板价格 | `docs/pricing.md`；Free + Pro $7/月或 $49 Lifetime，Business 仅 Waitlist |
| 04-compliance | ⏳ | |
| 05-copy | ⏳ | SEO-Copy Freeze |
| 06-design | ⏳ | |
| 07-frontend / 08-backend | ⏳ | |
| 09-qa | ⏳ | |
| 10-launch | ⏳ | 公开动作需人工确认 |
| 11-data-review | ⏳ | |

## 待确认清单

- [ ] 域名购买（首选 veopromptgenerator.com，RDAP 2026-08-25 实查可注册；付款动作需用户确认）
- [ ] 关键词工具凭据（补 Trends/volume 硬闸门证据）
- [ ] 是否启用 Workers AI 实时生成（默认：本地模板拼装，不依赖 AI Key）

## 风险登记

- P2：`veo` 为 Google 产品名，域名含商标词有品牌风险 → 合规阶段加 "not affiliated with Google" 免责声明，不使用 Google Logo；如收到投诉可迁移到 `veopromptgen.com` 备选域名。

## 变更记录

- 2026-08-25：项目立项，01-research 完成，02-product 启动。
- 2026-08-25：PRD v0 完成（`docs/prd.md`），NEEDS_REVIEW：待域名、商业化确认。
- 2026-08-25：用户确认 v1.1 加 Pro 套餐；域名首选 veopromptgenerator.com（未购买）。02-product 转 DONE，03-pricing 解锁。
- 2026-08-25：定价 v0 完成（`docs/pricing.md`）：v1 免费，v1.1 Pro $7/月 / $49 Lifetime，NEEDS_REVIEW 待拍板。
