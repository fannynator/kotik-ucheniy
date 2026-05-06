const fs = require('fs');
const path = require('path');

// Явный порядок модулей (зависимости сначала)
const JS_FILES = [
    'js/utils.js',
    'js/config.js',
    'js/sounds.js',
    'js/state.js',
    'js/components/taskRenderer.js',
    'js/components/tutorial.js',
    'js/components/skillTree.js',
    'js/components/lesson.js',
    'js/components/story.js',
    'js/components/trap.js',
    'js/components/profile.js',
    'js/app.js',
];

const HTML_FILE = 'index.html';
const OUT_FILE = 'kot-ucheniy.html';

function readFile(filePath) {
    return fs.readFileSync(filePath, 'utf-8');
}

function processJs(content) {
    // Убираем import строки
    content = content.replace(/^\s*import\s+.*?\s+from\s+['"].*?['"];?\s*$/gm, '');
    // Убираем многострочные import { ... } from '...'
    content = content.replace(/^\s*import\s*\{[\s\S]*?\}\s*from\s+['"].*?['"];?\s*$/gm, '');
    // Убираем export { ... } блоки
    content = content.replace(/^\s*export\s*\{[\s\S]*?\};?\s*$/gm, '');
    // export const → const
    content = content.replace(/\bexport\s+const\b/g, 'const');
    // export let → let
    content = content.replace(/\bexport\s+let\b/g, 'let');
    // export var → var
    content = content.replace(/\bexport\s+var\b/g, 'var');
    // export function → function
    content = content.replace(/\bexport\s+function\b/g, 'function');
    // export class → class
    content = content.replace(/\bexport\s+class\b/g, 'class');
    // export default → (просто убираем export default, оставляем после него)
    content = content.replace(/\bexport\s+default\s+/g, '');
    // Убираем пустые строки в начале и конце
    content = content.trim();
    return content;
}

function build() {
    // Читаем HTML
    let html = readFile(HTML_FILE);

    // Собираем все JS
    const jsParts = [];
    for (const file of JS_FILES) {
        if (!fs.existsSync(file)) {
            console.error(`❌ Не найден: ${file}`);
            process.exit(1);
        }
        const raw = readFile(file);
        const processed = processJs(raw);
        jsParts.push(`/* === ${file} === */\n${processed}`);
        console.log(`✅ ${file}`);
    }

    const bundledJs = jsParts.join('\n\n');

    // Заменяем <script type="module" src="js/app.js"></script> на inline скрипт
    const moduleScriptRegex = /<script\s+type="module"\s+src="[^"]*app\.js"\s*>\s*<\/script>/i;
    const inlineScript = `<script>\n${bundledJs}\n</script>`;

    if (!moduleScriptRegex.test(html)) {
        console.error('❌ Не найден <script type="module" src="...app.js"> в index.html');
        process.exit(1);
    }

    html = html.replace(moduleScriptRegex, inlineScript);

    // Убираем регистрацию ServiceWorker (не работает на file://)
    html = html.replace(/<script>\s*if\s*\('serviceWorker'\s+in\s+navigator\)[\s\S]*?<\/script>/i, '');

    // Записываем результат
    fs.writeFileSync(OUT_FILE, html, 'utf-8');

    const sizeKb = (fs.statSync(OUT_FILE).size / 1024).toFixed(1);
    console.log(`\n✅ Готово! Файл: ${OUT_FILE}`);
    console.log(`📦 Размер: ${sizeKb} КБ`);
}

build();
