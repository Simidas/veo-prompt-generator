# 06-design — 设计基线（v1）

日期：2026-08-25 ｜ 视觉真源即 `site/assets/style.css`，本文件记录决策理由（Visual Style Rationale）。

## 风格判断

- 用户是短视频创作者，深色主题 + 高饱和渐变符合工具语境（视频/AI 工具的默认心智），同时避免模仿 Google/Gemini 官方配色（合规要求）。
- 单列工具布局：移动端优先（主流量来自 TikTok/Reddit 分享），桌面端 generator 居中 720px 内容列 + 侧边输出面板。

## Token

- 背景 `#0b0d14`，面板 `#141826`，边框 `#232a3d`
- 主色 `#7c5cff`（紫），辅助 `#22d3ee`（青），成功 `#34d399`
- 文本 `#e8eaf2` / 次级 `#9aa3b8`
- 字体：系统栈 `-apple-system, "Segoe UI", Roboto, sans-serif`；等宽输出区 `ui-monospace, SFMono-Regular, Menlo`
- 圆角 12px，阴影仅用于输出卡片；焦点态 2px 主色描边（可访问性）

## 组件清单

1. Header（sticky）：logo 文本 + nav（Generator / Examples / Guide / About）
2. Hero：H1 + 副题 + 免费徽章
3. Generator：subject 文本域 + 4 组 select（camera/lighting/audio/style，含 term tip 行）+ 预设 chips + Text/JSON 切换 + 输出区 + Copy 按钮
4. FAQ 手风琴（details/summary）
5. Footer：免责声明 + 法务链接

## 状态

- 默认态 / hover / focus / copied 成功态（按钮变绿 + 文案 1.5s）/ 空输出占位
- `prefers-reduced-motion`：关闭过渡动画
