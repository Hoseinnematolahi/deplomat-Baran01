# Luxury Immersive Cinematic Web Experience Platform

## Source of truth
- `catalog/DB-General-Catalog-V4.8.pdf`

## Pipeline
1. `npm run extract:pdf` - Parse PDF text/layout metadata.
2. `npm run extract:images` - Extract image binaries via PyMuPDF.
3. `npm run optimize:images` - Generate WebP/AVIF + thumbnails.
4. `npm run placeholders` - Generate blurred placeholders.
5. `npm run build:content` - Build section JSON for runtime.

Run all:
```bash
npm run extract
```

## Dev
- `npm install`
- `npm run dev`

## Architecture
- React 18 + TypeScript + Vite + Tailwind
- Framer Motion + GSAP/ScrollTrigger + Lenis hooks scaffold
- Three.js / R3F atmosphere layer scaffold
- Sanity CMS schema seed
- GitHub Actions CI
- Vercel deployment config

## Deployment flow (GitHub → Vercel)
1. Push PDF/content changes to `main`.
2. GitHub Actions pipeline runs extraction and asset generation.
3. Generated `content/*`, `public/content/*`, and `assets/*` are auto-committed.
4. Vercel deploys frontend only (`npm run build`).

## Notes
- Keep `catalog/DB-General-Catalog-V4.8.pdf` in repository for pipeline extraction.
- Do not run extraction on Vercel build stage.
