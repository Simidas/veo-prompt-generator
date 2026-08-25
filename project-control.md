# project-control.md — veo-prompt-generator

> 本文件是项目事实源。聊天只做进度可见性与人工确认；正式任务、返修、复验都以这里为准。

## 项目启动卡

| 项 | 值 |
|---|---|
| 项目 slug | `veo-prompt-generator` |
| 域名 | `veopromptgenerator.com`（Owner 已选定，2026-08-25；**未购买** → `[BLOCKED: 付款确认]`） |
| 生产 URL（已上线） | https://veo-prompt-generator.pages.dev |
| 目标市场 | US / English |
| 站点类型 | 工具站（单页交互 generator + 长尾内容页） |
| 商业化 | v1 免费上线；v1.1 加 Pro 套餐（2026-08-25 用户确认） |
| 主关键词 | veo 3 prompt generator（含 veo 3.1 变体） |
| 登录/支付/AI/邮件 | v1 全部不需要 |
| 技术栈 | 纯静态 HTML/CSS/JS，Cloudflare Pages |
| 禁止事项 | 不实际生成视频；v1 无登录无支付无上传 |
| 上线期限 | 未指定 |

## 阶段状态

| 阶段 | 状态 | 备注 |
|---|---|---|
| 01-research | ✅ DONE | 2026-08-25；SERP 实扫降级（GK API 无公开端点）；volume/KD 标 missing_keyword_tool_access |
| 02-product | ✅ DONE | `docs/prd.md` |
| 03-pricing | ✅ DONE（价格区间待拍板） | `docs/pricing.md`；Free + Pro $7/月 / $49 Lifetime |
| 04-compliance | ✅ DONE | `docs/compliance.md`；商标免责进全站页脚 |
| 05-copy | ✅ DONE（SEO-Copy Freeze） | `docs/copy-freeze.md`；Veo 3.1 为当前版本（GA 2025-11-17）已核实 |
| 06-design | ✅ DONE | `docs/design-brief.md` + `site/assets/style.css` |
| 07 开发 | ✅ DONE | 7 页面 + CSS/JS + robots/sitemap；20 预设 |
| 09-qa | ✅ QA GO | `docs/qa-report.md`；P0 全过，2 项 P2 已记录 |
| 10-launch | 🔄 部分完成 | 生产已部署（pages.dev）；自定义域名绑定待购买 |
| 11-data-review | ⏳ | 上线后启动 |

## 上线证据（2026-08-25）

- **生产部署**：https://veo-prompt-generator.pages.dev — `wrangler pages deploy`，11 文件上传成功
- **生产 URL 抽查**：`/`、`/veo-3-1-prompt-generator`、`/veo-3-prompt-examples`、`/veo-3-prompt-guide`、`/privacy`、`/terms`、`/robots.txt`、`/sitemap.xml`、`/assets/app.js`、`/?preset=cinematic-trailer` 全部 200（clean URL 生效；`/about` 首测一次 522，复测 2 次 200，判定瞬时）
- **QA**：桌面 1280 + 移动 375 视口快照验证；fill/selectOption/URL 预设载入实机通过；click 类交互受测试环境故障限制，由 Node 逻辑测试等效覆盖（见 qa-report）
- **SEO 文件**：robots.txt（含 sitemap 声明）、sitemap.xml（5 URL）、每页 canonical/OG/JSON-LD（WebApplication + FAQPage + CollectionPage + Article）
- **Git/GitHub**：远端 `Simidas/veo-prompt-generator` main = `3806fba095`（20 文件，经 Contents+Tree API 推送——本机 git 443 到 github.com 不通）；本地 commit `8fd4cb1` 内容相同、历史不同（README seed 父提交差异）
- **分析**：Pages 内置 Web Analytics 自动注入未成功（返回 tag 为空）`[待确认]`；GA4/GSC 未配置 `[待确认]`

## 待确认清单

- [ ] **[BLOCKED: 付款确认] 域名购买 `veopromptgenerator.com`**：当前 API token 无 Registrar scope 且购买属付款动作。用户确认后：注册域名 → 建 zone → Pages 绑定自定义域 → 验证 HTTPS。若放弃购买，需把全站 canonical/sitemap/robots 从 veopromptgenerator.com 改为 pages.dev 域
- [ ] 定价拍板（$7/月 / $49 Lifetime 可在 $5–9 / $39–59 调整）
- [ ] GA4/GSC/Clarity 数据链路（等域名定案后配，避免重复验证）
- [ ] Owner 联系邮箱（当前用 privacy@veopromptgenerator.com 占位）

## 风险登记

- P1：canonical 指向未持有域名——域名购买被拒时必须改 canonical，否则 SEO 信号分裂
- P2：`veo` 为 Google 产品名 → 已加 "not affiliated" 免责；如收投诉迁移 `veopromptgen.com`
- P2：IAB 测试环境 click 故障 → 上线后用真实数据复核 JSON 切换/复制按钮使用率

## 变更记录

- 2026-08-25：项目立项，01-research 完成，02-product 启动。
- 2026-08-25：PRD v0 完成，NEEDS_REVIEW：待域名、商业化确认。
- 2026-08-25：用户确认 v1.1 加 Pro 套餐；域名首选 veopromptgenerator.com（未购买）。02-product 转 DONE，03-pricing 解锁。
- 2026-08-25：定价 v0 完成：v1 免费，v1.1 Pro $7/月 / $49 Lifetime。
- 2026-08-25：04-compliance、05-copy freeze、06-design、开发、QA GO、Pages 生产部署、GitHub 推送（API 通道）全部完成；域名购买待用户付款确认。
