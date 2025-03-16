import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ディレクトリパスの設定
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SVGコンテンツ
const svgContent = '<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21V8" /><path d="M12 9C9 3 3 9 3 9" /><path d="M12 9c3-6 9 0 9 0" /><path d="M4 21h16" /></svg>';

// ディレクトリパス
const imagesDir = path.join(__dirname, '..', 'public', 'images');

// ファイル作成
const files = [
  { name: 'tsunaagri-icon.svg', content: svgContent },
  { name: 'tsunaagri-logo-128.svg', content: svgContent.replace('width="24" height="24"', 'width="128" height="128"') },
  { name: 'tsunaagri-logo-256.svg', content: svgContent.replace('width="24" height="24"', 'width="256" height="256"') },
  { name: 'tsunaagri-logo-512.svg', content: svgContent.replace('width="24" height="24"', 'width="512" height="512"') },
];

// ディレクトリが存在しない場合は作成
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
  console.log(`✅ ディレクトリを作成しました: ${imagesDir}`);
}

// ファイルを作成
files.forEach(file => {
  const filePath = path.join(imagesDir, file.name);
  fs.writeFileSync(filePath, file.content);
  console.log(`✅ ファイルを作成しました: ${filePath}`);
});

console.log('SVGファイルの作成が完了しました！'); 