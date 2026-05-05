// ═══════════════ ГЕНЕРАТОРЫ МАТЕМАТИКИ ═══════════════

// Вспомогательные SVG-функции
function appleGroupSVG(count, rows = 1) {
    const applesPerRow = Math.ceil(count / rows);
    const size = 24, gap = 4;
    const w = applesPerRow * (size + gap) + 12;
    const h = rows * (size + gap) + 12;
    let svg = `<svg width="${w}" height="${h}" class="visual-svg" viewBox="0 0 ${w} ${h}">`;
    svg += `<rect width="${w}" height="${h}" fill="none" rx="8"/>`;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < applesPerRow && (r * applesPerRow + c) < count; c++) {
            const x = 8 + c * (size + gap);
            const y = 8 + r * (size + gap);
            svg += `<circle cx="${x + size/2}" cy="${y + size/2}" r="${size/2 - 1}" fill="#EF4444" stroke="#DC2626" stroke-width="1.5"/>`;
            svg += `<line x1="${x + size/2}" y1="${y + 2}" x2="${x + size/2}" y2="${y + 6}" stroke="#65A30D" stroke-width="2" stroke-linecap="round"/>`;
            svg += `<ellipse cx="${x + size/2 - 4}" cy="${y + size/2 - 3}" rx="3" ry="2" fill="rgba(255,255,255,0.4)"/>`;
        }
    }
    svg += `</svg>`;
    return svg;
}

function rectSVG(w, h, label = '') {
    const scale = 20;
    const svg = `<svg width="${w * scale + 20}" height="${h * scale + 20}" class="visual-svg" viewBox="0 0 ${w * scale + 20} ${h * scale + 20}">
        <rect x="10" y="10" width="${w * scale}" height="${h * scale}" fill="#3B82F6" stroke="#1D4ED8" stroke-width="3" rx="4" opacity="0.2"/>
        <text x="${10 + w * scale / 2}" y="${12}" text-anchor="middle" font-size="11" fill="white" font-weight="700">${w}</text>
        <text x="5" y="${10 + h * scale / 2}" text-anchor="end" font-size="11" fill="white" font-weight="700">${h}</text>
        ${label ? `<text x="${10 + w * scale / 2}" y="${10 + h * scale / 2}" text-anchor="middle" font-size="14" fill="white" font-weight="800">${label}</text>` : ''}
    </svg>`;
    return svg;
}

function pizzaSliceSVG(total, eaten) {
    const svg = `<svg width="100" height="100" class="visual-svg" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="#F59E0B" stroke="#D97706" stroke-width="3"/>
        ${Array.from({length: total}, (_, i) => {
            const angle = (i / total) * 360 - 90;
            const rad = angle * Math.PI / 180;
            const x2 = 50 + 45 * Math.cos(rad);
            const y2 = 50 + 45 * Math.sin(rad);
            return `<line x1="50" y1="50" x2="${x2}" y2="${y2}" stroke="#D97706" stroke-width="1.5"/>`;
        }).join('')}
        ${Array.from({length: eaten}, (_, i) => {
            const angle = (i / total) * 360 - 90;
            const midAngle = ((i + 0.5) / total) * 360 - 90;
            const rad = midAngle * Math.PI / 180;
            return `<circle cx="${50 + 25 * Math.cos(rad)}" cy="${50 + 25 * Math.sin(rad)}" r="4" fill="#EF4444"/>`;
        }).join('')}
    </svg>`;
    return svg;
}

// Исправленный makeWrongs
function makeWrongs(c, n = 3) {
    const w = [];
    const offsets = [-3, -2, -1, 1, 2, 3, 4, 5, -4, -5, 6, -6, 7, -7, 8, -8];
    for (let i = 0; i < offsets.length && w.length < n; i++) {
        const x = c + offsets[i];
        if (x >= 0 && x !== c && !w.includes(x)) w.push(x);
    }
    while (w.length < n) {
        const x = c + rnd(1, 10) * (Math.random() > 0.5 ? 1 : -1);
        if (x >= 0 && x !== c && !w.includes(x)) w.push(x);
    }
    return w;
}

// Создание задания с выбором
function choiceT(emoji, badge, bc, q, correct, expl, visual = null) {
    const wrongs = makeWrongs(correct, 3);
    const options = [correct, ...wrongs];
    const shuffled = shuffle(options);
    return {
        type: 'choice', emoji, badge, badgeClass: bc, question: q,
        options: shuffled,
        correctIdx: shuffled.indexOf(correct),
        correctAns: correct,
        explanation: expl,
        visual: visual
    };
}

function inputT(emoji, badge, bc, q, correct, expl) {
    return { type: 'input', emoji, badge, badgeClass: bc, question: q, correctAns: correct, explanation: expl };
}

function pairT(emoji, badge, bc, q, pairs, expl) {
    return { type: 'pair', emoji, badge, badgeClass: bc, question: q, pairs, explanation: expl };
}

// ═══════════════ СЛОЖЕНИЕ ═══════════════
function generateAddLesson() {
    const t = [], g = () => [rnd(2, 20), rnd(2, 20)], add = (a, b) => a + b;

    // 1. Разминка (простой выбор)
    const [a1, b1] = g();
    t.push(choiceT('🔥', 'Разминка', 'badge-warmup', `${a1} + ${b1} = ?`, add(a1, b1), `${a1} + ${b1} = ${add(a1, b1)}`));

    // 2. Визуальное (SVG с яблоками)
    const [a2, b2] = g();
    t.push(choiceT('🖼️', 'Визуальное', 'badge-visual',
        `Посчитай яблоки:`, add(a2, b2),
        `${a2} + ${b2} = ${add(a2, b2)}`,
        appleGroupSVG(a2 + b2, 2)
    ));

    // 3. Выбор
    const [a3, b3] = g();
    t.push(choiceT('🎯', 'Выбор', 'badge-choice', `${a3} + ${b3} = ?`, add(a3, b3), `${a3} + ${b3} = ${add(a3, b3)}`));

    // 4. Парное (соединить примеры с ответами)
    const pd = [], ua = new Set();
    while (pd.length < 3) {
        const [a, b] = g();
        const ans = add(a, b);
        if (!ua.has(ans)) {
            ua.add(ans);
            pd.push({ left: `${a} + ${b}`, right: `${ans}`, answer: ans });
        }
    }
    t.push(pairT('🔗', 'Парное', 'badge-pair', 'Соедини примеры с ответами:', pd, 'Нажимай левый → правый'));

    // 5. Ввод
    const [a5, b5] = g();
    t.push(inputT('✏️', 'Ввод', 'badge-input', `${a5} + ${b5} = ?`, add(a5, b5), `${a5} + ${b5} = ${add(a5, b5)}`));

    // 6. Ловушка (сложение с нулём — но в неожиданном контексте)
    const trapA = rnd(5, 20);
    t.push(choiceT('⚠️', 'Ловушка', 'badge-trap',
        `Если к ${trapA} прибавить 0, получится:`,
        trapA, 'Число + 0 = то же число! Не попадись!'
    ));

    // 7. Ввод сложнее (трёхзначные)
    const [a7, b7] = [rnd(10, 50), rnd(10, 50)];
    t.push(inputT('✏️', 'Ввод', 'badge-input', `${a7} + ${b7} = ?`, add(a7, b7), `${a7} + ${b7} = ${add(a7, b7)}`));

    // 8. Босс (задача в два действия)
    const apples = rnd(3, 8), pears = rnd(2, 6), bananas = rnd(1, 4);
    const total = apples + pears + bananas;
    t.push(inputT('⭐', 'Босс', 'badge-boss',
        `В корзине ${apples} яблок, ${pears} груш и ${bananas} бананов. Сколько всего фруктов?`,
        total,
        `${apples} + ${pears} + ${bananas} = ${total} фруктов`
    ));

    return t;
}

// ═══════════════ ВЫЧИТАНИЕ ═══════════════
function generateSubLesson() {
    const t = [];
    const g = () => { const x = rnd(10, 40), y = rnd(1, x - 1); return [x, y]; };
    const sub = (a, b) => a - b;

    // 1. Разминка
    const [a1, b1] = g();
    t.push(choiceT('🔥', 'Разминка', 'badge-warmup', `${a1} - ${b1} = ?`, sub(a1, b1), `${a1} - ${b1} = ${sub(a1, b1)}`));

    // 2. Визуальное
    const [a2, b2] = g();
    t.push(choiceT('🖼️', 'Визуальное', 'badge-visual',
        `Было ${a2} яблок, съели ${b2}. Сколько осталось?`, sub(a2, b2),
        `${a2} - ${b2} = ${sub(a2, b2)}`,
        appleGroupSVG(a2 - b2, 2)
    ));

    // 3. Выбор
    const [a3, b3] = g();
    t.push(choiceT('🎯', 'Выбор', 'badge-choice', `${a3} - ${b3} = ?`, sub(a3, b3), `${a3} - ${b3} = ${sub(a3, b3)}`));

    // 4. Парное
    const pd = [], ua = new Set();
    while (pd.length < 3) {
        const [a, b] = g();
        const ans = sub(a, b);
        if (!ua.has(ans)) {
            ua.add(ans);
            pd.push({ left: `${a} - ${b}`, right: `${ans}`, answer: ans });
        }
    }
    t.push(pairT('🔗', 'Парное', 'badge-pair', 'Соедини примеры с ответами:', pd, 'Нажимай левый → правый'));

    // 5. Ввод
    const [a5, b5] = g();
    t.push(inputT('✏️', 'Ввод', 'badge-input', `${a5} - ${b5} = ?`, sub(a5, b5), `${a5} - ${b5} = ${sub(a5, b5)}`));

    // 6. Ловушка (одинаковые числа дают 0)
    const same = rnd(10, 30);
    t.push(choiceT('⚠️', 'Ловушка', 'badge-trap',
        `${same} - ${same} = ?`,
        0, 'Одинаковые числа — разность 0! Не перепутай!'
    ));

    // 7. Ввод сложнее
    const [a7, b7] = [rnd(50, 80), rnd(10, a7 - 1)];
    t.push(inputT('✏️', 'Ввод', 'badge-input', `${a7} - ${b7} = ?`, sub(a7, b7), `${a7} - ${b7} = ${sub(a7, b7)}`));

    // 8. Босс (задача про сдачу)
    const price = rnd(20, 80), paid = price + rnd(10, 50);
    t.push(inputT('⭐', 'Босс', 'badge-boss',
        `Покупка стоит ${price} руб. Покупатель дал ${paid} руб. Сколько сдачи?`,
        sub(paid, price),
        `${paid} - ${price} = ${sub(paid, price)} руб сдачи`
    ));

    return t;
}

// ═══════════════ УМНОЖЕНИЕ ═══════════════
function generateMulLesson() {
    const t = [], g = () => [rnd(2, 9), rnd(2, 9)], mul = (a, b) => a * b;

    // 1. Разминка
    const [a1, b1] = g();
    t.push(choiceT('🔥', 'Разминка', 'badge-warmup', `${a1} × ${b1} = ?`, mul(a1, b1), `${a1} × ${b1} = ${mul(a1, b1)}`));

    // 2. Визуальное (группы яблок)
    const [a2, b2] = [rnd(2, 5), rnd(2, 6)];
    t.push(choiceT('🖼️', 'Визуальное', 'badge-visual',
        `${a2} ряда по ${b2} яблока. Сколько всего?`, mul(a2, b2),
        `${a2} × ${b2} = ${mul(a2, b2)}`,
        appleGroupSVG(mul(a2, b2), a2)
    ));

    // 3. Выбор
    const [a3, b3] = g();
    t.push(choiceT('🎯', 'Выбор', 'badge-choice', `${a3} × ${b3} = ?`, mul(a3, b3), `${a3} × ${b3} = ${mul(a3, b3)}`));

    // 4. Парное
    const pd = [], ua = new Set();
    while (pd.length < 3) {
        const [a, b] = g();
        const ans = mul(a, b);
        if (!ua.has(ans)) {
            ua.add(ans);
            pd.push({ left: `${a} × ${b}`, right: `${ans}`, answer: ans });
        }
    }
    t.push(pairT('🔗', 'Парное', 'badge-pair', 'Соедини примеры с ответами:', pd, 'Нажимай левый → правый'));

    // 5. Ввод
    const [a5, b5] = g();
    t.push(inputT('✏️', 'Ввод', 'badge-input', `${a5} × ${b5} = ?`, mul(a5, b5), `${a5} × ${b5} = ${mul(a5, b5)}`));

    // 6. Ловушка (умножение на 0 — реально ошибаются!)
    const tn = rnd(2, 9);
    t.push(choiceT('⚠️', 'Ловушка', 'badge-trap',
        `${tn} × 0 = ?`,
        0, 'Любое число × 0 = 0! Запомни!'
    ));

    // 7. Ввод сложнее (умножение на 10)
    const [a7, b7] = [rnd(3, 9), 10];
    t.push(inputT('✏️', 'Ввод', 'badge-input', `${a7} × ${b7} = ?`, mul(a7, b7), `${a7} × 10 = ${mul(a7, b7)} (допиши 0!)`));

    // 8. Босс (многошаговая задача)
    const shelves = rnd(2, 4), boxes = rnd(2, 5), booksPerBox = rnd(3, 8);
    const totalBooks = shelves * boxes * booksPerBox;
    t.push(inputT('⭐', 'Босс', 'badge-boss',
        `${shelves} полки, на каждой ${boxes} коробки, в каждой по ${booksPerBox} книг. Сколько всего книг?`,
        totalBooks,
        `${shelves} × ${boxes} × ${booksPerBox} = ${totalBooks} книг`
    ));

    return t;
}

// ═══════════════ ДЕЛЕНИЕ ═══════════════
function generateDivLesson() {
    const t = [], g = () => { const b = rnd(2, 9), c = rnd(2, 9); return [b * c, b]; };
    const div = (a, b) => a / b;

    // 1. Разминка
    const [a1, b1] = g();
    t.push(choiceT('🔥', 'Разминка', 'badge-warmup', `${a1} ÷ ${b1} = ?`, div(a1, b1), `${a1} ÷ ${b1} = ${div(a1, b1)}`));

    // 2. Визуальное
    const [a2, b2] = g();
    t.push(choiceT('🖼️', 'Визуальное', 'badge-visual',
        `${a2} яблок разложили в ${b2} корзины поровну. Сколько в каждой?`, div(a2, b2),
        `${a2} ÷ ${b2} = ${div(a2, b2)}`,
        appleGroupSVG(div(a2, b2), Math.min(b2, 3))
    ));

    // 3. Выбор
    const [a3, b3] = g();
    t.push(choiceT('🎯', 'Выбор', 'badge-choice', `${a3} ÷ ${b3} = ?`, div(a3, b3), `${a3} ÷ ${b3} = ${div(a3, b3)}`));

    // 4. Парное
    const pd = [], ua = new Set();
    while (pd.length < 3) {
        const b = rnd(2, 8), c = rnd(2, 8), a = b * c, ans = c;
        if (!ua.has(ans)) {
            ua.add(ans);
            pd.push({ left: `${a} ÷ ${b}`, right: `${ans}`, answer: ans });
        }
    }
    t.push(pairT('🔗', 'Парное', 'badge-pair', 'Соедини примеры с ответами:', pd, 'Нажимай левый → правый'));

    // 5. Ввод
    const [a5, b5] = g();
    t.push(inputT('✏️', 'Ввод', 'badge-input', `${a5} ÷ ${b5} = ?`, div(a5, b5), `${a5} ÷ ${b5} = ${div(a5, b5)}`));

    // 6. Ловушка (0 ÷ число — не все знают!)
    const tn2 = rnd(2, 9);
    t.push(choiceT('⚠️', 'Ловушка', 'badge-trap',
        `0 ÷ ${tn2} = ?`,
        0, '0 ÷ любое число = 0! А наоборот нельзя!'
    ));

    // 7. Ввод сложнее
    const [a7, b7] = [rnd(7, 9) * rnd(2, 5), rnd(2, 5)];
    t.push(inputT('✏️', 'Ввод', 'badge-input', `${a7} ÷ ${b7} = ?`, div(a7, b7), `${a7} ÷ ${b7} = ${div(a7, b7)}`));

    // 8. Босс (задача с распределением)
    const total = rnd(20, 60), friends = rnd(2, 5);
    const each = Math.floor(total / friends);
    const remainder = total - each * friends;
    t.push(inputT('⭐', 'Босс', 'badge-boss',
        `${total} конфет нужно разделить на ${friends} друзей. По сколько каждому? (остаток ${remainder})`,
        each,
        `${total} ÷ ${friends} = ${each} (остаток ${remainder})`
    ));

    return t;
}

// ═══════════════ УРАВНЕНИЯ ═══════════════
function generateEqLesson() {
    const t = [];
    const g = () => { const x = rnd(2, 15), a = rnd(1, 10); return [x, a, x + a]; };

    // 1. Разминка
    const [x1, a1, ans1] = g();
    t.push(choiceT('🔥', 'Разминка', 'badge-warmup', `x + ${a1} = ${ans1}. x = ?`, x1, `x = ${ans1} - ${a1} = ${x1}`));

    // 2. Выбор (уравнение на вычитание)
    const [x2, a2] = [rnd(3, 10), rnd(1, x2 - 1)];
    t.push(choiceT('🎯', 'Выбор', 'badge-choice', `x - ${a2} = ${x2 - a2}. x = ?`, x2, `x = ${x2 - a2} + ${a2} = ${x2}`));

    // 3. Визуальное (весы в равновесии)
    const [x3, m3] = [rnd(2, 9), rnd(2, 5)];
    t.push(choiceT('🖼️', 'Визуальное', 'badge-visual',
        `${m3} × x = ${x3 * m3}. x = ?`, x3,
        `x = ${x3 * m3} ÷ ${m3} = ${x3}`
    ));

    // 4. Парное
    const pd = [], ua = new Set();
    while (pd.length < 3) {
        const x = rnd(2, 12), a = rnd(1, 8);
        if (!ua.has(x)) {
            ua.add(x);
            pd.push({ left: `x + ${a} = ${x + a}`, right: `x = ${x}`, answer: x });
        }
    }
    t.push(pairT('🔗', 'Парное', 'badge-pair', 'Соедини уравнение с ответом:', pd, 'Нажимай левый → правый'));

    // 5. Ввод
    const [x5, a5, ans5] = g();
    t.push(inputT('✏️', 'Ввод', 'badge-input', `x + ${a5} = ${ans5}. x = ?`, x5, `x = ${ans5} - ${a5} = ${x5}`));

    // 6. Ловушка (x + 0 = число — легко ошибиться!)
    const trapVal = rnd(5, 15);
    t.push(choiceT('⚠️', 'Ловушка', 'badge-trap',
        `x + 0 = ${trapVal}. x = ?`,
        trapVal, 'x + 0 = x, значит x = число! Не перепутай!'
    ));

    // 7. Ввод сложнее (умножение)
    const [x7, m7] = [rnd(2, 10), rnd(2, 6)];
    t.push(inputT('✏️', 'Ввод', 'badge-input', `${m7} × x = ${x7 * m7}. x = ?`, x7, `x = ${x7 * m7} ÷ ${m7} = ${x7}`));

    // 8. Босс (задача на составление уравнения)
    const toyPrice = rnd(10, 40), totalMoney = toyPrice + rnd(20, 50);
    t.push(inputT('⭐', 'Босс', 'badge-boss',
        `Петя купил игрушку за ${toyPrice} руб, и у него осталось ${totalMoney - toyPrice} руб. Сколько было денег? (x - ${toyPrice} = ${totalMoney - toyPrice})`,
        totalMoney,
        `x = ${totalMoney - toyPrice} + ${toyPrice} = ${totalMoney}`
    ));

    return t;
}

// ═══════════════ ПЕРИМЕТР И ПЛОЩАДЬ ═══════════════
function generateGeomLesson() {
    const t = [], rect = () => [rnd(2, 8), rnd(3, 10)], sq = () => rnd(2, 8);

    // 1. Разминка
    const [w1, h1] = rect();
    t.push(choiceT('🔥', 'Разминка', 'badge-warmup',
        `Прямоугольник ${w1}×${h1}. Периметр P = ?`, 2 * (w1 + h1),
        `P = 2 × (${w1} + ${h1}) = ${2 * (w1 + h1)}`
    ));

    // 2. Визуальное (квадрат)
    const s2 = sq();
    t.push(choiceT('🖼️', 'Визуальное', 'badge-visual',
        `Квадрат со стороной ${s2}. Площадь S = ?`, s2 * s2,
        `S = ${s2} × ${s2} = ${s2 * s2}`,
        rectSVG(s2, s2, 'S = ?')
    ));

    // 3. Выбор
    const [w3, h3] = rect();
    t.push(choiceT('🎯', 'Выбор', 'badge-choice',
        `Прямоугольник ${w3}×${h3}. Площадь S = ?`, w3 * h3,
        `S = ${w3} × ${h3} = ${w3 * h3}`
    ));

    // 4. Парное
    const pd = [
        { left: 'P = ? (3×4)', right: '14', answer: 14 },
        { left: 'S = ? (5×5)', right: '25', answer: 25 },
        { left: 'P = ? (6×6)', right: '24', answer: 24 },
    ];
    t.push(pairT('🔗', 'Парное', 'badge-pair', 'Соедини задачу с ответом:', pd, 'Нажимай левый → правый'));

    // 5. Ввод
    const [w5, h5] = rect();
    t.push(inputT('✏️', 'Ввод', 'badge-input', `Прямоугольник ${w5}×${h5}. P = ?`, 2 * (w5 + h5), `P = 2 × (${w5} + ${h5}) = ${2 * (w5 + h5)}`));

    // 6. Ловушка (путаница P и S)
    const s6 = sq();
    t.push(choiceT('⚠️', 'Ловушка', 'badge-trap',
        `Квадрат со стороной ${s6}. ПЕРИМЕТР (не площадь!) = ?`,
        4 * s6, `P = 4 × ${s6} = ${4 * s6}. А S = ${s6 * s6}. Не перепутай!`
    ));

    // 7. Ввод сложнее
    const s7 = sq();
    t.push(inputT('✏️', 'Ввод', 'badge-input', `Квадрат ${s7}. S = ?`, s7 * s7, `S = ${s7} × ${s7} = ${s7 * s7}`));

    // 8. Босс (комбинированная задача)
    const [rw, rh] = [rnd(4, 10), rnd(3, 8)];
    const perim = 2 * (rw + rh), area = rw * rh;
    t.push(inputT('⭐', 'Босс', 'badge-boss',
        `Комната ${rw}×${rh} м. Найди периметр И площадь через запятую (например: 30,50)`,
        `${perim},${area}`,
        `P = 2×(${rw}+${rh}) = ${perim}, S = ${rw}×${rh} = ${area}`
    ));

    return t;
}

// ═══════════════ ДРОБИ ═══════════════
function generateFracLesson() {
    const t = [];

    // 1. Разминка
    t.push(choiceT('🔥', 'Разминка', 'badge-warmup',
        'Какая дробь больше: 1/4 или 3/4?',
        '3/4', 'Из двух дробей с одинаковым знаменателем больше та, у которой числитель больше'
    ));

    // 2. Визуальное (пицца)
    t.push(choiceT('🖼️', 'Визуальное', 'badge-visual',
        'Пиццу разрезали на 8 частей, съели 3. Какая часть осталась?',
        '5/8', '8 - 3 = 5 → осталось 5/8',
        pizzaSliceSVG(8, 3)
    ));

    // 3. Выбор (доля от числа)
    t.push(choiceT('🎯', 'Выбор', 'badge-choice', '1/2 от 10 = ?', 5, '10 ÷ 2 = 5'));

    // 4. Парное
    const pd = [
        { left: '1/2 от 20', right: '10', answer: 10 },
        { left: '1/3 от 12', right: '4', answer: 4 },
        { left: '1/4 от 16', right: '4', answer: 4 },
    ];
    t.push(pairT('🔗', 'Парное', 'badge-pair', 'Соедини долю с ответом:', pd, 'Нажимай левый → правый'));

    // 5. Ввод
    t.push(inputT('✏️', 'Ввод', 'badge-input', 'Сократи дробь: 2/4 (введи как 1/2)', '1/2', 'Делим числитель и знаменатель на 2'));

    // 6. Ловушка (сложение дробей)
    t.push(choiceT('⚠️', 'Ловушка', 'badge-trap',
        '1/2 + 1/2 = ?',
        '1', '2/2 = 1 целая! Не 2/4 — это ошибка новичков!'
    ));

    // 7. Ввод сложнее
    t.push(inputT('✏️', 'Ввод', 'badge-input', '1/3 от 12 = ?', 4, '12 ÷ 3 = 4'));

    // 8. Босс (составная задача)
    const total = rnd(10, 20), eaten = rnd(1, total - 1);
    const remaining = total - eaten;
    t.push(inputT('⭐', 'Босс', 'badge-boss',
        `В коробке было ${total} конфет. Съели ${eaten}. Какая часть осталась? (введи как ${remaining}/${total})`,
        `${remaining}/${total}`,
        `${total} - ${eaten} = ${remaining} → ${remaining}/${total}`
    ));

    return t;
}