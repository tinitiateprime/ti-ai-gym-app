// optimize-images.js
const fs = require('fs');
const path = require('path');
const imagemin = require('imagemin').default;
const imageminPngquant = require('imagemin-pngquant').default;

(async () => {
  const inputDir = 'assets';
  const outputDir = 'assets';

  const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.png'));

  for (const file of files) {
    const inputPath = path.join(inputDir, file);

    await imagemin([inputPath], {
      destination: outputDir,
      plugins: [
        imageminPngquant({
          quality: [0.6, 0.8],
        }),
      ],
    });

    console.log(`✔ Optimized: ${file}`);
  }
})();
