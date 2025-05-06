// build.js
import { build } from 'esbuild';

build({
    entryPoints: ['index.js'], // заміни на свій головний файл
    bundle: true,
    minify: true,
    platform: 'node',
    outfile: 'dist/bot.min.js', // результат
    target: ['node23'], // заміни на свою версію Node.js
})
    .then(() => {
        console.log('✅ Білд завершено');
    })
    .catch(() => process.exit(1));
