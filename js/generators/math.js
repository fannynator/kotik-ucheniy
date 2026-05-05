// js/generators/math.js

import { rnd, shuffle, makeWrongs, choiceT, inputT, pairT } from '../utils.js';

export function generateAddLesson() {
    const t = [];
    const add = (a, b) => a + b;
    
    const [a1, b1] = [rnd(2, 20), rnd(2, 20)];
    t.push(choiceT('🔥', 'Разминка', 'badge-warmup', `${a1} + ${b1} = ?`, add(a1, b1), 'Складываем числа'));
    
    const [a2, b2] = [rnd(2, 20), rnd(2, 20)];
    t.push(choiceT('🖼️', 'Визуальное', 'badge-visual', `Яблоки: ${a2} + ${b2}`, add(a2, b2), 'Считаем яблоки'));
    
    const [a3, b3] = [rnd(2, 20), rnd(2, 20)];
    t.push(choiceT('🎯', 'Выбор', 'badge-choice', `${a3} + ${b3} = ?`, add(a3, b3), 'Выбираем ответ'));
    
    const pd = []; const ua = new Set();
    while (pd.length < 3) {
        const a = rnd(2, 20), b = rnd(2, 20);
        const ans = add(a, b);
        if (!ua.has(ans)) { ua.add(ans); pd.push({ left: `${a} + ${b}`, right: `${ans}`, answer: ans }); }
    }
    t.push(pairT('🔗', 'Парное', 'badge-pair', 'Соедини выражения:', pd, 'Соединяем пары'));
    
    const tn = rnd(5, 20);
    t.push(choiceT('⚠️', 'Ловушка', 'badge-trap', `${tn} + 0 = ?`, tn, 'Число + 0 = число!'));
    
    const [a6, b6] = [rnd(2, 20), rnd(2, 20)];
    t.push(inputT('✏️', 'Ввод', 'badge-input', `${a6} + ${b6} = ?`, add(a6, b6), 'Пишем ответ'));
    const [a7, b7] = [rnd(2, 20), rnd(2, 20)];
    t.push(inputT('✏️', 'Ввод', 'badge-input', `${a7} + ${b7} = ?`, add(a7, b7), 'Пишем ответ'));
    
    const [c1, c2] = [rnd(10, 50), rnd(10, 50)];
    t.push(inputT('⭐', 'Босс', 'badge-boss', `У Маши ${c1} руб., у Пети ${c2} руб. Вместе?`, add(c1, c2), `${c1} + ${c2} = ${add(c1, c2)}`));
    
    return t;
}

export function generateSubLesson() {
    const t = [];
    const sub = (a, b) => a - b;
    
    const [a1, b1] = [rnd(10, 40), rnd(1, 9)];
    t.push(choiceT('🔥', 'Разминка', 'badge-warmup', `${a1} - ${b1} = ?`, sub(a1, b1), 'Вычитаем числа'));
    
    const [a2, b2] = [rnd(10, 40), rnd(1, 9)];
    t.push(choiceT('🖼️', 'Визуальное', 'badge-visual', `Было ${a2} 🍎, съели ${b2}`, sub(a2, b2), 'Считаем остаток'));
    
    const [a3, b3] = [rnd(10, 40), rnd(1, 9)];
    t.push(choiceT('🎯', 'Выбор', 'badge-choice', `${a3} - ${b3} = ?`, sub(a3, b3), 'Выбираем ответ'));
    
    const pd = []; const ua = new Set();
    while (pd.length < 3) {
        const a = rnd(10, 40), b = rnd(1, 9);
        const ans = sub(a, b);
        if (!ua.has(ans)) { ua.add(ans); pd.push({ left: `${a} - ${b}`, right: `${ans}`, answer: ans }); }
    }
    t.push(pairT('🔗', 'Парное', 'badge-pair', 'Соедини выражения:', pd, 'Соединяем пары'));
    
    const sameNum = rnd(10, 30);
    t.push(choiceT('⚠️', 'Ловушка', 'badge-trap', `${sameNum} - ${sameNum} = ?`, 0, 'Одинаковые числа — 0!'));
    
    const [a6, b6] = [rnd(10, 40), rnd(1, 9)];
    t.push(inputT('✏️', 'Ввод', 'badge-input', `${a6} - ${b6} = ?`, sub(a6, b6), 'Пишем ответ'));
    const [a7, b7] = [rnd(10, 40), rnd(1, 9)];
    t.push(inputT('✏️', 'Ввод', 'badge-input', `${a7} - ${b7} = ?`, sub(a7, b7), 'Пишем ответ'));
    
    const [tot, sp] = [rnd(30, 80), rnd(5, 30)];
    t.push(inputT('⭐', 'Босс', 'badge-boss', `Было ${tot} руб., потратили ${sp} руб. Осталось?`, sub(tot, sp), `${tot} - ${sp} = ${sub(tot, sp)}`));
    
    return t;
}

export function generateMulLesson() {
    const t = [];
    const mul = (a, b) => a * b;
    
    const [a1, b1] = [rnd(2, 10), rnd(2, 10)];
    t.push(choiceT('🔥', 'Разминка', 'badge-warmup', `${a1} × ${b1} = ?`, mul(a1, b1), 'Умножаем числа'));
    
    const [a2, b2] = [rnd(2, 10), rnd(2, 10)];
    t.push(choiceT('🖼️', 'Визуальное', 'badge-visual', `${a2} группы по ${b2} 🍎`, mul(a2, b2), 'Считаем группы'));
    
    const [a3, b3] = [rnd(2, 10), rnd(2, 10)];
    t.push(choiceT('🎯', 'Выбор', 'badge-choice', `${a3} × ${b3} = ?`, mul(a3, b3), 'Выбираем ответ'));
    
    const pd = []; const ua = new Set();
    while (pd.length < 3) {
        const a = rnd(2, 10), b = rnd(2, 10);
        const ans = mul(a, b);
        if (!ua.has(ans)) { ua.add(ans); pd.push({ left: `${a} × ${b}`, right: `${ans}`, answer: ans }); }
    }
    t.push(pairT('🔗', 'Парное', 'badge-pair', 'Соедини выражения:', pd, 'Соединяем пары'));
    
    const tn = rnd(2, 9);
    t.push(choiceT('⚠️', 'Ловушка', 'badge-trap', `${tn} × 0 = ?`, 0, 'Любое × 0 = 0!'));
    
    const [a6, b6] = [rnd(2, 10), rnd(2, 10)];
    t.push(inputT('✏️', 'Ввод', 'badge-input', `${a6} × ${b6} = ?`, mul(a6, b6), 'Пишем ответ'));
    const [a7, b7] = [rnd(2, 10), rnd(2, 10)];
    t.push(inputT('✏️', 'Ввод', 'badge-input', `${a7} × ${b7} = ?`, mul(a7, b7), 'Пишем ответ'));
    
    const [sh, bs] = [rnd(2, 5), rnd(4, 10)];
    t.push(inputT('⭐', 'Босс', 'badge-boss', `${sh} полки × ${bs} книг. Всего?`, mul(sh, bs), `${sh} × ${bs} = ${mul(sh, bs)}`));
    
    return t;
}

export function generateDivLesson() {
    const t = [];
    
    const b1 = rnd(2, 9), c1 = rnd(2, 9);
    t.push(choiceT('🔥', 'Разминка', 'badge-warmup', `${b1 * c1} ÷ ${b1} = ?`, c1, 'Делим числа'));
    
    const b2 = rnd(2, 9), c2 = rnd(2, 9);
    t.push(choiceT('🖼️', 'Визуальное', 'badge-visual', `${b2 * c2} 🍎 на ${b2} корзины`, c2, 'Раскладываем поровну'));
    
    const b3 = rnd(2, 9), c3 = rnd(2, 9);
    t.push(choiceT('🎯', 'Выбор', 'badge-choice', `${b3 * c3} ÷ ${b3} = ?`, c3, 'Выбираем ответ'));
    
    const pd = []; const ua = new Set();
    while (pd.length < 3) {
        const b = rnd(2, 8), c = rnd(2, 8), a = b * c;
        if (!ua.has(c)) { ua.add(c); pd.push({ left: `${a} ÷ ${b}`, right: `${c}`, answer: c }); }
    }
    t.push(pairT('🔗', 'Парное', 'badge-pair', 'Соедини выражения:', pd, 'Соединяем пары'));
    
    t.push(choiceT('⚠️', 'Ловушка', 'badge-trap', `0 ÷ ${rnd(2, 9)} = ?`, 0, '0 ÷ число = 0!'));
    
    const b6 = rnd(2, 9), c6 = rnd(2, 9);
    t.push(inputT('✏️', 'Ввод', 'badge-input', `${b6 * c6} ÷ ${b6} = ?`, c6, 'Пишем ответ'));
    const b7 = rnd(2, 9), c7 = rnd(2, 9);
    t.push(inputT('✏️', 'Ввод', 'badge-input', `${b7 * c7} ÷ ${b7} = ?`, c7, 'Пишем ответ'));
    
    const [tot, fr] = [rnd(20, 60), rnd(2, 6)];
    const ans = Math.floor(tot / fr), rem = tot - ans * fr;
    t.push(inputT('⭐', 'Босс', 'badge-boss', `${tot} конфет на ${fr} друзей. По сколько? (ост.${rem})`, ans, `${tot} ÷ ${fr} = ${ans}`));
    
    return t;
}

export function generateEqLesson() {
    const t = [];
    
    const x1 = rnd(2, 15), a1 = rnd(1, 10);
    t.push(choiceT('🔥', 'Разминка', 'badge-warmup', `x + ${a1} = ${x1 + a1}. x = ?`, x1, `x = ${x1 + a1} - ${a1}`));
    t.push(choiceT('🎯', 'Выбор', 'badge-choice', 'x - 5 = 3. x = ?', 8, 'x = 3 + 5 = 8'));
    t.push(choiceT('🎯', 'Выбор', 'badge-choice', '3 × x = 15. x = ?', 5, 'x = 15 ÷ 3 = 5'));
    
    const pd = []; const ua = new Set();
    while (pd.length < 3) {
        const x = rnd(2, 12), a = rnd(1, 8);
        if (!ua.has(x)) { ua.add(x); pd.push({ left: `x + ${a} = ${x + a}`, right: `x = ${x}`, answer: x }); }
    }
    t.push(pairT('🔗', 'Парное', 'badge-pair', 'Соедини уравнение с ответом:', pd, 'Соединяем пары'));
    
    t.push(choiceT('⚠️', 'Ловушка', 'badge-trap', 'x + 0 = 7. x = ?', 7, 'x + 0 = x!'));
    t.push(inputT('✏️', 'Ввод', 'badge-input', 'x + 3 = 10. x = ?', 7, 'x = 10 - 3 = 7'));
    t.push(inputT('✏️', 'Ввод', 'badge-input', '4 × x = 20. x = ?', 5, 'x = 20 ÷ 4 = 5'));
    t.push(inputT('⭐', 'Босс', 'badge-boss', 'В 3 коробках 18 яблок. В одной?', 6, '18 ÷ 3 = 6'));
    
    return t;
}

export function generateGeomLesson() {
    const t = [];
    
    const r1w = rnd(2, 8), r1h = rnd(3, 10);
    t.push(choiceT('🔥', 'Разминка', 'badge-warmup', `Прямоугольник ${r1w}×${r1h}. P?`, 2*(r1w+r1h), `P=2(${r1w}+${r1h})`));
    
    const s1 = rnd(2, 8);
    t.push(choiceT('🖼️', 'Визуальное', 'badge-visual', `Квадрат со стороной ${s1}. S?`, s1*s1, `S=${s1}²`));
    
    const r2w = rnd(2, 8), r2h = rnd(3, 10);
    t.push(inputT('✏️', 'Ввод', 'badge-input', `Прямоугольник ${r2w}×${r2h}. P?`, 2*(r2w+r2h), `P=2(${r2w}+${r2h})`));
    
    const s2 = rnd(2, 8);
    t.push(inputT('✏️', 'Ввод', 'badge-input', `Квадрат ${s2}. S?`, s2*s2, `S=${s2}²`));
    
    const r3w = rnd(2, 8), r3h = rnd(3, 10);
    t.push(choiceT('🎯', 'Выбор', 'badge-choice', `Прямоугольник ${r3w}×${r3h}. S?`, r3w*r3h, `S=${r3w}×${r3h}`));
    
    const s3 = rnd(2, 8);
    t.push(choiceT('⚠️', 'Ловушка', 'badge-trap', `Квадрат ${s3}. P? (не S!)`, 4*s3, `P=4×${s3}, не ${s3}²!`));
    
    const r4w = rnd(2, 8), r4h = rnd(3, 10);
    t.push(inputT('✏️', 'Ввод', 'badge-input', `Прямоугольник ${r4w}×${r4h}. S?`, r4w*r4h, `S=${r4w}×${r4h}`));
    
    const rw = rnd(4, 10), rh = rnd(3, 8);
    t.push(inputT('⭐', 'Босс', 'badge-boss', `Комната ${rw}×${rh} м. P и S (через запятую)`, `${2*(rw+rh)},${rw*rh}`, `P=${2*(rw+rh)}, S=${rw*rh}`));
    
    return t;
}

export function generateFracLesson() {
    const t = [];
    t.push(choiceT('🔥', 'Разминка', 'badge-warmup', 'Какая дробь больше: 1/3 или 2/3?', '2/3', 'Больше числитель → больше дробь'));
    t.push(choiceT('🎯', 'Выбор', 'badge-choice', '1/2 от 10?', 5, '10÷2=5'));
    t.push(choiceT('🎯', 'Выбор', 'badge-choice', 'Сократи: 2/4', '1/2', 'Делим на 2'));
    t.push(inputT('✏️', 'Ввод', 'badge-input', 'Сократи: 3/9 (как 1/3)', '1/3', 'Делим на 3'));
    t.push(choiceT('🖼️', 'Визуальное', 'badge-visual', 'Пицца на 8 частей, съели 3. Осталось?', '5/8', '8-3=5 → 5/8'));
    t.push(choiceT('⚠️', 'Ловушка', 'badge-trap', '1/2 + 1/2 = ?', '1', '2/2 = 1! Не 2/4!'));
    t.push(inputT('✏️', 'Ввод', 'badge-input', '1/3 от 12?', 4, '12÷3=4'));
    t.push(inputT('⭐', 'Босс', 'badge-boss', 'Торт на 6 частей, 2 съели. Осталось? (как 4/6)', '4/6', '6-2=4 → 4/6'));
    return t;
}

export function generateMathLesson(skillId) {
    const gens = { add:generateAddLesson, sub:generateSubLesson, mul:generateMulLesson, div:generateDivLesson, eq:generateEqLesson, geom:generateGeomLesson, frac:generateFracLesson };
    const gen = gens[skillId];
    return gen ? gen() : generateAddLesson();
}