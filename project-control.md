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
| 06-design | ✅ DONE（v1.1 UI refresh） | `docs/design-brief.md` + `site/assets/style.css`；2026-09-05 完成非 AI 模板风视觉升级 |
| 07 开发 | ✅ DONE（v1.1） | 7 页面 + CSS/JS + robots/sitemap；20 预设；新 UI 无新增依赖 |
| 09-qa | ✅ QA GO（v1）/ v1.1 GO | 原 v1 见 `docs/qa-report.md`；新 UI 本地浏览器 QA + 生产 HTTP smoke 通过 |
| 10-launch | ✅ v1.1 LIVE | 2026-09-05 UI refresh 已同步 GitHub main 并部署至 Pages Production |
| 11-data-review | ⏳ | 上线后启动 |

## 上线证据（2026-08-25）

- **生产部署**：https://veo-prompt-generator.pages.dev — `wrangler pages deploy`，最终版 commit（pages.dev 域切换）部署 `cf6e1f2` 内容
- **最终域名决定**：用户选择 pages.dev（2026-08-25）；全站 canonical/OG/JSON-LD/sitemap/robots 从 veopromptgenerator.com 切换为 veo-prompt-generator.pages.dev，0 残留；法务页联系方式改为 GitHub issues
- **生产 URL 抽查（切换后复验）**：`/`、`/veo-3-1-prompt-generator`、`/veo-3-prompt-examples`、`/veo-3-prompt-guide`、`/about`、`/privacy`、`/terms`、`/robots.txt`、`/sitemap.xml` 全部 200；生产首页 canonical 实测指向 pages.dev
- **QA**：桌面 1280 + 移动 375 视口快照验证；fill/selectOption/URL 预设载入实机通过；click 类交互受测试环境故障限制，由 Node 逻辑测试等效覆盖（见 qa-report）
- **SEO 文件**：robots.txt（含 sitemap 声明，指向 pages.dev）、sitemap.xml（5 URL）、每页 canonical/OG/JSON-LD（WebApplication + FAQPage + CollectionPage + Article）
- **Git/GitHub**：远端 `Simidas/veo-prompt-generator` main = `cf6e1f2dcf`（21 文件，Git Data API 推送——本机 git 443 到 github.com 不通）；本地 commit `e44b022` 内容相同、历史不同（README seed 父提交差异）
- **分析**：Pages 内置 Web Analytics 自动注入未成功 `[待确认]`；GA4/GSC 未配置 `[待确认]`
- **自动化清理**：域名绑定自动检测任务（automation-ec3d1ac5）已删除

## UI refresh 上线证据（2026-09-05）

- **视觉方向**：从深色紫色渐变 AI SaaS 模板改为“杂志式电影工作台”；奶油纸张、薄荷绿、珊瑚橙、硬边印刷阴影与不对称分镜构图。
- **实现范围**：重做全站设计系统；首页和 Veo 3.1 Generator 重构为 Scene + 2×2 控制网格 + Shot cards；Examples 改为双栏卡片库；Guide/About/Legal 统一长文排版。
- **功能回归**：预设载入、Text/JSON 切换、4 个 select 与输出生成通过；浏览器 console 0 error。
- **响应式回归**：1280×900 与 375×812 通过；两种视口均无页面横向溢出；Examples 21 卡桌面双栏、移动端单栏。
- **GitHub**：远端 `main` = `c73057851309ca673c4e05433d08a814ba66c616`；通过 Git Data API 非强制更新，发布树已逐文件核对；本地对应内容提交 `0b204cdd00cc7581f922c7459502e5c494279196`，因历史基线不同 SHA 不同。
- **Cloudflare Pages**：Production deployment `48d4632c-d3d9-4eb3-a0a9-4d2e292d9c22`，source `c730578`，部署 URL `https://48d4632c.veo-prompt-generator.pages.dev`，生产主域 `https://veo-prompt-generator.pages.dev`。
- **生产 smoke**：`/`、6 个公开内容/法务路由、`robots.txt`、`sitemap.xml`、CSS、JS 共 11 个目标全部 200；首页命中 `hero-home` / `story-frame`，CSS 命中新 token 与响应式规则。
- **验证边界**：生产 Chrome DOM/截图读取连续超时；已保留同构本地浏览器交互/响应式证据和生产 HTTP/部署证据，不把生产浏览器 E2E 虚报为通过。

## 待确认清单

- [ ] GA4/GSC/Clarity 数据链路（pages.dev 域可直接配置，GSC 需 DNS 验证或 HTML 标记验证）
- [ ] 定价拍板（$7/月 / $49 Lifetime 可在 $5–9 / $39–59 调整）
- [ ] 未来若购买自定义域名：重跑 `bin/bind-veo-domain.sh` 并把 canonical 切回（脚本保留在仓库）

## 风险登记

- P2：`veo` 为 Google 产品名 → 已加 "not affiliated" 免责（页脚全站）
- P2：IAB 测试环境 click 故障 → 上线后用真实数据复核 JSON 切换/复制按钮使用率
- P2：pages.dev 子域的品牌感弱于自定义域 → 若流量验证成立，可随时购买域名并重跑 `bin/bind-veo-domain.sh` 切回

## 变更记录

- 2026-08-25：项目立项，01-research 完成，02-product 启动。
- 2026-08-25：PRD v0 完成，NEEDS_REVIEW：待域名、商业化确认。
- 2026-08-25：用户确认 v1.1 加 Pro 套餐；域名首选 veopromptgenerator.com（未购买）。02-product 转 DONE，03-pricing 解锁。
- 2026-08-25：定价 v0 完成：v1 免费，v1.1 Pro $7/月 / $49 Lifetime。
- 2026-08-25：04-compliance、05-copy freeze、06-design、开发、QA GO、Pages 生产部署、GitHub 推送（API 通道）全部完成；域名购买待用户付款确认。
- 2026-08-25：**用户决定改用 pages.dev**。全站 canonical/OG/schema/sitemap/robots 切换为 veo-prompt-generator.pages.dev（0 残留），联系方式改 GitHub issues，重新部署并复验全路由 200，远端推送 cf6e1f2，域名自动检测任务已删除。**10-launch DONE，v1 上线闭环。**
- 2026-09-05：完成 v1.1 UI refresh、本地桌面/移动端浏览器复验、GitHub main 同步与 Cloudflare Pages Production 发布；生产 HTTP smoke 全过，站点进入 **v1.1 LIVE**。
