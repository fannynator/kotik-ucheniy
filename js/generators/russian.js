// js/generators/russian.js

import { rnd, shuffle, choiceT, inputT } from '../utils.js';

// ══════════ Визуализации для русского ══════════
function ruleSVG(title, rule, example) {
    return `<div style="background:rgba(124,58,237,0.12);border:2px solid rgba(124,58,237,0.25);border-radius:12px;padding:10px 12px;margin:10px 0;text-align:center;">
        <div style="font-weight:800;color:#7C3AED;margin-bottom:4px;">${title}</div>
        <div style="font-size:13px;color:white;">${rule}</div>
        <div style="font-size:12px;color:#A78BFA;margin-top:4px;">${example}</div>
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
    const dict = [
        { q:'ж_раф', a:'и', hint:'ЖИ с И', wrong:'ы' }, { q:'ш_шка', a:'и', hint:'ШИ с И', wrong:'ы' },
        { q:'ч_шка', a:'а', hint:'ЧА с А', wrong:'я' }, { q:'щ_вель', a:'а', hint:'ЩА с А', wrong:'я' },
        { q:'ч_до', a:'у', hint:'ЧУ с У', wrong:'ю' }, { q:'щ_ка', a:'у', hint:'ЩУ с У', wrong:'ю' }
    ];
    const sel = shuffle([...dict, ...dict]).slice(0, 8);
    const tasks = [];
    
    sel.forEach((d, i) => {
        const opts = shuffle([d.a, d.wrong]), ci = opts.indexOf(d.a);
        if (i === 0) tasks.push(choiceT('🔥', 'Разминка', 'badge-warmup', `Вставь букву: «${d.q}»`, d.a, d.hint));
        else if (i === 1) tasks.push({...choiceT('🖼️', 'Визуальное', 'badge-visual', `Правило: «${d.q}»`, d.a, `${d.hint}. Выбирай: ${d.a} или ${d.wrong}?`), visual: ruleSVG('Правило', d.hint, `Пишем: ${d.q.replace('_', d.a)}`)});
        else if (i === 2 || i === 3) tasks.push({ type:'choice', emoji:'🎯', badge:'Выбор', badgeClass:'badge-choice', question:`«${d.q}» — ${d.a} или ${d.wrong}?`, options:opts, correctIdx:ci, correctAns:d.a, explanation:d.hint });
        else if (i === 4) {
            const pd = [{ left:`ж_знь`, right:'и', answer:'и' }, { left:`ч_до`, right:'у', answer:'у' }, { left:`рощ_`, right:'а', answer:'а' }];
            tasks.push({ type:'pair', emoji:'🔗', badge:'Парное', badgeClass:'badge-pair', question:'Соедини слово и букву:', pairs:pd, explanation:'ЖИ, ЧУ, ЩА' });
        }
        else if (i === 5 || i === 6) tasks.push({ type:'input', emoji:'✏️', badge:'Ввод', badgeClass:'badge-input', question:`Впиши букву: «${d.q}»`, correctAns:d.a, explanation:d.hint });
        else if (i === 7) {
            const to = shuffle(['и','ы']);
            tasks.push({ type:'choice', emoji:'⚠️', badge:'Ловушка', badgeClass:'badge-trap', question:'В слове «шиповник» после Ш пишем:', options:to, correctIdx:to.indexOf('и'), correctAns:'и', explanation:'ШИ с И! Не дай себя обмануть!' });
        }
    });
    
    // Босс
    tasks.push({ type:'boss_zhishi', emoji:'⭐', badge:'Босс', badgeClass:'badge-boss', question:'Вставь все буквы:', words:[{text:'ж_знь',answer:'и'},{text:'ч_до',answer:'у'},{text:'щ_ка',answer:'у'},{text:'маш_на',answer:'и'}], explanation:'ЖИ, ЧУ, ЩУ, ШИ' });
    
    return tasks.slice(0, 8);
}

// ══════════ Разделительный Ь и Ъ ══════════
export function generateSoftLesson() {
    const dict = [
        { q:'в_юга', a:'ь', hint:'Ь в корне', wrong:'ъ' }, { q:'под_езд', a:'ъ', hint:'Ъ после приставки', wrong:'ь' },
        { q:'сем_я', a:'ь', hint:'Ь в корне', wrong:'ъ' }, { q:'об_ём', a:'ъ', hint:'Ъ после приставки', wrong:'ь' },
        { q:'руч_и', a:'ь', hint:'Ь в корне', wrong:'ъ' }, { q:'с_ехал', a:'ъ', hint:'Ъ после приставки', wrong:'ь' }
    ];
    const sel = shuffle([...dict, ...dict]).slice(0, 8);
    const tasks = [];
    
    sel.forEach((d, i) => {
        const opts = shuffle([d.a, d.wrong]), ci = opts.indexOf(d.a);
        if (i === 0) tasks.push(choiceT('🔥', 'Разминка', 'badge-warmup', `Вставь: «${d.q}»`, d.a, d.hint));
        else if (i === 1) tasks.push({...choiceT('🖼️', 'Визуальное', 'badge-visual', `Правило: «${d.q}»`, d.a, `${d.hint}. Выбирай: ь или ъ?`), visual: ruleSVG('Правило', 'Ь — в корне, Ъ — после приставки', `Пример: ${d.q.replace('_', d.a)}`)});
        else if (i === 2 || i === 3) tasks.push({ type:'choice', emoji:'🎯', badge:'Выбор', badgeClass:'badge-choice', question:`«${d.q}» — ь или ъ?`, options:opts, correctIdx:ci, correctAns:d.a, explanation:d.hint });
        else if (i === 4) {
            const pd = [{ left:'в_юга', right:'ь', answer:'ь' }, { left:'под_езд', right:'ъ', answer:'ъ' }, { left:'сем_я', right:'ь', answer:'ь' }];
            tasks.push({ type:'pair', emoji:'🔗', badge:'Парное', badgeClass:'badge-pair', question:'Соедини слово и знак:', pairs:pd, explanation:'Ь, Ъ, Ь' });
        }
        else if (i === 5 || i === 6) tasks.push({ type:'input', emoji:'✏️', badge:'Ввод', badgeClass:'badge-input', question:`Впиши (ь/ъ): «${d.q}»`, correctAns:d.a, explanation:d.hint });
        else if (i === 7) {
            const to = shuffle(['ъ','ь']);
            tasks.push({ type:'choice', emoji:'⚠️', badge:'Ловушка', badgeClass:'badge-trap', question:'В слове «под_езд» нужен:', options:to, correctIdx:to.indexOf('ъ'), correctAns:'ъ', explanation:'После приставки ПОД- пишем Ъ! Не перепутай!' });
        }
    });
    
    tasks.push({ type:'boss_soft', emoji:'⭐', badge:'Босс', badgeClass:'badge-boss', question:'Вставь все знаки:', words:[{text:'в_юга',answer:'ь'},{text:'под_езд',answer:'ъ'},{text:'об_явление',answer:'ъ'}], explanation:'Ь, Ъ, Ъ' });
    
    return tasks.slice(0, 8);
}

// ══════════ Безударные гласные ══════════
export function generateVowelLesson() {
    const dict = [
        { q:'л_сной', a:'е', hint:'лес', wrong:'и' }, { q:'в_да', a:'о', hint:'воды', wrong:'а' },
        { q:'тр_ва', a:'а', hint:'травка', wrong:'о' }, { q:'ст_на', a:'е', hint:'стены', wrong:'и' },
        { q:'з_мля', a:'е', hint:'земли', wrong:'и' }, { q:'м_ря', a:'о', hint:'море', wrong:'а' }
    ];
    const sel = shuffle([...dict, ...dict]).slice(0, 8);
    const tasks = [];
    
    sel.forEach((d, i) => {
        const opts = shuffle([d.a, d.wrong]), ci = opts.indexOf(d.a);
        if (i === 0) tasks.push(choiceT('🔥', 'Разминка', 'badge-warmup', `Вставь: «${d.q}»`, d.a, d.hint));
        else if (i === 1) tasks.push({...choiceT('🖼️', 'Визуальное', 'badge-visual', `Проверочное слово: «${d.hint}» → «${d.q.replace('_', d.a)}»`, d.a, `Проверяем: ${d.hint}`), visual: pairSVG(d.q.replace('_', '?'), d.hint)});
        else if (i === 2 || i === 3) tasks.push({ type:'choice', emoji:'🎯', badge:'Выбор', badgeClass:'badge-choice', question:`«${d.q}» — ${d.a} или ${d.wrong}?`, options:opts, correctIdx:ci, correctAns:d.a, explanation:d.hint });
        else if (i === 4) {
            const pd = [{ left:'л_сной', right:'е', answer:'е' }, { left:'в_да', right:'о', answer:'о' }, { left:'тр_ва', right:'а', answer:'а' }];
            tasks.push({ type:'pair', emoji:'🔗', badge:'Парное', badgeClass:'badge-pair', question:'Соедини слово и букву:', pairs:pd, explanation:'е, о, а' });
        }
        else if (i === 5 || i === 6) tasks.push({ type:'input', emoji:'✏️', badge:'Ввод', badgeClass:'badge-input', question:`Впиши: «${d.q}»`, correctAns:d.a, explanation:d.hint });
        else if (i === 7) {
            const to = shuffle(['е','и']);
            tasks.push({ type:'choice', emoji:'⚠️', badge:'Ловушка', badgeClass:'badge-trap', question:'В слове «лиса» проверка «лес» или «лис»? Пишем л_са:', options:to, correctIdx:to.indexOf('и'), correctAns:'и', explanation:'лиса → лИс! А лЕс → лесной. Не путай!' });
        }
    });
    
    tasks.push({ type:'boss_vowel', emoji:'⭐', badge:'Босс', badgeClass:'badge-boss', question:'Вставь все буквы:', words:[{text:'л_сной',answer:'е'},{text:'в_да',answer:'о'},{text:'з_мля',answer:'е'}], explanation:'лЕс, вОды, зЕмли' });
    
    return tasks.slice(0, 8);
}

// ══════════ Непроизносимые согласные ══════════
export function generateSilentLesson() {
    const dict = [
        { q:'чес_ный', a:'т', hint:'честь' }, { q:'грус_ный', a:'т', hint:'грусть' },
        { q:'радос_ный', a:'т', hint:'радость' }, { q:'звёз_ный', a:'д', hint:'звезда' },
        { q:'со_нце', a:'л', hint:'солнышко' }, { q:'чу_ство', a:'в', hint:'чуВствую' }
    ];
    const sel = shuffle([...dict, ...dict]).slice(0, 8);
    const tasks = [];
    
    sel.forEach((d, i) => {
        const wr = { т:'д', д:'т', л:'в', в:'л' }, w = wr[d.a] || 'т';
        const opts = shuffle([d.a, w]), ci = opts.indexOf(d.a);
        if (i === 0) tasks.push(choiceT('🔥', 'Разминка', 'badge-warmup', `Вставь: «${d.q}»`, d.a, d.hint));
        else if (i === 1) tasks.push({...choiceT('🖼️', 'Визуальное', 'badge-visual', `Проверка: «${d.hint}» → «${d.q.replace('_', d.a)}»`, d.a, `Проверочное слово: ${d.hint}`), visual: pairSVG(d.q.replace('_', '?'), d.hint)});
        else if (i === 2 || i === 3) tasks.push({ type:'choice', emoji:'🎯', badge:'Выбор', badgeClass:'badge-choice', question:`«${d.q}» — нужна буква?`, options:opts, correctIdx:ci, correctAns:d.a, explanation:d.hint });
        else if (i === 4) {
            const pd = [{ left:'чес_ный', right:'т', answer:'т' }, { left:'со_нце', right:'л', answer:'л' }, { left:'чу_ство', right:'в', answer:'в' }];
            tasks.push({ type:'pair', emoji:'🔗', badge:'Парное', badgeClass:'badge-pair', question:'Соедини слово и букву:', pairs:pd, explanation:'т, л, в' });
        }
        else if (i === 5 || i === 6) tasks.push({ type:'input', emoji:'✏️', badge:'Ввод', badgeClass:'badge-input', question:`Впиши букву: «${d.q}»`, correctAns:d.a, explanation:d.hint });
        else if (i === 7) tasks.push({ type:'choice', emoji:'⚠️', badge:'Ловушка', badgeClass:'badge-trap', question:'«чу_ство» — в или л?', options:shuffle(['в','л']), correctIdx:shuffle(['в','л']).indexOf('в'), correctAns:'в', explanation:'чуВствую → чуВство! Не пропусти!' });
    });
    
    tasks.push({ type:'boss_silent', emoji:'⭐', badge:'Босс', badgeClass:'badge-boss', question:'Вставь все буквы:', words:[{text:'чес_ный',answer:'т'},{text:'со_нце',answer:'л'},{text:'праз_ник',answer:'д'}], explanation:'чесТь, соЛнышко, празДник' });
    
    return tasks.slice(0, 8);
}

// ══════════ -ТСЯ / -ТЬСЯ ══════════
export function generateTsyaLesson() {
    const dict = [
        { q:'Он учит_ся', a:'тся', hint:'Что делает?' }, { q:'Надо учит_ся', a:'ться', hint:'Что делать?' },
        { q:'Мне нравит_ся', a:'тся', hint:'Что делает?' }, { q:'Это может случит_ся', a:'ться', hint:'Что сделать?' }
    ];
    const sel = shuffle([...dict, ...dict, ...dict]).slice(0, 8);
    const tasks = [];
    
    sel.forEach((d, i) => {
        const wa = d.a === 'тся' ? 'ться' : 'тся', opts = shuffle([d.a, wa]), ci = opts.indexOf(d.a);
        if (i === 0) tasks.push(choiceT('🔥', 'Разминка', 'badge-warmup', `Вставь: «${d.q}»`, d.a, d.hint));
        else if (i === 1) tasks.push({...choiceT('🖼️', 'Визуальное', 'badge-visual', `Правило: задай вопрос к глаголу`, d.a, `Вопрос → окончание`), visual: ruleSVG('Схема', 'Что делает? → ТСЯ', 'Что делать? → ТЬСЯ')});
        else if (i === 2 || i === 3) tasks.push({ type:'choice', emoji:'🎯', badge:'Выбор', badgeClass:'badge-choice', question:`«${d.q}» — тся или ться?`, options:opts, correctIdx:ci, correctAns:d.a, explanation:d.hint });
        else if (i === 4) {
            const pd = [{ left:'Он смеёт_ся (что делает?)', right:'тся', answer:'тся' }, { left:'Пора просыпат_ся (что делать?)', right:'ться', answer:'ться' }, { left:'Мне нравит_ся (что делает?)', right:'тся', answer:'тся' }];
            tasks.push({ type:'pair', emoji:'🔗', badge:'Парное', badgeClass:'badge-pair', question:'Соедини с окончанием:', pairs:pd, explanation:'тся, ться, тся' });
        }
        else if (i === 5 || i === 6) tasks.push({ type:'input', emoji:'✏️', badge:'Ввод', badgeClass:'badge-input', question:`Напиши окончание: «${d.q}»`, correctAns:d.a, explanation:d.hint });
        else if (i === 7) {
            const to = shuffle(['тся','ться']);
            tasks.push({ type:'choice', emoji:'⚠️', badge:'Ловушка', badgeClass:'badge-trap', question:'«Ему нравит_ся» — тся или ться?', options:to, correctIdx:to.indexOf('тся'), correctAns:'тся', explanation:'Что делает? → ТСЯ! Не ведись на ться!' });
        }
    });
    
    tasks.push({ type:'boss_tsya', emoji:'⭐', badge:'Босс', badgeClass:'badge-boss', question:'Вставь окончания:', words:[{text:'не ошиба_',answer:'ться'},{text:'труди_',answer:'ться'}], explanation:'Что делать? → ТЬСЯ' });
    
    return tasks.slice(0, 8);
}

// ══════════ ПРЕ/ПРИ ══════════
export function generatePrepriLesson() {
    const dict = [
        { q:'пр_бывать', a:'и', hint:'приближаться' }, { q:'пр_мудрый', a:'е', hint:'очень' },
        { q:'пр_шить', a:'и', hint:'присоединить' }, { q:'пр_красный', a:'е', hint:'очень' },
        { q:'пр_вокзальный', a:'и', hint:'рядом' }, { q:'пр_градить', a:'е', hint:'пере-' }
    ];
    const sel = shuffle([...dict, ...dict]).slice(0, 8);
    const tasks = [];
    
    sel.forEach((d, i) => {
        const opts = shuffle([d.a, d.a === 'и' ? 'е' : 'и']), ci = opts.indexOf(d.a);
        if (i === 0) tasks.push(choiceT('🔥', 'Разминка', 'badge-warmup', `Вставь: «${d.q}»`, d.a, d.hint));
        else if (i === 1) tasks.push({...choiceT('🖼️', 'Визуальное', 'badge-visual', `Значение приставки: ${d.hint}`, d.a, `Выбирай: ПРЕ или ПРИ?`), visual: ruleSVG('Значения', 'ПРИ = рядом, присоединение', 'ПРЕ = очень, пере-')});
        else if (i === 2 || i === 3) tasks.push({ type:'choice', emoji:'🎯', badge:'Выбор', badgeClass:'badge-choice', question:`«${d.q}» — е или и?`, options:opts, correctIdx:ci, correctAns:d.a, explanation:d.hint });
        else if (i === 4) {
            const pd = [{ left:'пр_шить (присоединить)', right:'и', answer:'и' }, { left:'пр_мудрый (очень)', right:'е', answer:'е' }, { left:'пр_вокзальный (рядом)', right:'и', answer:'и' }];
            tasks.push({ type:'pair', emoji:'🔗', badge:'Парное', badgeClass:'badge-pair', question:'Соедини слово и букву:', pairs:pd, explanation:'и, е, и' });
        }
        else if (i === 5 || i === 6) tasks.push({ type:'input', emoji:'✏️', badge:'Ввод', badgeClass:'badge-input', question:`Впиши (и/е): «${d.q}»`, correctAns:d.a, explanation:d.hint });
        else if (i === 7) {
            const to = shuffle(['е','и']);
            tasks.push({ type:'choice', emoji:'⚠️', badge:'Ловушка', badgeClass:'badge-trap', question:'«пр_дать друга» — е или и?', options:to, correctIdx:to.indexOf('е'), correctAns:'е', explanation:'ПРЕдать = пере-дать! А ПРИдать — другое значение!' });
        }
    });
    
    tasks.push({ type:'boss_prepri', emoji:'⭐', badge:'Босс', badgeClass:'badge-boss', question:'Вставь все буквы:', words:[{text:'Пр_мудрый',answer:'е'},{text:'пр_был',answer:'и'},{text:'пр_вокзальный',answer:'и'}], explanation:'ПРЕ, ПРИ, ПРИ' });
    
    return tasks.slice(0, 8);
}

// ══════════ Н и НН ══════════
export function generateNNLesson() {
    const dict = [
        { q:'кури_ый', a:'н', hint:'-ИН-', wrong:'нн' }, { q:'соломе_ый', a:'нн', hint:'-ЕНН-', wrong:'н' },
        { q:'стекля_ый', a:'нн', hint:'исключение!', wrong:'н' }, { q:'ветре_ый', a:'н', hint:'исключение!', wrong:'нн' },
        { q:'пусты_ый', a:'нн', hint:'стык корня', wrong:'н' }, { q:'кожа_ый', a:'н', hint:'-АН-', wrong:'нн' }
    ];
    const sel = shuffle([...dict, ...dict]).slice(0, 8);
    const tasks = [];
    
    sel.forEach((d, i) => {
        const opts = shuffle([d.a, d.wrong]), ci = opts.indexOf(d.a);
        if (i === 0) tasks.push(choiceT('🔥', 'Разминка', 'badge-warmup', `«${d.q}» — Н или НН?`, d.a, d.hint));
        else if (i === 1) tasks.push({...choiceT('🖼️', 'Визуальное', 'badge-visual', `Правило для суффикса`, d.a, `${d.hint}. Выбирай!`), visual: ruleSVG('Суффиксы', '-АН-, -ЯН-, -ИН- → одна Н', '-ЕНН-, -ОНН- → НН (кроме ветреный)')});
        else if (i === 2 || i === 3) tasks.push({ type:'choice', emoji:'🎯', badge:'Выбор', badgeClass:'badge-choice', question:`«${d.q}» — Н или НН?`, options:opts.map(o => o === 'н' ? 'Н' : 'НН'), correctIdx:ci, correctAns:d.a, explanation:d.hint });
        else if (i === 4) {
            const pd = [{ left:'кури_ый (-ИН-)', right:'Н', answer:'н' }, { left:'соломе_ый (-ЕНН-)', right:'НН', answer:'нн' }, { left:'стекля_ый (искл.)', right:'НН', answer:'нн' }];
            tasks.push({ type:'pair', emoji:'🔗', badge:'Парное', badgeClass:'badge-pair', question:'Соедини слово и Н/НН:', pairs:pd, explanation:'Н, НН, НН' });
        }
        else if (i === 5 || i === 6) tasks.push({ type:'input', emoji:'✏️', badge:'Ввод', badgeClass:'badge-input', question:`Впиши (н/нн): «${d.q}»`, correctAns:d.a, explanation:d.hint });
        else if (i === 7) {
            const to = shuffle(['Н','НН']);
            tasks.push({ type:'choice', emoji:'⚠️', badge:'Ловушка', badgeClass:'badge-trap', question:'«ветре_ый» — Н или НН?', options:to, correctIdx:to.indexOf('Н'), correctAns:'н', explanation:'Ветреный — исключение! Одна Н! Не перепутай с остальными!' });
        }
    });
    
    tasks.push({ type:'boss_nn', emoji:'⭐', badge:'Босс', badgeClass:'badge-boss', question:'Вставь Н или НН:', words:[{text:'стекля_ый',answer:'нн'},{text:'кожа_ый',answer:'н'},{text:'деревя_ый',answer:'нн'}], explanation:'НН, Н, НН' });
    
    return tasks.slice(0, 8);
}

export function generateRusLesson(skillId) {
    const gens = { zhishi:generateZhishiLesson, soft:generateSoftLesson, vowel:generateVowelLesson, silent:generateSilentLesson, tsya:generateTsyaLesson, prepri:generatePrepriLesson, nn:generateNNLesson };
    return gens[skillId] ? gens[skillId]() : generateZhishiLesson();
}