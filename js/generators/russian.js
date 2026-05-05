// js/generators/russian.js

import { rnd, shuffle, choiceT, inputT } from '../utils.js';

// ══════════ Визуализации ══════════
function ruleSVG(title, main, example) {
    return `<div style="background:rgba(124,58,237,0.12);border:2px solid rgba(124,58,237,0.25);border-radius:12px;padding:10px 12px;margin:10px 0;text-align:center;">
        <div style="font-weight:800;color:#A78BFA;margin-bottom:4px;">${title}</div>
        <div style="font-size:13px;color:white;line-height:1.5;">${main}</div>
        <div style="font-size:12px;color:#C4B5FD;margin-top:4px;">${example}</div>
    </div>`;
}

function pairSVG(word, check) {
    return `<div style="display:flex;align-items:center;gap:8px;justify-content:center;margin:8px 0;font-size:15px;">
        <span style="color:#FBBF24;font-weight:700;">${word}</span>
        <span style="color:#94A3B8;">→</span>
        <span style="color:#10B981;font-weight:700;">${check}</span>
    </div>`;
}

// ══════════ ЖИ/ШИ, ЧА/ЩА, ЧУ/ЩУ ══════════
export function generateZhishiLesson() {
    const all = [
        { q:'ж_раф', a:'и', wrong:'ы', rule:'ЖИ пиши с И' },
        { q:'ш_шка', a:'и', wrong:'ы', rule:'ШИ пиши с И' },
        { q:'ч_шка', a:'а', wrong:'я', rule:'ЧА пиши с А' },
        { q:'щ_вель', a:'а', wrong:'я', rule:'ЩА пиши с А' },
        { q:'ч_до', a:'у', wrong:'ю', rule:'ЧУ пиши с У' },
        { q:'щ_ка', a:'у', wrong:'ю', rule:'ЩУ пиши с У' },
    ];
    const t = [];
    
    // 1. Разминка
    const d1 = all[rnd(0, all.length - 1)];
    const opts1 = shuffle([d1.a, d1.wrong, (d1.a === 'и' ? 'ы' : 'и'), (d1.a === 'у' ? 'ю' : 'у')]);
    t.push({ type:'choice', emoji:'🔥', badge:'Разминка', badgeClass:'badge-warmup', question:`Вставь букву: «${d1.q}»`, options:opts1.slice(0, 4), correctIdx:opts1.indexOf(d1.a), correctAns:d1.a, explanation:d1.rule });
    
    // 2. Визуальное
    const d2 = all[rnd(0, all.length - 1)];
    const opts2 = shuffle([d2.a, d2.wrong, (d2.a === 'и' ? 'ы' : 'и'), (d2.a === 'у' ? 'ю' : 'у')]);
    t.push({ type:'choice', emoji:'🖼️', badge:'Визуальное', badgeClass:'badge-visual', question:`Правило: «${d2.rule}». Выбери букву:`, options:opts2.slice(0, 4), correctIdx:opts2.indexOf(d2.a), correctAns:d2.a, explanation:d2.rule, visual:ruleSVG('Правило', d2.rule, `Пример: ${d2.q.replace('_', d2.a)}`) });
    
    // 3. Выбор
    const d3 = all[rnd(0, all.length - 1)];
    const opts3 = shuffle([d3.a, d3.wrong, (d3.a === 'а' ? 'я' : 'а'), (d3.a === 'у' ? 'ю' : 'у')]);
    t.push({ type:'choice', emoji:'🎯', badge:'Выбор', badgeClass:'badge-choice', question:`«${d3.q}» — какая буква?`, options:opts3.slice(0, 4), correctIdx:opts3.indexOf(d3.a), correctAns:d3.a, explanation:d3.rule });
    
    // 4. Парное
    const pd = shuffle([
        { left:'ж_знь', right:'и', answer:'и' },
        { left:'ч_до', right:'у', answer:'у' },
        { left:'рощ_', right:'а', answer:'а' },
        { left:'ш_ло', right:'и', answer:'и' },
    ]).slice(0, 3);
    t.push({ type:'pair', emoji:'🔗', badge:'Парное', badgeClass:'badge-pair', question:'Соедини слово и букву:', pairs:pd, explanation:'ЖИ, ЧУ, ЩА, ШИ' });
    
    // 5. Ввод
    const d5 = all[rnd(0, all.length - 1)];
    t.push({ type:'input', emoji:'✏️', badge:'Ввод', badgeClass:'badge-input', question:`Впиши букву: «${d5.q}»`, correctAns:d5.a, explanation:d5.rule });
    
    // 6. Ловушка
    t.push({ type:'choice', emoji:'⚠️', badge:'Ловушка', badgeClass:'badge-trap', question:'В слове «шиповник» после Ш пишем:', options:shuffle(['и','ы','е','а']), correctIdx:shuffle(['и','ы','е','а']).indexOf('и'), correctAns:'и', explanation:'ШИ с И! Даже в слове «шиповник»!' });
    
    // 7. Ввод сложнее
    const d7 = all[rnd(0, all.length - 1)];
    t.push({ type:'input', emoji:'✏️', badge:'Ввод сложнее', badgeClass:'badge-input', question:`Впиши букву: «${d7.q}»`, correctAns:d7.a, explanation:d7.rule });
    
    // 8. Босс
    t.push({ type:'boss_zhishi', emoji:'⭐', badge:'Босс', badgeClass:'badge-boss', question:'Вставь все буквы:', words:[{text:'ж_знь',answer:'и'},{text:'ч_до',answer:'у'},{text:'щ_ка',answer:'у'},{text:'маш_на',answer:'и'}], explanation:'ЖИ, ЧУ, ЩУ, ШИ' });
    
    return t;
}

// ══════════ Ь и Ъ ══════════
export function generateSoftLesson() {
    const all = [
        { q:'в_юга', a:'ь', wrong:'ъ', rule:'Ь в корне' },
        { q:'под_езд', a:'ъ', wrong:'ь', rule:'Ъ после приставки' },
        { q:'сем_я', a:'ь', wrong:'ъ', rule:'Ь в корне' },
        { q:'об_ём', a:'ъ', wrong:'ь', rule:'Ъ после приставки' },
        { q:'руч_и', a:'ь', wrong:'ъ', rule:'Ь в корне' },
        { q:'с_ехал', a:'ъ', wrong:'ь', rule:'Ъ после приставки' },
    ];
    const t = [];
    
    const d1 = all[rnd(0, all.length - 1)];
    t.push({ type:'choice', emoji:'🔥', badge:'Разминка', badgeClass:'badge-warmup', question:`Вставь: «${d1.q}»`, options:shuffle(['ь','ъ','ы','й']), correctIdx:shuffle(['ь','ъ','ы','й']).indexOf(d1.a), correctAns:d1.a, explanation:d1.rule });
    
    const d2 = all[rnd(0, all.length - 1)];
    t.push({ type:'choice', emoji:'🖼️', badge:'Визуальное', badgeClass:'badge-visual', question:`Правило: когда Ь, а когда Ъ?`, options:shuffle(['ь','ъ','ы','й']), correctIdx:shuffle(['ь','ъ','ы','й']).indexOf(d2.a), correctAns:d2.a, explanation:d2.rule, visual:ruleSVG('Разделительные Ь и Ъ', 'Ь — внутри корня', 'Ъ — после приставки') });
    
    const d3 = all[rnd(0, all.length - 1)];
    t.push({ type:'choice', emoji:'🎯', badge:'Выбор', badgeClass:'badge-choice', question:`«${d3.q}» — ь или ъ?`, options:shuffle(['ь','ъ','ы','й']), correctIdx:shuffle(['ь','ъ','ы','й']).indexOf(d3.a), correctAns:d3.a, explanation:d3.rule });
    
    const pd = shuffle([{ left:'в_юга', right:'ь', answer:'ь' },{ left:'под_езд', right:'ъ', answer:'ъ' },{ left:'сем_я', right:'ь', answer:'ь' }]).slice(0, 3);
    t.push({ type:'pair', emoji:'🔗', badge:'Парное', badgeClass:'badge-pair', question:'Соедини слово и знак:', pairs:pd, explanation:'Ь, Ъ, Ь' });
    
    const d5 = all[rnd(0, all.length - 1)];
    t.push({ type:'input', emoji:'✏️', badge:'Ввод', badgeClass:'badge-input', question:`Впиши (ь/ъ): «${d5.q}»`, correctAns:d5.a, explanation:d5.rule });
    
    t.push({ type:'choice', emoji:'⚠️', badge:'Ловушка', badgeClass:'badge-trap', question:'«под_езд» — нужен Ь или Ъ?', options:shuffle(['ъ','ь','ы','й']), correctIdx:shuffle(['ъ','ь','ы','й']).indexOf('ъ'), correctAns:'ъ', explanation:'После приставки ПОД- → Ъ! Не спутай с Ь!' });
    
    const d7 = all[rnd(0, all.length - 1)];
    t.push({ type:'input', emoji:'✏️', badge:'Ввод сложнее', badgeClass:'badge-input', question:`Впиши (ь/ъ): «${d7.q}»`, correctAns:d7.a, explanation:d7.rule });
    
    t.push({ type:'boss_soft', emoji:'⭐', badge:'Босс', badgeClass:'badge-boss', question:'Вставь все знаки:', words:[{text:'в_юга',answer:'ь'},{text:'под_езд',answer:'ъ'},{text:'об_явление',answer:'ъ'}], explanation:'Ь, Ъ, Ъ' });
    
    return t;
}

// ══════════ Безударные гласные ══════════
export function generateVowelLesson() {
    const all = [
        { q:'л_сной', a:'е', check:'лес', wrong:'и' },
        { q:'в_да', a:'о', check:'воды', wrong:'а' },
        { q:'тр_ва', a:'а', check:'травка', wrong:'о' },
        { q:'ст_на', a:'е', check:'стены', wrong:'и' },
        { q:'з_мля', a:'е', check:'земли', wrong:'и' },
        { q:'м_ря', a:'о', check:'море', wrong:'а' },
    ];
    const t = [];
    
    const d1 = all[rnd(0, all.length - 1)];
    const o1 = shuffle([d1.a, d1.wrong, (d1.a==='е'?'и':'е'), (d1.a==='о'?'а':'о')]);
    t.push({ type:'choice', emoji:'🔥', badge:'Разминка', badgeClass:'badge-warmup', question:`Вставь: «${d1.q}»`, options:o1, correctIdx:o1.indexOf(d1.a), correctAns:d1.a, explanation:`Проверка: ${d1.check}` });
    
    const d2 = all[rnd(0, all.length - 1)];
    const o2 = shuffle([d2.a, d2.wrong, (d2.a==='е'?'и':'е'), (d2.a==='о'?'а':'о')]);
    t.push({ type:'choice', emoji:'🖼️', badge:'Визуальное', badgeClass:'badge-visual', question:`Проверочное слово: «${d2.check}». Какая буква?`, options:o2, correctIdx:o2.indexOf(d2.a), correctAns:d2.a, explanation:`${d2.check} → ${d2.q.replace('_', d2.a)}`, visual:pairSVG(d2.q.replace('_', '?'), d2.check) });
    
    const d3 = all[rnd(0, all.length - 1)];
    const o3 = shuffle([d3.a, d3.wrong, (d3.a==='е'?'и':'е'), (d3.a==='о'?'а':'о')]);
    t.push({ type:'choice', emoji:'🎯', badge:'Выбор', badgeClass:'badge-choice', question:`«${d3.q}» — какая буква?`, options:o3, correctIdx:o3.indexOf(d3.a), correctAns:d3.a, explanation:`Проверка: ${d3.check}` });
    
    const pd = shuffle([{ left:'л_сной', right:'е', answer:'е' },{ left:'в_да', right:'о', answer:'о' },{ left:'тр_ва', right:'а', answer:'а' }]).slice(0, 3);
    t.push({ type:'pair', emoji:'🔗', badge:'Парное', badgeClass:'badge-pair', question:'Соедини слово и букву:', pairs:pd, explanation:'е, о, а' });
    
    const d5 = all[rnd(0, all.length - 1)];
    t.push({ type:'input', emoji:'✏️', badge:'Ввод', badgeClass:'badge-input', question:`Впиши букву: «${d5.q}»`, correctAns:d5.a, explanation:`Проверка: ${d5.check}` });
    
    t.push({ type:'choice', emoji:'⚠️', badge:'Ловушка', badgeClass:'badge-trap', question:'«лиса» проверяем словом: лЕс или лИс? Пишем л_са:', options:shuffle(['и','е','я','а']), correctIdx:shuffle(['и','е','я','а']).indexOf('и'), correctAns:'и', explanation:'лиса → лИс! А лЕс → лесной. Не путай!' });
    
    const d7 = all[rnd(0, all.length - 1)];
    t.push({ type:'input', emoji:'✏️', badge:'Ввод сложнее', badgeClass:'badge-input', question:`Впиши букву: «${d7.q}»`, correctAns:d7.a, explanation:`Проверка: ${d7.check}` });
    
    t.push({ type:'boss_vowel', emoji:'⭐', badge:'Босс', badgeClass:'badge-boss', question:'Вставь все буквы:', words:[{text:'л_сной',answer:'е'},{text:'в_да',answer:'о'},{text:'з_мля',answer:'е'}], explanation:'лЕс, вОды, зЕмли' });
    
    return t;
}

// ══════════ Непроизносимые согласные ══════════
export function generateSilentLesson() {
    const all = [
        { q:'чес_ный', a:'т', check:'честь', wrong:'д' },
        { q:'грус_ный', a:'т', check:'грусть', wrong:'д' },
        { q:'радос_ный', a:'т', check:'радость', wrong:'д' },
        { q:'звёз_ный', a:'д', check:'звезда', wrong:'т' },
        { q:'со_нце', a:'л', check:'солнышко', wrong:'в' },
        { q:'чу_ство', a:'в', check:'чуВствую', wrong:'л' },
    ];
    const t = [];
    
    const d1 = all[rnd(0, all.length - 1)];
    const o1 = shuffle([d1.a, d1.wrong, 'т', 'д']);
    t.push({ type:'choice', emoji:'🔥', badge:'Разминка', badgeClass:'badge-warmup', question:`Вставь: «${d1.q}»`, options:o1.slice(0,4), correctIdx:o1.indexOf(d1.a), correctAns:d1.a, explanation:`Проверка: ${d1.check}` });
    
    const d2 = all[rnd(0, all.length - 1)];
    t.push({ type:'choice', emoji:'🖼️', badge:'Визуальное', badgeClass:'badge-visual', question:`Проверка: «${d2.check}» → нужна буква?`, options:shuffle([d2.a, d2.wrong, 'т','д']), correctIdx:shuffle([d2.a, d2.wrong, 'т','д']).indexOf(d2.a), correctAns:d2.a, explanation:`${d2.check} → ${d2.q.replace('_', d2.a)}`, visual:pairSVG(d2.q.replace('_', '?'), d2.check) });
    
    const d3 = all[rnd(0, all.length - 1)];
    t.push({ type:'choice', emoji:'🎯', badge:'Выбор', badgeClass:'badge-choice', question:`«${d3.q}» — нужна буква?`, options:shuffle([d3.a, d3.wrong, 'т','д']), correctIdx:shuffle([d3.a, d3.wrong, 'т','д']).indexOf(d3.a), correctAns:d3.a, explanation:`Проверка: ${d3.check}` });
    
    const pd = shuffle([{ left:'чес_ный', right:'т', answer:'т' },{ left:'со_нце', right:'л', answer:'л' },{ left:'чу_ство', right:'в', answer:'в' }]).slice(0, 3);
    t.push({ type:'pair', emoji:'🔗', badge:'Парное', badgeClass:'badge-pair', question:'Соедини слово и букву:', pairs:pd, explanation:'т, л, в' });
    
    const d5 = all[rnd(0, all.length - 1)];
    t.push({ type:'input', emoji:'✏️', badge:'Ввод', badgeClass:'badge-input', question:`Впиши букву: «${d5.q}»`, correctAns:d5.a, explanation:`Проверка: ${d5.check}` });
    
    t.push({ type:'choice', emoji:'⚠️', badge:'Ловушка', badgeClass:'badge-trap', question:'«чу_ство» — в или л?', options:shuffle(['в','л','т','д']), correctIdx:shuffle(['в','л','т','д']).indexOf('в'), correctAns:'в', explanation:'чуВствую → чуВство! Не пропусти!' });
    
    const d7 = all[rnd(0, all.length - 1)];
    t.push({ type:'input', emoji:'✏️', badge:'Ввод сложнее', badgeClass:'badge-input', question:`Впиши букву: «${d7.q}»`, correctAns:d7.a, explanation:`Проверка: ${d7.check}` });
    
    t.push({ type:'boss_silent', emoji:'⭐', badge:'Босс', badgeClass:'badge-boss', question:'Вставь все буквы:', words:[{text:'чес_ный',answer:'т'},{text:'со_нце',answer:'л'},{text:'праз_ник',answer:'д'}], explanation:'чесТь, соЛнышко, празДник' });
    
    return t;
}

// ══════════ -ТСЯ / -ТЬСЯ ══════════
export function generateTsyaLesson() {
    const all = [
        { q:'Он учит_ся', a:'тся', hint:'Что делает?' },
        { q:'Надо учит_ся', a:'ться', hint:'Что делать?' },
        { q:'Мне нравит_ся', a:'тся', hint:'Что делает?' },
        { q:'Это может случит_ся', a:'ться', hint:'Что сделать?' },
        { q:'Солнце садит_ся', a:'тся', hint:'Что делает?' },
        { q:'Пора просыпат_ся', a:'ться', hint:'Что делать?' },
    ];
    const t = [];
    
    const d1 = all[rnd(0, all.length - 1)];
    const o1 = shuffle(['тся','ться','тся','ться']);
    t.push({ type:'choice', emoji:'🔥', badge:'Разминка', badgeClass:'badge-warmup', question:`Вставь: «${d1.q}»`, options:o1, correctIdx:o1.indexOf(d1.a), correctAns:d1.a, explanation:`Вопрос: ${d1.hint}` });
    
    t.push({ type:'choice', emoji:'🖼️', badge:'Визуальное', badgeClass:'badge-visual', question:'По схеме: Что делает? → ТСЯ. Что делать? → ТЬСЯ', options:shuffle(['тся','ться','тся','ться']), correctIdx:shuffle(['тся','ться','тся','ться']).indexOf('тся'), correctAns:'тся', explanation:'Что делает? → ТСЯ', visual:ruleSVG('Схема', 'Что делает? → ТСЯ', 'Что делать? → ТЬСЯ') });
    
    const d3 = all[rnd(0, all.length - 1)];
    const o3 = shuffle(['тся','ться','тся','ться']);
    t.push({ type:'choice', emoji:'🎯', badge:'Выбор', badgeClass:'badge-choice', question:`«${d3.q}» — тся или ться?`, options:o3, correctIdx:o3.indexOf(d3.a), correctAns:d3.a, explanation:`Вопрос: ${d3.hint}` });
    
    const pd = shuffle([{ left:'Он смеёт_ся (что делает?)', right:'тся', answer:'тся' },{ left:'Пора встават_ (что делать?)', right:'ться', answer:'ться' },{ left:'Мне нравит_ся (что делает?)', right:'тся', answer:'тся' }]).slice(0, 3);
    t.push({ type:'pair', emoji:'🔗', badge:'Парное', badgeClass:'badge-pair', question:'Соедини глагол с окончанием:', pairs:pd, explanation:'тся, ться, тся' });
    
    const d5 = all[rnd(0, all.length - 1)];
    t.push({ type:'input', emoji:'✏️', badge:'Ввод', badgeClass:'badge-input', question:`Напиши окончание: «${d5.q}»`, correctAns:d5.a, explanation:`Вопрос: ${d5.hint}` });
    
    t.push({ type:'choice', emoji:'⚠️', badge:'Ловушка', badgeClass:'badge-trap', question:'«Ему нравит_ся» — тся или ться?', options:shuffle(['тся','ться','тся','ться']), correctIdx:shuffle(['тся','ться','тся','ться']).indexOf('тся'), correctAns:'тся', explanation:'Что делает? → ТСЯ! Не ведись на ться!' });
    
    const d7 = all[rnd(0, all.length - 1)];
    t.push({ type:'input', emoji:'✏️', badge:'Ввод сложнее', badgeClass:'badge-input', question:`Напиши окончание: «${d7.q}»`, correctAns:d7.a, explanation:`Вопрос: ${d7.hint}` });
    
    t.push({ type:'boss_tsya', emoji:'⭐', badge:'Босс', badgeClass:'badge-boss', question:'Вставь окончания:', words:[{text:'не ошиба_',answer:'ться'},{text:'труди_',answer:'ться'}], explanation:'Что делать? → ТЬСЯ' });
    
    return t;
}

// ══════════ ПРЕ/ПРИ ══════════
export function generatePrepriLesson() {
    const all = [
        { q:'пр_бывать', a:'и', hint:'приближаться' },
        { q:'пр_мудрый', a:'е', hint:'очень' },
        { q:'пр_шить', a:'и', hint:'присоединить' },
        { q:'пр_красный', a:'е', hint:'очень' },
        { q:'пр_вокзальный', a:'и', hint:'рядом' },
        { q:'пр_градить', a:'е', hint:'пере-' },
    ];
    const t = [];
    
    const d1 = all[rnd(0, all.length - 1)];
    t.push({ type:'choice', emoji:'🔥', badge:'Разминка', badgeClass:'badge-warmup', question:`Вставь: «${d1.q}»`, options:shuffle(['е','и','е','и']), correctIdx:shuffle(['е','и','е','и']).indexOf(d1.a), correctAns:d1.a, explanation:d1.hint });
    
    t.push({ type:'choice', emoji:'🖼️', badge:'Визуальное', badgeClass:'badge-visual', question:'ПРИ = рядом. ПРЕ = очень/пере-. Выбери:', options:shuffle(['е','и','е','и']), correctIdx:shuffle(['е','и','е','и']).indexOf('е'), correctAns:'е', explanation:'ПРЕ = очень', visual:ruleSVG('Значения', 'ПРИ = рядом, присоединение', 'ПРЕ = очень, пере-') });
    
    const d3 = all[rnd(0, all.length - 1)];
    t.push({ type:'choice', emoji:'🎯', badge:'Выбор', badgeClass:'badge-choice', question:`«${d3.q}» — е или и?`, options:shuffle(['е','и','е','и']), correctIdx:shuffle(['е','и','е','и']).indexOf(d3.a), correctAns:d3.a, explanation:d3.hint });
    
    const pd = shuffle([{ left:'пр_шить (присоединить)', right:'и', answer:'и' },{ left:'пр_мудрый (очень)', right:'е', answer:'е' },{ left:'пр_вокзальный (рядом)', right:'и', answer:'и' }]).slice(0, 3);
    t.push({ type:'pair', emoji:'🔗', badge:'Парное', badgeClass:'badge-pair', question:'Соедини слово и букву:', pairs:pd, explanation:'и, е, и' });
    
    const d5 = all[rnd(0, all.length - 1)];
    t.push({ type:'input', emoji:'✏️', badge:'Ввод', badgeClass:'badge-input', question:`Впиши (и/е): «${d5.q}»`, correctAns:d5.a, explanation:d5.hint });
    
    t.push({ type:'choice', emoji:'⚠️', badge:'Ловушка', badgeClass:'badge-trap', question:'«пр_дать друга» — е или и?', options:shuffle(['е','и','е','и']), correctIdx:shuffle(['е','и','е','и']).indexOf('е'), correctAns:'е', explanation:'ПРЕдать = пере-дать! ПРИдать — другое значение!' });
    
    const d7 = all[rnd(0, all.length - 1)];
    t.push({ type:'input', emoji:'✏️', badge:'Ввод сложнее', badgeClass:'badge-input', question:`Впиши (и/е): «${d7.q}»`, correctAns:d7.a, explanation:d7.hint });
    
    t.push({ type:'boss_prepri', emoji:'⭐', badge:'Босс', badgeClass:'badge-boss', question:'Вставь все буквы:', words:[{text:'Пр_мудрый',answer:'е'},{text:'пр_был',answer:'и'},{text:'пр_вокзальный',answer:'и'}], explanation:'ПРЕ, ПРИ, ПРИ' });
    
    return t;
}

// ══════════ Н и НН ══════════
export function generateNNLesson() {
    const all = [
        { q:'кури_ый', a:'н', hint:'-ИН- → Н', wrong:'нн' },
        { q:'соломе_ый', a:'нн', hint:'-ЕНН- → НН', wrong:'н' },
        { q:'стекля_ый', a:'нн', hint:'исключение!', wrong:'н' },
        { q:'ветре_ый', a:'н', hint:'исключение!', wrong:'нн' },
        { q:'пусты_ый', a:'нн', hint:'стык корня', wrong:'н' },
        { q:'кожа_ый', a:'н', hint:'-АН- → Н', wrong:'нн' },
    ];
    const t = [];
    
    const d1 = all[rnd(0, all.length - 1)];
    const o1 = shuffle(['Н','НН','Н','НН']);
    t.push({ type:'choice', emoji:'🔥', badge:'Разминка', badgeClass:'badge-warmup', question:`«${d1.q}» — Н или НН?`, options:o1, correctIdx:o1.indexOf(d1.a==='н'?'Н':'НН'), correctAns:d1.a, explanation:d1.hint });
    
    t.push({ type:'choice', emoji:'🖼️', badge:'Визуальное', badgeClass:'badge-visual', question:'По таблице суффиксов: -АН-, -ЯН-, -ИН- → Н. -ЕНН-, -ОНН- → НН', options:shuffle(['Н','НН','Н','НН']), correctIdx:shuffle(['Н','НН','Н','НН']).indexOf('Н'), correctAns:'н', explanation:'-ИН- → одна Н', visual:ruleSVG('Суффиксы', '-АН-, -ЯН-, -ИН- → одна Н', '-ЕНН-, -ОНН- → НН (кроме ветреный)') });
    
    const d3 = all[rnd(0, all.length - 1)];
    const o3 = shuffle(['Н','НН','Н','НН']);
    t.push({ type:'choice', emoji:'🎯', badge:'Выбор', badgeClass:'badge-choice', question:`«${d3.q}» — Н или НН?`, options:o3, correctIdx:o3.indexOf(d3.a==='н'?'Н':'НН'), correctAns:d3.a, explanation:d3.hint });
    
    const pd = shuffle([{ left:'кури_ый (-ИН-)', right:'Н', answer:'н' },{ left:'соломе_ый (-ЕНН-)', right:'НН', answer:'нн' },{ left:'стекля_ый (искл.)', right:'НН', answer:'нн' }]).slice(0, 3);
    t.push({ type:'pair', emoji:'🔗', badge:'Парное', badgeClass:'badge-pair', question:'Соедини слово и Н/НН:', pairs:pd, explanation:'Н, НН, НН' });
    
    const d5 = all[rnd(0, all.length - 1)];
    t.push({ type:'input', emoji:'✏️', badge:'Ввод', badgeClass:'badge-input', question:`Впиши (н/нн): «${d5.q}»`, correctAns:d5.a, explanation:d5.hint });
    
    t.push({ type:'choice', emoji:'⚠️', badge:'Ловушка', badgeClass:'badge-trap', question:'«ветре_ый» — Н или НН?', options:shuffle(['Н','НН','Н','НН']), correctIdx:shuffle(['Н','НН','Н','НН']).indexOf('Н'), correctAns:'н', explanation:'Ветреный — исключение с одной Н!' });
    
    const d7 = all[rnd(0, all.length - 1)];
    t.push({ type:'input', emoji:'✏️', badge:'Ввод сложнее', badgeClass:'badge-input', question:`Впиши (н/нн): «${d7.q}»`, correctAns:d7.a, explanation:d7.hint });
    
    t.push({ type:'boss_nn', emoji:'⭐', badge:'Босс', badgeClass:'badge-boss', question:'Вставь Н или НН:', words:[{text:'стекля_ый',answer:'нн'},{text:'кожа_ый',answer:'н'},{text:'деревя_ый',answer:'нн'}], explanation:'НН, Н, НН' });
    
    return t;
}

export function generateRusLesson(skillId) {
    const gens = { zhishi:generateZhishiLesson, soft:generateSoftLesson, vowel:generateVowelLesson, silent:generateSilentLesson, tsya:generateTsyaLesson, prepri:generatePrepriLesson, nn:generateNNLesson };
    return gens[skillId] ? gens[skillId]() : generateZhishiLesson();
}
