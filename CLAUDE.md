# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js personal blog template built with Tailwind CSS and Contentlayer for MDX content management. It uses the App Router architecture with React Server Components.

## Commands

```bash
yarn dev              # Start development server (localhost:3000)
yarn build            # Build for production (includes postbuild scripts)
yarn serve            # Start production server
yarn lint             # Run ESLint with auto-fix
yarn analyze          # Build with bundle analyzer
```

## Architecture

### Content Management (Contentlayer)

- Content is defined in `contentlayer.config.ts` with two document types: `Blog` and `Authors`
- Blog posts are MDX files in `data/blog/`
- Author profiles are MDX files in `data/authors/`
- Contentlayer generates typed content to `.contentlayer/generated/`
- MDX plugins: remark-gfm, remark-math, rehype-katex, rehype-prism-plus, rehype-citation

### Routing Structure

- `app/` - Next.js App Router pages
- `app/blog/[...slug]/page.tsx` - Dynamic blog post rendering
- `app/blog/page/[page]/page.tsx` - Paginated blog listing
- `app/tags/[tag]/` - Tag-based filtering

### Layouts

Three post layouts (specified in frontmatter `layout` field):
- `PostLayout` (default) - Two-column with author info and sidebar
- `PostSimple` - Minimal single-column layout
- `PostBanner` - Banner image header layout

Two list layouts:
- `ListLayoutWithTags` - Tag sidebar (used in v2)
- `ListLayout` - Search bar (used in v1)

### Pliny Integration

The `pliny` package provides:
- Analytics: Umami, Plausible, Simple Analytics, Posthog, Google Analytics
- Comments: Giscus, Utterances, Disqus
- Newsletter: Mailchimp, Buttondown, Convertkit, Klaviyo, etc.
- Search: Kbar (local) or Algolia

### Path Aliases

Defined in `tsconfig.json`:
- `@/components/*` → `components/*`
- `@/data/*` → `data/*`
- `@/layouts/*` → `layouts/*`
- `@/css/*` → `css/*`
- `contentlayer/generated` → `.contentlayer/generated`

## Key Configuration Files

| File | Purpose |
|------|---------|
| `data/siteMetadata.js` | Site title, author, social links, analytics, comments, search config |
| `data/headerNavLinks.ts` | Navigation menu items |
| `data/projectsData.ts` | Projects page content |
| `contentlayer.config.ts` | Blog/Author schemas, MDX plugins, computed fields |
| `next.config.js` | CSP headers, image domains, webpack config |
| `components/MDXComponents.tsx` | Custom components usable in MDX |

## Blog Post Frontmatter

```yaml
title: string (required)
date: date (required)
tags: string[] (optional)
lastmod: date (optional)
draft: boolean (optional)
summary: string (optional)
images: string[] (optional)
authors: string[] (optional, references author filenames)
layout: 'PostLayout' | 'PostSimple' | 'PostBanner' (optional)
bibliography: string (optional, for citations)
canonicalUrl: string (optional)
```

## Deployment

- **Vercel**: Standard deployment
- **GitHub Pages**: Use GitHub Actions workflow in `.github/workflows/pages.yml`
- **Static export**: `EXPORT=1 UNOPTIMIZED=1 yarn build` then deploy `out/` folder

## Notes

- Uses Yarn 3 (Berry) with Zero-Installs (`.yarn/` directory)
- Husky pre-commit runs lint-staged (ESLint + Prettier)
- Tailwind CSS v4 with `@tailwindcss/postcss` plugin
- React 19 with Next.js 15
