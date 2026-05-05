// js/generators/math.js

import { rnd, shuffle, makeWrongs, choiceT, inputT, pairT } from '../utils.js';

// ══════════ SVG-ВИЗУАЛИЗАЦИИ ══════════
function appleSVG(count) {
    const size = 22, gap = 4, cols = Math.min(count, 6);
    const rows = Math.ceil(count / cols);
    const w = cols * (size + gap) + 8;
    const h = rows * (size + gap) + 8;
    let svg = `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="display:block;margin:8px auto;">`;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols && (r * cols + c) < count; c++) {
            const x = 6 + c * (size + gap);
            const y = 6 + r * (size + gap);
            svg += `<circle cx="${x + size/2}" cy="${y + size/2}" r="${size/2 - 1}" fill="#EF4444" stroke="#DC2626" stroke-width="1.5"/>`;
            svg += `<line x1="${x + size/2}" y1="${y + 2}" x2="${x + size/2}" y2="${y + 6}" stroke="#65A30D" stroke-width="2" stroke-linecap="round"/>`;
            svg += `<ellipse cx="${x + size/2 - 3}" cy="${y + size/2 - 3}" rx="2.5" ry="2" fill="rgba(255,255,255,0.4)"/>`;
        }
    }
    svg += `</svg>`;
    return svg;
}

function groupSVG(groups, items) {
    const total = groups * items;
    const itemSize = 18, gap = 4, cols = items;
    const rows = groups;
    const w = cols * (itemSize + gap) + 20;
    const h = rows * (itemSize + gap) + 20;
    let svg = `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="display:block;margin:8px auto;">`;
    for (let r = 0; r < rows; r++) {
        svg += `<rect x="4" y="${6 + r * (itemSize + gap)}" width="${w - 8}" height="${itemSize + gap - 2}" fill="rgba(59,130,246,0.1)" stroke="rgba(59,130,246,0.3)" stroke-width="1" rx="4"/>`;
        for (let c = 0; c < cols; c++) {
            const x = 12 + c * (itemSize + gap);
            const y = 10 + r * (itemSize + gap);
            svg += `<circle cx="${x + itemSize/2}" cy="${y + itemSize/2}" r="${itemSize/2 - 2}" fill="#F59E0B" stroke="#D97706" stroke-width="1"/>`;
        }
    }
    svg += `<text x="${w/2}" y="${h - 4}" text-anchor="middle" font-size="10" fill="#94A3B8">${groups} ряда × ${items}</text>`;
    svg += `</svg>`;
    return svg;
}

function rectSVG(w, h) {
    const scale = 18;
    const sw = w * scale + 30;
    const sh = h * scale + 30;
    return `<svg width="${sw}" height="${sh}" viewBox="0 0 ${sw} ${sh}" style="display:block;margin:8px auto;">
        <rect x="15" y="15" width="${w * scale}" height="${h * scale}" fill="#3B82F6" opacity="0.15" stroke="#3B82F6" stroke-width="2.5" rx="4"/>
        <text x="${15 + w * scale / 2}" y="10" text-anchor="middle" font-size="11" fill="white" font-weight="700">${w}</text>
        <text x="8" y="${15 + h * scale / 2}" text-anchor="end" font-size="11" fill="white" font-weight="700">${h}</text>
    </svg>`;
}

function pizzaSVG(total, eaten) {
    return `<svg width="120" height="120" viewBox="0 0 100 100" style="display:block;margin:8px auto;">
        <circle cx="50" cy="50" r="45" fill="#F59E0B" stroke="#D97706" stroke-width="2.5"/>
        ${Array.from({length: total}, (_, i) => {
            const angle = (i / total) * 360 - 90;
            const rad = (angle * Math.PI) / 180;
            return `<line x1="50" y1="50" x2="${50 + 43 * Math.cos(rad)}" y2="${50 + 43 * Math.sin(rad)}" stroke="rgba(255,255,255,0.4)" stroke-width="1"/>`;
        }).join('')}
        ${Array.from({length: eaten}, (_, i) => {
            const midAngle = ((i + 0.5) / total) * 360 - 90;
            const rad = (midAngle * Math.PI) / 180;
            return `<circle cx="${50 + 28 * Math.cos(rad)}" cy="${50 + 28 * Math.sin(rad)}" r="2.5" fill="white" opacity="0.5"/>`;
        }).join('')}
        <text x="50" y="98" text-anchor="middle" font-size="9" fill="#94A3B8">${eaten}/${total}</text>
    </svg>`;
}

// ══════════ СЛОЖЕНИЕ ══════════
export function generateAddLesson() {
    const t = [], add = (a, b) => a + b;
    
    const [a1, b1] = [rnd(2, 20), rnd(2, 20)];
    t.push(choiceT('🔥', 'Разминка', 'badge-warmup', `${a1} + ${b1} = ?`, add(a1, b1), `${a1} + ${b1} = ${add(a1, b1)}`));
    
    const [a2, b2] = [rnd(2, 10), rnd(2, 10)];
    t.push({...choiceT('🖼️', 'Визуальное', 'badge-visual', `Посчитай яблоки: ${a2} + ${b2} = ?`, add(a2, b2), `${a2} + ${b2} = ${add(a2, b2)}`), visual: appleSVG(a2 + b2)});
    
    const [a3, b3] = [rnd(5, 25), rnd(5, 25)];
    t.push(choiceT('🎯', 'Выбор', 'badge-choice', `${a3} + ${b3} = ?`, add(a3, b3), 'Выбирай внимательно'));
    
    const pd = [], ua = new Set();
    while (pd.length < 3) { const a = rnd(2, 20), b = rnd(2, 20); const ans = add(a, b); if (!ua.has(ans)) { ua.add(ans); pd.push({ left: `${a} + ${b}`, right: `${ans}`, answer: ans }); } }
    t.push(pairT('🔗', 'Парное', 'badge-pair', 'Соедини примеры с ответами:', pd, 'Нажимай левый → правый'));
    
    const [a5, b5] = [rnd(10, 50), rnd(10, 50)];
    t.push(inputT('✏️', 'Ввод', 'badge-input', `${a5} + ${b5} = ?`, add(a5, b5), `${a5} + ${b5} = ${add(a5, b5)}`));
    
    const trapA = rnd(5, 20);
    t.push(choiceT('⚠️', 'Ловушка', 'badge-trap', `Если к ${trapA} прибавить 0, получится:`, trapA, 'Число + 0 = то же число! Не попадись!'));
    
    const [a7, b7] = [rnd(20, 80), rnd(20, 80)];
    t.push(inputT('✏️', 'Ввод сложнее', 'badge-input', `${a7} + ${b7} = ?`, add(a7, b7), 'Складываем большие числа'));
    
    const [apples, pears] = [rnd(3, 8), rnd(2, 6)];
    t.push(inputT('⭐', 'Босс', 'badge-boss', `В корзине ${apples} яблок и ${pears} груш. Сколько всего фруктов?`, add(apples, pears), `${apples} + ${pears} = ${add(apples, pears)}`));
    
    return t;
}

// ══════════ ВЫЧИТАНИЕ ══════════
export function generateSubLesson() {
    const t = [], sub = (a, b) => a - b;
    
    const [a1, b1] = [rnd(10, 40), rnd(1, 9)];
    t.push(choiceT('🔥', 'Разминка', 'badge-warmup', `${a1} - ${b1} = ?`, sub(a1, b1), `${a1} - ${b1} = ${sub(a1, b1)}`));
    
    const [a2, b2] = [rnd(5, 15), rnd(1, a2 - 1)];
    t.push({...choiceT('🖼️', 'Визуальное', 'badge-visual', `Было ${a2}, убрали ${b2}. Сколько осталось?`, sub(a2, b2), `${a2} - ${b2} = ${sub(a2, b2)}`), visual: appleSVG(sub(a2, b2))});
    
    const [a3, b3] = [rnd(20, 50), rnd(5, 15)];
    t.push(choiceT('🎯', 'Выбор', 'badge-choice', `${a3} - ${b3} = ?`, sub(a3, b3), 'Выбирай внимательно'));
    
    const pd = [], ua2 = new Set();
    while (pd.length < 3) { const a = rnd(10, 40), b = rnd(1, 9); const ans = sub(a, b); if (!ua2.has(ans)) { ua2.add(ans); pd.push({ left: `${a} - ${b}`, right: `${ans}`, answer: ans }); } }
    t.push(pairT('🔗', 'Парное', 'badge-pair', 'Соедини примеры с ответами:', pd, 'Нажимай левый → правый'));
    
    const [a5, b5] = [rnd(30, 80), rnd(10, a5 - 1)];
    t.push(inputT('✏️', 'Ввод', 'badge-input', `${a5} - ${b5} = ?`, sub(a5, b5), `${a5} - ${b5} = ${sub(a5, b5)}`));
    
    const same = rnd(10, 30);
    t.push(choiceT('⚠️', 'Ловушка', 'badge-trap', `${same} - ${same} = ?`, 0, 'Одинаковые числа — разность 0!'));
    
    const [a7, b7] = [rnd(60, 99), rnd(20, a7 - 1)];
    t.push(inputT('✏️', 'Ввод сложнее', 'badge-input', `${a7} - ${b7} = ?`, sub(a7, b7), 'Вычитаем большие числа'));
    
    const price = rnd(20, 80), paid = price + rnd(10, 50);
    t.push(inputT('⭐', 'Босс', 'badge-boss', `Покупка ${price} руб. Дали ${paid} руб. Сдача?`, sub(paid, price), `${paid} - ${price} = ${sub(paid, price)}`));
    
    return t;
}

// ══════════ УМНОЖЕНИЕ ══════════
export function generateMulLesson() {
    const t = [], mul = (a, b) => a * b;
    
    const [a1, b1] = [rnd(2, 9), rnd(2, 9)];
    t.push(choiceT('🔥', 'Разминка', 'badge-warmup', `${a1} × ${b1} = ?`, mul(a1, b1), `${a1} × ${b1} = ${mul(a1, b1)}`));
    
    const [a2, b2] = [rnd(2, 5), rnd(2, 6)];
    t.push({...choiceT('🖼️', 'Визуальное', 'badge-visual', `${a2} ряда по ${b2}. Сколько всего?`, mul(a2, b2), `${a2} × ${b2} = ${mul(a2, b2)}`), visual: groupSVG(a2, b2)});
    
    const [a3, b3] = [rnd(2, 9), rnd(2, 9)];
    t.push(choiceT('🎯', 'Выбор', 'badge-choice', `${a3} × ${b3} = ?`, mul(a3, b3), 'Выбирай внимательно'));
    
    const pd = [], ua3 = new Set();
    while (pd.length < 3) { const a = rnd(2, 9), b = rnd(2, 9); const ans = mul(a, b); if (!ua3.has(ans)) { ua3.add(ans); pd.push({ left: `${a} × ${b}`, right: `${ans}`, answer: ans }); } }
    t.push(pairT('🔗', 'Парное', 'badge-pair', 'Соедини примеры с ответами:', pd, 'Нажимай левый → правый'));
    
    const [a5, b5] = [rnd(3, 9), rnd(2, 9)];
    t.push(inputT('✏️', 'Ввод', 'badge-input', `${a5} × ${b5} = ?`, mul(a5, b5), `${a5} × ${b5} = ${mul(a5, b5)}`));
    
    const tn = rnd(2, 9);
    t.push(choiceT('⚠️', 'Ловушка', 'badge-trap', `${tn} × 0 = ?`, 0, 'Любое × 0 = 0! Не перепутай с +!'));
    
    const [a7, b7] = [rnd(3, 9), 10];
    t.push(inputT('✏️', 'Ввод сложнее', 'badge-input', `${a7} × ${b7} = ?`, mul(a7, b7), 'Допиши 0 — это умножение на 10!'));
    
    const shelves = rnd(2, 4), books = rnd(3, 8);
    t.push(inputT('⭐', 'Босс', 'badge-boss', `${shelves} полки по ${books} книг. Всего?`, mul(shelves, books), `${shelves} × ${books} = ${mul(shelves, books)}`));
    
    return t;
}

// ══════════ ДЕЛЕНИЕ ══════════
export function generateDivLesson() {
    const t = [];
    
    const b1 = rnd(2, 9), c1 = rnd(2, 9);
    t.push(choiceT('🔥', 'Разминка', 'badge-warmup', `${b1 * c1} ÷ ${b1} = ?`, c1, `${b1 * c1} ÷ ${b1} = ${c1}`));
    
    const b2 = rnd(2, 6), c2 = rnd(2, 6);
    t.push({...choiceT('🖼️', 'Визуальное', 'badge-visual', `${b2 * c2} яблок на ${b2} корзины. В каждой?`, c2, `${b2 * c2} ÷ ${b2} = ${c2}`), visual: groupSVG(b2, c2)});
    
    const b3 = rnd(2, 9), c3 = rnd(2, 9);
    t.push(choiceT('🎯', 'Выбор', 'badge-choice', `${b3 * c3} ÷ ${b3} = ?`, c3, 'Выбирай внимательно'));
    
    const pd = [], ua4 = new Set();
    while (pd.length < 3) { const b = rnd(2, 8), c = rnd(2, 8), a = b * c; if (!ua4.has(c)) { ua4.add(c); pd.push({ left: `${a} ÷ ${b}`, right: `${c}`, answer: c }); } }
    t.push(pairT('🔗', 'Парное', 'badge-pair', 'Соедини примеры с ответами:', pd, 'Нажимай левый → правый'));
    
    const b5 = rnd(2, 9), c5 = rnd(2, 9);
    t.push(inputT('✏️', 'Ввод', 'badge-input', `${b5 * c5} ÷ ${b5} = ?`, c5, `${b5 * c5} ÷ ${b5} = ${c5}`));
    
    const tn2 = rnd(2, 9);
    t.push(choiceT('⚠️', 'Ловушка', 'badge-trap', `0 ÷ ${tn2} = ?`, 0, '0 ÷ число = 0! А делить на 0 нельзя!'));
    
    const b7 = rnd(2, 5), c7 = rnd(5, 9);
    t.push(inputT('✏️', 'Ввод сложнее', 'badge-input', `${b7 * c7} ÷ ${b7} = ?`, c7, 'Деление — обратно умножению'));
    
    const total = rnd(20, 60), friends = rnd(2, 5);
    const each = Math.floor(total / friends), rem = total - each * friends;
    t.push(inputT('⭐', 'Босс', 'badge-boss', `${total} конфет на ${friends} друзей. По сколько? (ост.${rem})`, each, `${total} ÷ ${friends} = ${each}`));
    
    return t;
}

// ══════════ УРАВНЕНИЯ ══════════
export function generateEqLesson() {
    const t = [];
    
    const x1 = rnd(2, 15), a1 = rnd(1, 10);
    t.push(choiceT('🔥', 'Разминка', 'badge-warmup', `x + ${a1} = ${x1 + a1}. x = ?`, x1, `x = ${x1 + a1} - ${a1} = ${x1}`));
    
    const x2 = rnd(3, 10), a2 = rnd(1, x2);
    t.push(choiceT('🎯', 'Выбор', 'badge-choice', `x - ${a2} = ${x2 - a2}. x = ?`, x2, `x = ${x2 - a2} + ${a2} = ${x2}`));
    
    const x3 = rnd(2, 9), m3 = rnd(2, 5);
    t.push({...choiceT('🖼️', 'Визуальное', 'badge-visual', `${m3} × x = ${x3 * m3}. x = ?`, x3, `x = ${x3 * m3} ÷ ${m3} = ${x3}`), visual: groupSVG(m3, x3)});
    
    const pd = [], ua5 = new Set();
    while (pd.length < 3) { const x = rnd(2, 12), a = rnd(1, 8); if (!ua5.has(x)) { ua5.add(x); pd.push({ left: `x + ${a} = ${x + a}`, right: `x = ${x}`, answer: x }); } }
    t.push(pairT('🔗', 'Парное', 'badge-pair', 'Соедини уравнение с ответом:', pd, 'Нажимай левый → правый'));
    
    t.push(inputT('✏️', 'Ввод', 'badge-input', 'x + 7 = 15. x = ?', 8, 'x = 15 - 7 = 8'));
    
    const trapVal = rnd(5, 15);
    t.push(choiceT('⚠️', 'Ловушка', 'badge-trap', `x + 0 = ${trapVal}. x = ?`, trapVal, 'x + 0 = x! Не выдумывай лишнего!'));
    
    const m7 = rnd(2, 6), x7 = rnd(2, 10);
    t.push(inputT('✏️', 'Ввод сложнее', 'badge-input', `${m7} × x = ${m7 * x7}. x = ?`, x7, `x = ${m7 * x7} ÷ ${m7} = ${x7}`));
    
    const toyPrice = rnd(10, 40), totalMoney = toyPrice + rnd(20, 50);
    t.push(inputT('⭐', 'Босс', 'badge-boss', `Купил за ${toyPrice} руб, осталось ${totalMoney - toyPrice} руб. Было?`, totalMoney, `x = ${totalMoney - toyPrice} + ${toyPrice} = ${totalMoney}`));
    
    return t;
}

// ══════════ ПЕРИМЕТР И ПЛОЩАДЬ ══════════
export function generateGeomLesson() {
    const t = [];
    
    const w1 = rnd(2, 8), h1 = rnd(3, 10);
    t.push(choiceT('🔥', 'Разминка', 'badge-warmup', `Прямоугольник ${w1}×${h1}. P = ?`, 2*(w1+h1), `P = 2×(${w1}+${h1}) = ${2*(w1+h1)}`));
    
    const s2 = rnd(2, 8);
    t.push({...choiceT('🖼️', 'Визуальное', 'badge-visual', `Квадрат со стороной ${s2}. S = ?`, s2*s2, `S = ${s2}×${s2} = ${s2*s2}`), visual: rectSVG(s2, s2)});
    
    const w3 = rnd(2, 8), h3 = rnd(3, 10);
    t.push(choiceT('🎯', 'Выбор', 'badge-choice', `Прямоугольник ${w3}×${h3}. S = ?`, w3*h3, `S = ${w3}×${h3} = ${w3*h3}`));
    
    t.push(pairT('🔗', 'Парное', 'badge-pair', 'Соедини задачу с ответом:', [{ left: 'P 3×4', right: '14', answer: 14 }, { left: 'S 5×5', right: '25', answer: 25 }, { left: 'P 6×6', right: '24', answer: 24 }], 'Нажимай левый → правый'));
    
    const w5 = rnd(2, 8), h5 = rnd(3, 10);
    t.push(inputT('✏️', 'Ввод', 'badge-input', `Прямоугольник ${w5}×${h5}. P = ?`, 2*(w5+h5), `P = 2×(${w5}+${h5}) = ${2*(w5+h5)}`));
    
    const s6 = rnd(2, 8);
    t.push(choiceT('⚠️', 'Ловушка', 'badge-trap', `Квадрат ${s6}. ПЕРИМЕТР (не площадь!) = ?`, 4*s6, `P = 4×${s6} = ${4*s6}. S = ${s6*s6}. Не перепутай!`));
    
    const w7 = rnd(5, 10), h7 = rnd(5, 10);
    t.push(inputT('✏️', 'Ввод сложнее', 'badge-input', `Прямоугольник ${w7}×${h7}. S = ?`, w7*h7, `S = ${w7}×${h7} = ${w7*h7}`));
    
    const rw = rnd(4, 10), rh = rnd(3, 8);
    t.push(inputT('⭐', 'Босс', 'badge-boss', `Комната ${rw}×${rh} м. P и S через запятую`, `${2*(rw+rh)},${rw*rh}`, `P=${2*(rw+rh)}, S=${rw*rh}`));
    
    return t;
}

// ══════════ ДРОБИ ══════════
export function generateFracLesson() {
    const t = [];
    
    t.push(choiceT('🔥', 'Разминка', 'badge-warmup', 'Какая дробь больше: 1/4 или 3/4?', '3/4', 'Больше числитель → больше дробь'));
    
    const total = 8, eaten = rnd(1, 6);
    t.push({...choiceT('🖼️', 'Визуальное', 'badge-visual', `Пицца из ${total} кусков, съели ${eaten}. Осталось?`, `${total-eaten}/${total}`, `${total}-${eaten}=${total-eaten} → ${total-eaten}/${total}`), visual: pizzaSVG(total, eaten)});
    
    t.push(choiceT('🎯', 'Выбор', 'badge-choice', '1/2 от 10 = ?', 5, '10 ÷ 2 = 5'));
    
    t.push(pairT('🔗', 'Парное', 'badge-pair', 'Соедини долю с ответом:', [{ left: '1/2 от 20', right: '10', answer: 10 }, { left: '1/3 от 12', right: '4', answer: 4 }, { left: '1/4 от 16', right: '4', answer: 4 }], 'Нажимай левый → правый'));
    
    t.push(inputT('✏️', 'Ввод', 'badge-input', 'Сократи: 2/4 (как 1/2)', '1/2', 'Делим числитель и знаменатель на 2'));
    
    t.push(choiceT('⚠️', 'Ловушка', 'badge-trap', '1/2 + 1/2 = ?', '1', '2/2 = 1 целая! Не 2/4 — это ошибка!'));
    
    t.push(inputT('✏️', 'Ввод сложнее', 'badge-input', '1/3 от 12 = ?', 4, '12 ÷ 3 = 4'));
    
    const total2 = rnd(10, 20), eaten2 = rnd(1, total2 - 1);
    t.push(inputT('⭐', 'Босс', 'badge-boss', `Было ${total2} конфет, съели ${eaten2}. Осталось? (как ${total2-eaten2}/${total2})`, `${total2-eaten2}/${total2}`, `${total2}-${eaten2}=${total2-eaten2} → ${total2-eaten2}/${total2}`));
    
    return t;
}

export function generateMathLesson(skillId) {
    const gens = { add:generateAddLesson, sub:generateSubLesson, mul:generateMulLesson, div:generateDivLesson, eq:generateEqLesson, geom:generateGeomLesson, frac:generateFracLesson };
    return gens[skillId] ? gens[skillId]() : generateAddLesson();
}