# 项目自定义指南

本文档介绍如何自定义这个 Next.js 个人博客项目。

## 目录

- [1. 站点元数据配置](#1-站点元数据配置)
- [2. 导航菜单配置](#2-导航菜单配置)
- [3. 主题与样式自定义](#3-主题与样式自定义)
- [4. 博客文章管理](#4-博客文章管理)
- [5. 作者信息配置](#5-作者信息配置)
- [6. 分析与评论配置](#6-分析与评论配置)
- [7. 布局自定义](#7-布局自定义)
- [8. 自定义 MDX 组件](#8-自定义-mdx-组件)
- [9. 部署配置](#9-部署配置)
- [10. 常用命令](#10-常用命令)

---

## 1. 站点元数据配置

**配置文件**: `data/siteMetadata.js`

这是最重要的配置文件，包含站点的基本信息：

```javascript
const siteMetadata = {
  // 基本信息
  title: '你的博客标题',
  author: '你的名字',
  headerTitle: '头部显示标题',
  description: '站点描述，用于 SEO',

  // 语言和地区
  language: 'zh-cn',
  locale: 'zh-CN',

  // 主题设置
  theme: 'system', // 'system' | 'dark' | 'light'

  // 站点 URL
  siteUrl: 'https://yourdomain.com',
  siteRepo: 'https://github.com/username/repo',

  // 社交链接（按需启用）
  socialBanner: '/static/images/twitter-card.png',
  email: 'your@email.com',
  github: 'https://github.com/username',
  x: 'https://x.com/username', // Twitter
  // facebook, youtube, linkedin, threads, instagram, etc.

  // 微信二维码
  wechat: {
    qrcode: '/static/images/wechat-qrcode.png',
  },
}
```

---

## 2. 导航菜单配置

**配置文件**: `data/headerNavLinks.ts`

```typescript
const headerNavLinks = [
  { href: '/', title: '首页' },
  { href: '/blog', title: '博客' },
  { href: '/tags', title: '标签' },
  { href: '/projects', title: '项目' },
  { href: '/about', title: '关于' },
]

export default headerNavLinks
```

修改此数组来添加、删除或重新排序导航项。

---

## 3. 主题与样式自定义

### 颜色配置

**配置文件**: `css/tailwind.css`

```css
/* 主色调 */
--primary-50 到 --primary-950

/* 灰色调 */
--gray-50 到 --gray-950
```

### 字体配置

在 `css/tailwind.css` 中修改：

```css
:root {
  --font-sans: '你的字体', 'Fallback 字体', sans-serif;
}
```

### 代码高亮

**配置文件**: `css/prism.css`

自定义代码块的语法高亮颜色。

---

## 4. 博客文章管理

### 文章位置

`data/blog/` 目录下的 `.mdx` 文件

### 文章模板

```yaml
---
title: 文章标题（必填）
date: 2024-01-01（必填）
tags: [标签1, 标签2]
lastmod: 2024-01-15
draft: false  # true 则不会在生产环境显示
summary: 文章摘要
images: [/path/to/image.jpg]
authors: [default]  # 引用 data/authors/ 下的作者文件
layout: PostLayout  # PostLayout | PostSimple | PostBanner
bibliography: references.bib  # 引用文献
canonicalUrl: https://canonical.url
---

文章正文...
```

### 布局选项

| 布局 | 描述 |
|------|------|
| `PostLayout` | 默认，两栏布局，带侧边栏 |
| `PostSimple` | 简洁单栏布局 |
| `PostBanner` | 带 Banner 图片的头部布局 |

---

## 5. 作者信息配置

### 作者文件位置

`data/authors/` 目录下的 `.mdx` 文件

### 作者模板

```yaml
---
name: 作者名（必填）
avatar: /static/images/avatar.png
occupation: 职业
company: 公司
email: email@example.com
twitter: twitter_handle
linkedin: linkedin_handle
github: github_handle
layout: AuthorLayout
---

作者简介（支持 Markdown）...
```

在文章 frontmatter 中通过 `authors: [filename]` 引用。

---

## 6. 分析与评论配置

### 网站分析

在 `data/siteMetadata.js` 的 `analytics` 部分配置：

| 服务 | 配置方式 |
|------|----------|
| Umami | 设置环境变量 `NEXT_UMAMI_ID` |
| Plausible | 取消注释并配置 |
| Simple Analytics | 取消注释启用 |
| PostHog | 添加 API key |
| Google Analytics | 添加跟踪 ID |

### 评论系统

在 `data/siteMetadata.js` 的 `comments` 部分配置：

| 服务 | 环境变量 |
|------|----------|
| Giscus | `NEXT_PUBLIC_GISCUS_REPO`, `NEXT_PUBLIC_GISCUS_REPOSITORY_ID`, 等 |
| Utterances | `NEXT_PUBLIC_UTTERANCES_REPO` |
| Disqus | `NEXT_PUBLIC_DISQUS_SHORTNAME` |

### 搜索功能

| 服务 | 配置 |
|------|------|
| KBar（本地） | 无需配置，内置 |
| Algolia | 添加 appId, apiKey, indexName |

### 邮件订阅

在 `data/siteMetadata.js` 的 `newsletter` 部分：

```javascript
newsletter: {
  provider: 'mailchimp', // mailchimp | buttondown | convertkit | klaviyo | revue | emailoctopus | beehive
}
```

---

## 7. 布局自定义

### 可用布局文件

| 文件 | 用途 |
|------|------|
| `layouts/PostLayout.tsx` | 默认博客布局 |
| `layouts/PostSimple.tsx` | 简洁布局 |
| `layouts/PostBanner.tsx` | Banner 布局 |
| `layouts/ListLayout.tsx` | 博客列表（v1） |
| `layouts/ListLayoutWithTags.tsx` | 带标签侧栏的列表（v2） |

### 核心组件

| 组件 | 位置 |
|------|------|
| 根布局 | `app/layout.tsx` |
| 首页 | `app/Main.tsx` |
| 头部导航 | `components/Header.tsx` |
| 页脚 | `components/Footer.tsx` |

---

## 8. 自定义 MDX 组件

**配置文件**: `components/MDXComponents.tsx`

添加可在 MDX 文章中使用的自定义组件：

```tsx
import CustomComponent from './CustomComponent'

const components = {
  // 内置组件...
  CustomComponent,
}

export default components
```

然后在 MDX 中使用：

```mdx
<CustomComponent prop="value" />
```

---

## 9. 部署配置

### Vercel（推荐）

1. 将 GitHub 仓库连接到 Vercel
2. 配置所需的环境变量
3. 自动部署

### GitHub Pages

使用 `.github/workflows/pages.yml` 工作流：

```bash
# 构建静态文件
EXPORT=1 UNOPTIMIZED=1 yarn build
# 输出目录：out/
```

### Docker

1. 在 `next.config.js` 添加 `output: 'standalone'`
2. 使用 Dockerfile 构建

---

## 10. 常用命令

```bash
# 启动开发服务器
yarn dev

# 构建生产版本
yarn build

# 启动生产服务器
yarn serve

# 代码检查和修复
yarn lint

# 构建分析
yarn analyze
```

---

## 配置文件速查表

| 文件 | 用途 |
|------|------|
| `data/siteMetadata.js` | 主站点配置 |
| `data/headerNavLinks.ts` | 导航菜单 |
| `data/projectsData.ts` | 项目页面内容 |
| `contentlayer.config.ts` | 内容模式和 MDX 插件 |
| `next.config.js` | Next.js 配置、CSP 头 |
| `css/tailwind.css` | 主题自定义 |
| `css/prism.css` | 代码高亮样式 |
| `components/MDXComponents.tsx` | 自定义 MDX 组件 |
| `.env.example` | 环境变量模板 |

---

## 功能特性

- **RSS 订阅**: 自动生成文章和标签的 RSS
- **本地搜索**: KBar 内置搜索
- **目录**: 长文章自动生成目录
- **代码高亮**: Prism.js 语法高亮
- **数学公式**: KaTeX 支持
- **文献引用**: 支持 .bib 文件引用
- **深色模式**: 跟随系统自动切换

---

## 快速开始清单

1. [ ] 修改 `data/siteMetadata.js` 中的站点信息
2. [ ] 更新 `data/headerNavLinks.ts` 导航菜单
3. [ ] 在 `data/authors/` 添加作者信息
4. [ ] 在 `data/blog/` 添加博客文章
5. [ ] 自定义 `css/tailwind.css` 主题颜色
6. [ ] 配置 `.env` 环境变量（分析/评论）
7. [ ] 运行 `yarn dev` 预览
8. [ ] 运行 `yarn build` 构建生产版本
9. [ ] 部署到 Vercel 或其他平台
