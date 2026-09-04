# 06-design — 设计基线（v1.1 UI refresh）

日期：2026-09-05 ｜ 视觉真源：`site/assets/style.css`

## Visual Style Rationale

本轮目标是去掉“深色背景 + 紫色渐变 + 居中 Hero + 通用卡片”的 AI SaaS 模板感，同时保持工具效率、英文 SEO 文案和移动端可用性。

比较过的方向：

1. **海盐轻科技**：白色、海蓝、半透明层。清爽但仍容易落入通用 SaaS 组件语言。
2. **杂志式电影工作台**：奶油纸张、薄荷绿、珊瑚橙、硬边印刷阴影、不对称分镜构图。最贴合“像导演一样写 prompt”的产品定位，且与同类深色 AI 工具有明显区分。
3. **瑞士排版工具页**：黑白红、严格网格、高密度编号。识别度高，但对初学创作者略显冷硬。

最终采用方向 2。视觉隐喻来自分镜卡、场记板和导演工作台，而不是机器人、星光、霓虹渐变或生成式 AI 素材。

## Design tokens

- Canvas：`#f2f7f0`
- Paper：`#fffdf7`
- Ink：`#18332d`
- Leaf：`#1f6b5d`
- Coral：`#f36f50`
- Sun：`#ffd76f`
- Sky：`#b9ddf2`
- Display：Georgia / Times serif；UI：系统 sans；输出：系统 monospace
- 阴影采用 4–8px 硬边偏移，不使用模糊玻璃卡片
- 容器混用 34px/8px 非对称圆角、细边框与虚线分隔，避免全站统一胶囊卡片

## 页面与组件

1. Header：纸张质感、叶形字标、紧凑导航。
2. Hero：左侧关键词 H1，右侧纯 CSS 分镜插画；无需外链图片或第三方素材。
3. Generator：导演工作台结构；场景输入独占一行，Camera / Lighting / Audio / Style 使用 2×2 网格，移动端降为单列。
4. Shot cards：预设使用三种浅色纸签，hover 采用硬边位移反馈。
5. Output：深墨绿“成片板”，Text / JSON 维持原交互。
6. FAQ：桌面端标题与问题双栏，移动端单列。
7. Examples：桌面端双栏卡片库，移动端单列；内容和 CTA 不变。
8. Guide / About / Legal：统一杂志式长文排版，保留全部 SEO 与合规内容。

## 关键状态与可访问性

- hover / focus / selected / copied 状态均有颜色以外的边框、位移或阴影反馈。
- 保留 `prefers-reduced-motion`。
- 正文、控件和 CTA 使用高对比深绿文字；装饰图形 `aria-hidden`。
- 移动端导航可横向滚动，Generator 无横向溢出，主按钮扩展为全宽。

## 前端 handoff

- 无新增依赖、远程字体、图片或构建步骤。
- JS 数据结构与 DOM id 不变；`app.js` 无需迁移。
- 需要复验：桌面/移动布局、预设载入、Text/JSON 切换、Copy 状态、Examples 双栏降级。
