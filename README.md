# Luxury Immersive Cinematic Web Experience Platform

## Source of truth
- `catalog/DB-General-Catalog-V4.8.pdf`

## Pipeline
1. `npm run extract:pdf` - Parse PDF text/layout metadata.
2. `npm run extract:images` - Extract image binaries via PyMuPDF.
3. `npm run optimize:images` - Generate WebP/AVIF + thumbnails.
4. `npm run placeholders` - Generate blurred placeholders.
5. `npm run build:content` - Build section JSON for runtime.

Run all: `npm run extract`

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

## Notes
Place the PDF at `catalog/DB-General-Catalog-V4.8.pdf` before running extraction.


## Why deployed site shows no PDF text/images
If `catalog/DB-General-Catalog-V4.8.pdf` is missing during extraction, `content/*.json` remains placeholder ("Pending extraction").

Required before deploy:
1. Put PDF in `catalog/DB-General-Catalog-V4.8.pdf`
2. Run `npm run extract`
3. Commit generated `content/*` and `public/content/*` files
4. Deploy
