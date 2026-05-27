from pathlib import Path
import fitz

pdf_path = Path('catalog/DB-General-Catalog-V4.8.pdf')
output = Path('assets/raw')
output.mkdir(parents=True, exist_ok=True)

with fitz.open(pdf_path) as doc:
    manifest = []
    for page_index, page in enumerate(doc):
        images = page.get_images(full=True)
        for image_index, image in enumerate(images):
            xref = image[0]
            base_image = doc.extract_image(xref)
            ext = base_image.get('ext', 'png')
            image_bytes = base_image['image']
            name = f"page_{page_index+1:03d}_img_{image_index+1:02d}.{ext}"
            out_file = output / name
            out_file.write_bytes(image_bytes)
            manifest.append({"page": page_index + 1, "file": str(out_file), "ext": ext})

manifest_file = Path('assets/raw/manifest.json')
manifest_file.write_text(__import__('json').dumps(manifest, indent=2), encoding='utf-8')
print(f"Extracted {len(manifest)} images")
