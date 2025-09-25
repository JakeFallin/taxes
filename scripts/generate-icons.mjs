import sharp from 'sharp';
import { readFile } from 'fs/promises';
import { join } from 'path';

const srcSvg = join(process.cwd(), 'public', 'favicon.svg');
const outDir = join(process.cwd(), 'public');

const sizesPng = [16, 32, 48, 64, 128, 192, 256, 512];

async function main() {
  const svg = await readFile(srcSvg);

  // PNGs
  for (const size of sizesPng) {
    const out = join(outDir, `icon-${size}x${size}.png`);
    await sharp(svg).resize(size, size).png().toFile(out);
    console.log(`✓ ${out}`);
  }

  // ICO (16,32,48)
  const icoOut = join(outDir, 'favicon.ico');
  const icoBuffers = await Promise.all([16, 32, 48].map(size => sharp(svg).resize(size, size).png().toBuffer()));
  // sharp can't write .ico directly; write 48x48 as fallback, browsers accept
  await sharp(svg).resize(48, 48).png().toFile(icoOut);
  console.log(`✓ ${icoOut}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
