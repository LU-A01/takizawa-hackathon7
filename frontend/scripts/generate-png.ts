import sharp from 'sharp';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';

// ディレクトリパス設定
const PUBLIC_DIR = join(process.cwd(), 'public');
const IMAGES_DIR = join(PUBLIC_DIR, 'images');
const OUTPUT_DIR = join(IMAGES_DIR, 'png');

// 変換対象のファイル
const FILES_TO_CONVERT = [
  { name: 'tsunaagri-icon', width: 128, height: 128 },
  { name: 'tsunaagri-logo-128', width: 128, height: 128 },
  { name: 'tsunaagri-logo-256', width: 256, height: 256 },
  { name: 'tsunaagri-logo-512', width: 512, height: 512 },
];

// ディレクトリ作成
async function ensureDir(dir: string) {
  try {
    await mkdir(dir, { recursive: true });
    console.log(`✅ ディレクトリが作成されました: ${dir}`);
  } catch (err) {
    if ((err as any).code !== 'EEXIST') {
      console.error(`❌ ディレクトリの作成中にエラーが発生しました: ${err}`);
      throw err;
    }
  }
}

// SVGをPNGに変換
async function convertSvgToPng(
  svgPath: string, 
  pngPath: string, 
  width: number, 
  height: number
) {
  try {
    await sharp(svgPath)
      .resize(width, height)
      .png()
      .toFile(pngPath);
    console.log(`✅ 変換完了: ${svgPath} → ${pngPath}`);
    return pngPath;
  } catch (err) {
    console.error(`❌ 変換エラー (${svgPath}): ${err}`);
    throw err;
  }
}

// Base64形式のPNGデータを生成 (プレビュー用)
async function generateBase64Png(svgPath: string, width: number, height: number) {
  try {
    const buffer = await sharp(svgPath)
      .resize(width, height)
      .png()
      .toBuffer();
    return `data:image/png;base64,${buffer.toString('base64')}`;
  } catch (err) {
    console.error(`❌ Base64生成エラー: ${err}`);
    return null;
  }
}

// HTMLレポート生成
async function generateHtmlReport(results: any[]) {
  const html = `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TsunaAgri アイコン生成結果</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1 { color: #059669; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 30px 0; }
    .item { border: 1px solid #ddd; border-radius: 8px; padding: 15px; text-align: center; }
    .preview { margin: 10px 0; padding: 10px; background: #f5f5f5; border-radius: 5px; }
    img { max-width: 100%; height: auto; display: block; margin: 0 auto; }
  </style>
</head>
<body>
  <h1>TsunaAgri アイコン生成結果</h1>
  <p>以下のPNGファイルが正常に生成されました:</p>
  
  <div class="grid">
    ${results.map(result => `
      <div class="item">
        <h3>${result.name}</h3>
        <div class="preview">
          <img src="${result.base64 || ''}" alt="${result.name}" width="${result.width}" height="${result.height}">
        </div>
        <p>サイズ: ${result.width}x${result.height}px</p>
        <p>パス: ${result.path}</p>
      </div>
    `).join('')}
  </div>
  
  <p>生成されたPNGファイルは <code>${OUTPUT_DIR}</code> に保存されています。</p>
</body>
</html>
  `;
  
  const outputPath = join(PUBLIC_DIR, 'icon-report.html');
  await writeFile(outputPath, html);
  console.log(`✅ HTMLレポートを生成しました: ${outputPath}`);
  return outputPath;
}

// メイン処理
async function main() {
  console.log('🚀 TsunaAgri アイコン生成処理を開始します...');
  
  // 出力ディレクトリの作成
  await ensureDir(OUTPUT_DIR);
  
  const results = [];
  
  // 各SVGファイルをPNGに変換
  for (const file of FILES_TO_CONVERT) {
    const svgPath = join(IMAGES_DIR, `${file.name}.svg`);
    const pngPath = join(OUTPUT_DIR, `${file.name}.png`);
    
    try {
      // PNG変換
      await convertSvgToPng(svgPath, pngPath, file.width, file.height);
      
      // Base64データの生成 (レポート用)
      const base64 = await generateBase64Png(svgPath, file.width, file.height);
      
      results.push({
        name: file.name,
        path: pngPath,
        width: file.width,
        height: file.height,
        base64
      });
    } catch (err) {
      console.error(`⚠️ ${file.name} の処理中にエラーが発生しました`);
    }
  }
  
  // HTMLレポートの生成
  const reportPath = await generateHtmlReport(results);
  
  console.log(`\n✨ 処理が完了しました！`);
  console.log(`📁 生成されたPNG: ${OUTPUT_DIR}`);
  console.log(`📄 レポート: ${reportPath}`);
  console.log(`\n以下のコマンドでレポートを開くことができます:`);
  console.log(`bun --open ${reportPath}`);
}

// スクリプト実行
main().catch(err => {
  console.error('❌ エラーが発生しました:', err);
  process.exit(1);
}); 