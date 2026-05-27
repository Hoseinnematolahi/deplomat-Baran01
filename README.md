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