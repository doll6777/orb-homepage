import { mkdir, writeFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const root = fileURLToPath(new URL('../', import.meta.url));
const originals = [
  'orb-space-lobby-wide.jpg', 'orb-chuna-room.png', 'orb-qeeg-test.jpeg',
  'orb-treatment-bed.jpeg', 'orb-space-consult.jpg', 'orb-space-reception.jpg',
  'orb-space-lobby-detail.jpg', 'orb-space-waiting.jpg', 'orb-space-corridor.jpg',
  'orb-space-treatment.jpg', 'orb-space-care-room.jpg',
];
const output = path.join(root, 'public/images');
await mkdir(output, { recursive: true });
const manifest = {};
for (const original of originals) {
  const source = path.join(root, 'public', original);
  const metadata = await sharp(source).metadata();
  if (!metadata.width || !metadata.height || (metadata.orientation && metadata.orientation !== 1)) {
    throw new Error(`Check image dimensions/orientation: ${original}`);
  }
  const widths = [...new Set([480, 800, 1200, 1600, 1920]
    .map(width => Math.min(width, metadata.width)))];
  const variants = [];
  for (const width of widths) {
    const filename = `${path.parse(original).name}-${width}.webp`;
    const result = await sharp(source)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82, effort: 5 })
      .toFile(path.join(output, filename));
    variants.push({ src: `/images/${filename}`, width: result.width, height: result.height, bytes: result.size });
  }
  manifest[`/${original}`] = { width: metadata.width, height: metadata.height, variants };
  const mobile = variants.find(item => item.width >= 800) ?? variants.at(-1);
  console.log(`${original}: ${(await stat(source)).size} → ${mobile.bytes} bytes (${mobile.width}px WebP)`);
}
await writeFile(path.join(root, 'app/components/image-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
