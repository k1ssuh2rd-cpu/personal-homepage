# CLAUDE.md

个人主页项目说明，供 Claude Code 理解本项目时使用。

## Project Overview

刘培宇 (Cuyler Liu) 的个人主页 — 纯前端 HTML/CSS/JS 单页应用，用于研究生推免申请展示。包含学术成绩、科研论文、竞赛荣誉、英语能力、摄影爱好等内容，支持中英文切换。

## Running the Application

```bash
npx serve personal-homepage -p 5500
```

## Architecture

无构建工具或外部依赖的单页应用：

- `index.html` — 页面结构，通过 `data-i18n` 属性标记需要国际化的文本节点
- `style.css` — 玻璃拟态卡片、背景装饰球、网格布局、响应式（1024px / 768px / 480px 断点）
- `i18n.js` — 中英文词典（`i18n.zh` / `i18n.en`，100+ key），在 `app.js` 之前加载
- `app.js` — 语言切换、IntersectionObserver 滚动揭示动画、移动端汉堡菜单、导航栏滚动隐藏

### 关键 CSS 变量 / 类

- `--accent: rgb(203,224,241)` — 主题色，`--card-bg: rgba(255,255,255,0.72)` — 卡片背景，`--radius: 16px`
- `.section__subtitle` — 奖项区分类标题（底部 accent 色分隔线），用于国家级/省市级/校级/其他分组

### i18n 工作方式

`i18n.js` 中维护 `i18n.zh` 和 `i18n.en` 两个词典对象，共 100+ 个 key。`setLang()` 遍历所有 `[data-i18n]` 元素，将 `textContent` 替换为对应语言的文本。数字（分数、排名等）直接写在 HTML 中，不经过 i18n。

添加新奖项需同时改三个文件：`i18n.js`（中英文词条）、`index.html`（卡片结构）。

## 资源文件

- `assets/avatar.jpg` — 头像图片
- `docs/superpowers/specs/2026-05-09-personal-homepage-design.md` — 页面设计文档

## data/ JSON 文件（中间数据）

`data/` 目录下的 `awards.json`、`resume.json`、`resume_new.json`、`statement.json`、`paper_abstract.json` 是 OCR 识别和简历解析的产物。**网页运行不依赖它们**，但推倒重做时可直接复用结构化数据。

## 部署

- GitHub Pages: https://k1ssuh2rd-cpu.github.io/personal-homepage/
- 仓库: https://github.com/k1ssuh2rd-cpu/personal-homepage
- 本地 git 配置了代理 `http.proxy=http://127.0.0.1:6666`，推送前需确保代理/VPN 可用

```bash
git add -A && git commit -m "message"
git push              # 等 1-2 分钟 GitHub Pages 自动部署
```
