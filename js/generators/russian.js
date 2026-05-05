// ═══════════════ ВСЕ ГЕНЕРАТОРЫ РУССКОГО ЯЗЫКА ═══════════════

// Вспомогательная функция для русского (без makeWrongs — здесь неправильные ответы заданы явно)
function choiceR(emoji, badge, bc, q, correct, wrong, expl, visual = null) {
    const opts = shuffle([correct, wrong]);
    return {
        type: 'choice', emoji, badge, badgeClass: bc, question: q,
        options: opts,
        correctIdx: opts.indexOf(correct),
        correctAns: correct,
        explanation: expl,
        visual: visual
    };
}

// ═══════════════ ЖИ/ШИ, ЧА/ЩА, ЧУ/ЩУ ═══════════════
function generateZhishiLesson() {
    const zhishi = [
        { q: 'ж_раф', a: 'и', hint: 'ЖИ пиши с буквой И', wrong: 'ы' },
        { q: 'ш_шка', a: 'и', hint: 'ШИ пиши с буквой И', wrong: 'ы' },
        { q: 'маш_на', a: 'и', hint: 'ШИ пиши с буквой И', wrong: 'ы' },
        { q: 'ж_знь', a: 'и', hint: 'ЖИ пиши с буквой И', wrong: 'ы' },
        { q: 'пруж_на', a: 'и', hint: 'ЖИ пиши с буквой И', wrong: 'ы' },
    ];
    const chasha = [
        { q: 'ч_шка', a: 'а', hint: 'ЧА пиши с буквой А', wrong: 'я' },
        { q: 'щ_вель', a: 'а', hint: 'ЩА пиши с буквой А', wrong: 'я' },
        { q: 'ч_й', a: 'а', hint: 'ЧА пиши с буквой А', wrong: 'я' },
    ];
    const chushu = [
        { q: 'ч_до', a: 'у', hint: 'ЧУ пиши с буквой У', wrong: 'ю' },
        { q: 'щ_ка', a: 'у', hint: 'ЩУ пиши с буквой У', wrong: 'ю' },
        { q: 'ч_жой', a: 'у', hint: 'ЧУ пиши с буквой У', wrong: 'ю' },
    ];
    const all = shuffle([...zhishi, ...chasha, ...chushu]).slice(0, 8);
    const tasks = [];

    // 1. Разминка
    tasks.push(choiceR('🔥', 'Разминка', 'badge-warmup', `Вставь букву: «${all[0].q}»`, all[0].a, all[0].wrong, all[0].hint));

    // 2. Визуальное
    tasks.push(choiceR('🖼️', 'Визуальное', 'badge-visual',
        'Какое правило работает в слове «Ж_РАФ»?',
        'ЖИ пиши с И', 'ЖЫ пиши с Ы',
        'ЖИ всегда с И!',
        `<svg width="200" height="50" class="visual-svg"><rect width="200" height="50" fill="#7C3AED" rx="12"/><text x="100" y="34" text-anchor="middle" font-size="22" fill="white" font-weight="800">ЖИ ↔ И</text></svg>`
    ));

    // 3-4. Выбор
    tasks.push(choiceR('📝', 'Выбор', 'badge-choice', `Вставь: «${all[1].q}»`, all[1].a, all[1].wrong, all[1].hint));
    tasks.push(choiceR('📝', 'Выбор', 'badge-choice', `Вставь: «${all[2].q}»`, all[2].a, all[2].wrong, all[2].hint));

    // 5. Парное
    tasks.push({
        type: 'pair', emoji: '🔗', badge: 'Парное', badgeClass: 'badge-pair',
        question: 'Соедини слово с правилом:',
        pairs: [
            { left: 'ж_раф', right: 'ЖИ', answer: 'ЖИ' },
            { left: 'ч_до', right: 'ЧУ', answer: 'ЧУ' },
            { left: 'рощ_', right: 'ЩА', answer: 'ЩА' },
        ],
        explanation: 'ЖИ, ЧУ, ЩА — запомни!'
    });

    // 6. Ввод
    tasks.push({
        type: 'input', emoji: '✏️', badge: 'Ввод', badgeClass: 'badge-input',
        question: `Впиши букву: «${all[4].q}»`,
        correctAns: all[4].a, explanation: all[4].hint
    });

    // 7. Ловушка
    tasks.push(choiceR('⚠️', 'Ловушка', 'badge-trap',
        '«Ш_повник» — какую букву?',
        'и', 'ы',
        'ШИповник — пишем И! Слышится Ы, но правило ЖИ/ШИ!'
    ));

    // 8. Босс
    tasks.push({
        type: 'boss_zhishi', emoji: '⭐', badge: 'Босс', badgeClass: 'badge-boss',
        question: 'Вставь буквы в три слова:',
        words: [
            { text: 'ж_знь', answer: 'и' },
            { text: 'ч_до', answer: 'у' },
            { text: 'рощ_', answer: 'а' },
        ],
        explanation: 'ЖИзнь (ЖИ), ЧУдо (ЧУ), роЩА (ЩА)'
    });

    return tasks;
}

// ═══════════════ РАЗДЕЛИТЕЛЬНЫЙ Ь И Ъ ═══════════════
function generateSoftLesson() {
    const data = shuffle([
        { q: 'в_юга', a: 'ь', hint: 'Разделительный Ь в корне', wrong: 'ъ' },
        { q: 'под_езд', a: 'ъ', hint: 'Ъ после приставки ПОД-', wrong: 'ь' },
        { q: 'сем_я', a: 'ь', hint: 'Разделительный Ь в корне', wrong: 'ъ' },
        { q: 'об_ём', a: 'ъ', hint: 'Ъ после приставки ОБ-', wrong: 'ь' },
        { q: 'руч_и', a: 'ь', hint: 'Разделительный Ь', wrong: 'ъ' },
        { q: 'с_ехал', a: 'ъ', hint: 'Ъ после приставки С-', wrong: 'ь' },
        { q: 'вороб_и', a: 'ь', hint: 'Разделительный Ь', wrong: 'ъ' },
        { q: 'об_явление', a: 'ъ', hint: 'Ъ после приставки ОБ-', wrong: 'ь' },
    ]);
    const tasks = [];

    // 1. Разминка
    tasks.push(choiceR('🔥', 'Разминка', 'badge-warmup', `Вставь Ь или Ъ: «${data[0].q}»`, data[0].a, data[0].wrong, data[0].hint));

    // 2. Визуальное (правило)
    tasks.push(choiceR('🖼️', 'Визуальное', 'badge-visual',
        'Когда пишем Ъ?',
        'После приставки перед Е, Ё, Ю, Я', 'Всегда после согласной',
        'Ъ — только после приставок!',
        `<svg width="220" height="50" class="visual-svg"><rect width="220" height="50" fill="#8B5CF6" rx="12"/><text x="110" y="34" text-anchor="middle" font-size="16" fill="white" font-weight="800">Ъ ↔ после приставки</text></svg>`
    ));

    // 3-4. Выбор
    tasks.push(choiceR('📝', 'Выбор', 'badge-choice', `Вставь: «${data[1].q}»`, data[1].a, data[1].wrong, data[1].hint));
    tasks.push(choiceR('📝', 'Выбор', 'badge-choice', `Вставь: «${data[2].q}»`, data[2].a, data[2].wrong, data[2].hint));

    // 5. Парное (слово ↔ правило)
    tasks.push({
        type: 'pair', emoji: '🔗', badge: 'Парное', badgeClass: 'badge-pair',
        question: 'Соедини слово с правилом:',
        pairs: [
            { left: 'под_езд', right: 'Ъ после приставки', answer: 'Ъ' },
            { left: 'сем_я', right: 'Ь в корне', answer: 'Ь' },
            { left: 'об_явление', right: 'Ъ после приставки', answer: 'Ъ' },
        ],
        explanation: 'Ь в корне, Ъ после приставки!'
    });

    // 6. Ввод
    tasks.push({
        type: 'input', emoji: '✏️', badge: 'Ввод', badgeClass: 'badge-input',
        question: `Впиши (ь или ъ): «${data[4].q}»`,
        correctAns: data[4].a, explanation: data[4].hint
    });

    // 7. Ловушка (похожие слова)
    tasks.push(choiceR('⚠️', 'Ловушка', 'badge-trap',
        '«ПОД_ЕЗД» — Ь или Ъ?',
        'ъ', 'ь',
        'Ъ после приставки ПОД-! Часто путают с Ь.'
    ));

    // 8. Босс
    tasks.push({
        type: 'boss_soft', emoji: '⭐', badge: 'Босс', badgeClass: 'badge-boss',
        question: 'Вставь буквы и объясни:',
        words: [
            { text: 'в_юга', answer: 'ь' },
            { text: 'под_езд', answer: 'ъ' },
            { text: 'об_явление', answer: 'ъ' },
        ],
        explanation: 'вЬюга (Ь в корне), подЪезд (Ъ), обЪявление (Ъ)'
    });

    return tasks;
}

// ═══════════════ БЕЗУДАРНЫЕ ГЛАСНЫЕ ═══════════════
function generateVowelLesson() {
    const data = shuffle([
        { q: 'л_сной', a: 'е', hint: 'Проверочное: лес', wrong: 'и' },
        { q: 'в_да', a: 'о', hint: 'Проверочное: воды', wrong: 'а' },
        { q: 'тр_ва', a: 'а', hint: 'Проверочное: травка', wrong: 'о' },
        { q: 'ст_на', a: 'е', hint: 'Проверочное: стены', wrong: 'и' },
        { q: 'з_мля', a: 'е', hint: 'Проверочное: земли', wrong: 'и' },
        { q: 'м_ря', a: 'о', hint: 'Проверочное: море', wrong: 'а' },
        { q: 'г_ра', a: 'о', hint: 'Проверочное: горы', wrong: 'а' },
        { q: 'сл_ды', a: 'е', hint: 'Проверочное: след', wrong: 'и' },
    ]);
    const tasks = [];

    // 1. Разминка
    tasks.push(choiceR('🔥', 'Разминка', 'badge-warmup', `Вставь: «${data[0].q}» — ${data[0].hint}`, data[0].a, data[0].wrong, data[0].hint));

    // 2. Визуальное
    tasks.push(choiceR('🖼️', 'Визуальное', 'badge-visual',
        'Как проверить безударную гласную?',
        'Подобрать проверочное слово', 'Запомнить',
        'Меняем слово так, чтобы гласная стала ударной!',
        `<svg width="220" height="50" class="visual-svg"><rect width="220" height="50" fill="#F59E0B" rx="12"/><text x="110" y="34" text-anchor="middle" font-size="16" fill="white" font-weight="800">лес → лЕсной</text></svg>`
    ));

    // 3-4. Выбор
    tasks.push(choiceR('📝', 'Выбор', 'badge-choice', `Вставь: «${data[1].q}»`, data[1].a, data[1].wrong, data[1].hint));
    tasks.push(choiceR('📝', 'Выбор', 'badge-choice', `Вставь: «${data[2].q}»`, data[2].a, data[2].wrong, data[2].hint));

    // 5. Парное (слово ↔ проверочное)
    tasks.push({
        type: 'pair', emoji: '🔗', badge: 'Парное', badgeClass: 'badge-pair',
        question: 'Соедини слово с проверочным:',
        pairs: [
            { left: 'л_сной', right: 'лес', answer: 'лес' },
            { left: 'в_да', right: 'воды', answer: 'воды' },
            { left: 'м_ря', right: 'море', answer: 'море' },
        ],
        explanation: 'лес→лЕсной, воды→вОда, море→мОря'
    });

    // 6. Ввод
    tasks.push({
        type: 'input', emoji: '✏️', badge: 'Ввод', badgeClass: 'badge-input',
        question: `Впиши: «${data[4].q}» (проверка: ${data[4].hint})`,
        correctAns: data[4].a, explanation: data[4].hint
    });

    // 7. Ловушка («лиса» vs «лес»)
    tasks.push(choiceR('⚠️', 'Ловушка', 'badge-trap',
        '«Л_СНОЙ» — е или и? Проверка: лес',
        'е', 'и',
        'Проверочное «лес» → лЕсной. Не путай с «лИса»!'
    ));

    // 8. Босс
    tasks.push({
        type: 'boss_vowel', emoji: '⭐', badge: 'Босс', badgeClass: 'badge-boss',
        question: 'Вставь буквы и назови проверочные:',
        words: [
            { text: 'л_сной', answer: 'е' },
            { text: 'в_да', answer: 'о' },
            { text: 'з_мля', answer: 'е' },
        ],
        explanation: 'лЕсной (лес), вОда (воды), зЕмля (земли)'
    });

    return tasks;
}

// ═══════════════ НЕПРОИЗНОСИМЫЕ СОГЛАСНЫЕ ═══════════════
function generateSilentLesson() {
    const data = shuffle([
        { q: 'чес_ный', a: 'т', hint: 'Проверочное: честь', wrong: 'д' },
        { q: 'грус_ный', a: 'т', hint: 'Проверочное: грусть', wrong: 'д' },
        { q: 'радос_ный', a: 'т', hint: 'Проверочное: радость', wrong: 'д' },
        { q: 'звёз_ный', a: 'д', hint: 'Проверочное: звезда', wrong: 'т' },
        { q: 'праз_ник', a: 'д', hint: 'Словарное слово', wrong: 'т' },
        { q: 'чу_ство', a: 'в', hint: 'Проверочное: чуВствовать', wrong: 'л' },
        { q: 'лес_ница', a: 'т', hint: 'Словарное: лестница', wrong: 'д' },
        { q: 'со_нце', a: 'л', hint: 'Проверочное: солнышко', wrong: 'в' },
    ]);
    const tasks = [];

    // 1. Разминка
    tasks.push(choiceR('🔥', 'Разминка', 'badge-warmup', `Вставь: «${data[0].q}» — ${data[0].hint}`, data[0].a, data[0].wrong, data[0].hint));

    // 2. Визуальное
    tasks.push(choiceR('🖼️', 'Визуальное', 'badge-visual',
        'Как проверить непроизносимую согласную?',
        'Подобрать слово, где она слышна', 'Запомнить',
        'честь → чесТный (Т слышна!)',
        `<svg width="220" height="50" class="visual-svg"><rect width="220" height="50" fill="#EC4899" rx="12"/><text x="110" y="34" text-anchor="middle" font-size="16" fill="white" font-weight="800">честь → чесТный</text></svg>`
    ));

    // 3-4. Выбор
    tasks.push(choiceR('📝', 'Выбор', 'badge-choice', `Вставь: «${data[1].q}»`, data[1].a, data[1].wrong, data[1].hint));
    tasks.push(choiceR('📝', 'Выбор', 'badge-choice', `Вставь: «${data[2].q}»`, data[2].a, data[2].wrong, data[2].hint));

    // 5. Парное (слово ↔ проверочное)
    tasks.push({
        type: 'pair', emoji: '🔗', badge: 'Парное', badgeClass: 'badge-pair',
        question: 'Соедини слово с проверкой:',
        pairs: [
            { left: 'чес_ный', right: 'честь', answer: 'честь' },
            { left: 'со_нце', right: 'солнышко', answer: 'солнышко' },
            { left: 'грус_ный', right: 'грусть', answer: 'грусть' },
        ],
        explanation: 'Проверочное слово помогает услышать согласную!'
    });

    // 6. Ввод
    tasks.push({
        type: 'input', emoji: '✏️', badge: 'Ввод', badgeClass: 'badge-input',
        question: `Впиши букву: «${data[4].q}»`,
        correctAns: data[4].a, explanation: data[4].hint
    });

    // 7. Ловушка («чувство»)
    tasks.push(choiceR('⚠️', 'Ловушка', 'badge-trap',
        '«ЧУ_СТВО» — в или л?',
        'в', 'л',
        'Проверка: чуВствовать! Не «чуЛство» — это ошибка!'
    ));

    // 8. Босс
    tasks.push({
        type: 'boss_silent', emoji: '⭐', badge: 'Босс', badgeClass: 'badge-boss',
        question: 'Вставь буквы и назови проверочные:',
        words: [
            { text: 'чес_ный', answer: 'т' },
            { text: 'со_нце', answer: 'л' },
            { text: 'праз_ник', answer: 'д' },
        ],
        explanation: 'чесТный (честь), соЛнце (солнышко), празДник'
    });

    return tasks;
}

// ═══════════════ -ТСЯ / -ТЬСЯ ═══════════════
function generateTsyaLesson() {
    const data = shuffle([
        { q: 'Он учит_ся', a: 'тся', hint: 'Что делает? — без Ь', wrong: 'ться' },
        { q: 'Надо учит_ся', a: 'ться', hint: 'Что делать? — с Ь', wrong: 'тся' },
        { q: 'Мне нравит_ся', a: 'тся', hint: 'Что делает? — без Ь', wrong: 'ться' },
        { q: 'Это может случит_ся', a: 'ться', hint: 'Что сделать? — с Ь', wrong: 'тся' },
        { q: 'Солнце садит_ся', a: 'тся', hint: 'Что делает? — без Ь', wrong: 'ться' },
        { q: 'Пора просыпат_ся', a: 'ться', hint: 'Что делать? — с Ь', wrong: 'тся' },
        { q: 'Он смеёт_ся', a: 'тся', hint: 'Что делает? — без Ь', wrong: 'ться' },
        { q: 'Не надо боят_ся', a: 'ться', hint: 'Что делать? — с Ь', wrong: 'тся' },
    ]);
    const tasks = [];

    // 1. Разминка
    tasks.push(choiceR('🔥', 'Разминка', 'badge-warmup', `Вставь: «${data[0].q}» — ${data[0].hint}`, data[0].a, data[0].wrong, data[0].hint));

    // 2. Визуальное (правило-схема)
    tasks.push(choiceR('🖼️', 'Визуальное', 'badge-visual',
        'Как определить: ТСЯ или ТЬСЯ?',
        'Задать вопрос к глаголу', 'Выучить наизусть',
        'Есть Ь в вопросе → есть Ь в слове!',
        `<svg width="240" height="50" class="visual-svg"><rect width="240" height="50" fill="#14B8A6" rx="12"/><text x="120" y="34" text-anchor="middle" font-size="14" fill="white" font-weight="800">Что делать? → ТЬСЯ</text></svg>`
    ));

    // 3-4. Выбор
    tasks.push(choiceR('📝', 'Выбор', 'badge-choice', `Вставь: «${data[1].q}»`, data[1].a, data[1].wrong, data[1].hint));
    tasks.push(choiceR('📝', 'Выбор', 'badge-choice', `Вставь: «${data[2].q}»`, data[2].a, data[2].wrong, data[2].hint));

    // 5. Парное (глагол ↔ вопрос)
    tasks.push({
        type: 'pair', emoji: '🔗', badge: 'Парное', badgeClass: 'badge-pair',
        question: 'Соедини глагол с вопросом:',
        pairs: [
            { left: 'Он учится', right: 'Что делает?', answer: 'Что делает?' },
            { left: 'Надо учиться', right: 'Что делать?', answer: 'Что делать?' },
            { left: 'Солнце садится', right: 'Что делает?', answer: 'Что делает?' },
        ],
        explanation: 'Задай вопрос — и узнаешь, нужен ли Ь!'
    });

    // 6. Ввод
    tasks.push({
        type: 'input', emoji: '✏️', badge: 'Ввод', badgeClass: 'badge-input',
        question: `Напиши окончание: «${data[4].q}»`,
        correctAns: data[4].a, explanation: data[4].hint
    });

    // 7. Ловушка («нравится» — частотная ошибка!)
    tasks.push(choiceR('⚠️', 'Ловушка', 'badge-trap',
        '«Ему это нравит_ся» — тся или ться?',
        'тся', 'ться',
        'Что делает? — без Ь! Самая частая ошибка в интернете!'
    ));

    // 8. Босс (два глагола в одном предложении)
    tasks.push({
        type: 'boss_tsya', emoji: '⭐', badge: 'Босс', badgeClass: 'badge-boss',
        question: 'Вставь окончания в оба глагола:',
        words: [
            { text: 'чтобы не ошиба_', answer: 'ться' },
            { text: 'нужно труди_', answer: 'ться' },
        ],
        explanation: 'Что делать? → ТЬСЯ в обоих случаях!'
    });

    return tasks;
}

// ═══════════════ ПРЕ / ПРИ ═══════════════
function generatePrepriLesson() {
    const data = shuffle([
        { q: 'пр_бывать в город', a: 'и', hint: 'ПРИбывать = приближаться', wrong: 'е' },
        { q: 'пр_мудрый старик', a: 'е', hint: 'ПРЕмудрый = очень', wrong: 'и' },
        { q: 'пр_шить пуговицу', a: 'и', hint: 'ПРИшить = присоединить', wrong: 'е' },
        { q: 'пр_красный день', a: 'е', hint: 'ПРЕкрасный = очень', wrong: 'и' },
        { q: 'пр_вокзальная площадь', a: 'и', hint: 'ПРИвокзальная = рядом', wrong: 'е' },
        { q: 'пр_градить путь', a: 'е', hint: 'ПРЕградить = пере-', wrong: 'и' },
        { q: 'пр_открыть окно', a: 'и', hint: 'ПРИоткрыть = не полностью', wrong: 'е' },
        { q: 'пр_увеличить', a: 'е', hint: 'ПРЕувеличить = очень', wrong: 'и' },
    ]);
    const tasks = [];

    // 1. Разминка
    tasks.push(choiceR('🔥', 'Разминка', 'badge-warmup', `Вставь: «${data[0].q}»`, data[0].a, data[0].wrong, data[0].hint));

    // 2. Визуальное (схема ПРЕ/ПРИ)
    tasks.push(choiceR('🖼️', 'Визуальное', 'badge-visual',
        'ПРЕ- пишется, когда...',
        '= очень или пере-', 'Когда слово длинное',
        'ПРЕ = очень (премудрый) или пере- (преградить)',
        `<svg width="240" height="50" class="visual-svg"><rect width="240" height="50" fill="#F97316" rx="12"/><text x="120" y="34" text-anchor="middle" font-size="14" fill="white" font-weight="800">ПРЕ = очень / пере-</text></svg>`
    ));

    // 3-4. Выбор
    tasks.push(choiceR('📝', 'Выбор', 'badge-choice', `Вставь: «${data[1].q}»`, data[1].a, data[1].wrong, data[1].hint));
    tasks.push(choiceR('📝', 'Выбор', 'badge-choice', `Вставь: «${data[2].q}»`, data[2].a, data[2].wrong, data[2].hint));

    // 5. Парное (слово ↔ значение)
    tasks.push({
        type: 'pair', emoji: '🔗', badge: 'Парное', badgeClass: 'badge-pair',
        question: 'Соедини слово со значением:',
        pairs: [
            { left: 'пр_бывать', right: 'приближаться', answer: 'приближаться' },
            { left: 'пр_мудрый', right: 'очень мудрый', answer: 'очень мудрый' },
            { left: 'пр_шить', right: 'присоединить', answer: 'присоединить' },
        ],
        explanation: 'ПРИ — приближение/присоединение, ПРЕ — очень/пере-'
    });

    // 6. Ввод
    tasks.push({
        type: 'input', emoji: '✏️', badge: 'Ввод', badgeClass: 'badge-input',
        question: `Впиши (и или е): «${data[4].q}»`,
        correctAns: data[4].a, explanation: data[4].hint
    });

    // 7. Ловушка (предать vs придать)
    tasks.push(choiceR('⚠️', 'Ловушка', 'badge-trap',
        '«Пр_дать друга» — и или е?',
        'е', 'и',
        'ПРЕдать = пере-дать! А «придать» — другое слово!'
    ));

    // 8. Босс
    tasks.push({
        type: 'boss_prepri', emoji: '⭐', badge: 'Босс', badgeClass: 'badge-boss',
        question: 'Вставь буквы и объясни значения:',
        words: [
            { text: 'Пр_мудрый', answer: 'е' },
            { text: 'пр_был', answer: 'и' },
            { text: 'пр_вокзальный', answer: 'и' },
        ],
        explanation: 'ПРЕмудрый (очень), ПРИбыл (приблизился), ПРИвокзальный (рядом)'
    });

    return tasks;
}

// ═══════════════ Н и НН ═══════════════
function generateNNLesson() {
    const data = shuffle([
        { q: 'кури_ый', a: 'н', hint: 'Суффикс -ИН- → одна Н', wrong: 'нн' },
        { q: 'соломе_ый', a: 'нн', hint: 'Суффикс -ЕНН- → НН', wrong: 'н' },
        { q: 'стекля_ый', a: 'нн', hint: 'Исключение! СтекляННый', wrong: 'н' },
        { q: 'ветре_ый', a: 'н', hint: 'Исключение! ВетреНый', wrong: 'нн' },
        { q: 'пусты_ый', a: 'нн', hint: 'Стык корня и суффикса', wrong: 'н' },
        { q: 'кожа_ый', a: 'н', hint: 'Суффикс -АН- → одна Н', wrong: 'нн' },
        { q: 'обеде_ый', a: 'нн', hint: 'Суффикс -ЕНН- → НН', wrong: 'н' },
        { q: 'глиня_ый', a: 'н', hint: 'Суффикс -ЯН- → одна Н', wrong: 'нн' },
    ]);
    const tasks = [];

    // 1. Разминка
    tasks.push(choiceR('🔥', 'Разминка', 'badge-warmup',
        `«${data[0].q}» — Н или НН? ${data[0].hint}`,
        data[0].a === 'н' ? 'Н' : 'НН',
        data[0].wrong === 'н' ? 'Н' : 'НН',
        data[0].hint
    ));

    // 2. Визуальное (правило-схема)
    tasks.push(choiceR('🖼️', 'Визуальное', 'badge-visual',
        'В каких суффиксах пишем НН?',
        '-ЕНН-, -ОНН-', '-АН-, -ЯН-, -ИН-',
        'ЕНН/ОНН → НН! АН/ЯН/ИН → Н. Исключения: стеклянный, оловянный, деревянный!',
        `<svg width="240" height="50" class="visual-svg"><rect width="240" height="50" fill="#EF4444" rx="12"/><text x="120" y="34" text-anchor="middle" font-size="14" fill="white" font-weight="800">ЕНН/ОНН → НН</text></svg>`
    ));

    // 3-4. Выбор
    tasks.push(choiceR('📝', 'Выбор', 'badge-choice',
        `«${data[1].q}» — Н или НН?`,
        data[1].a === 'н' ? 'Н' : 'НН',
        data[1].wrong === 'н' ? 'Н' : 'НН',
        data[1].hint
    ));
    tasks.push(choiceR('📝', 'Выбор', 'badge-choice',
        `«${data[2].q}» — Н или НН?`,
        data[2].a === 'н' ? 'Н' : 'НН',
        data[2].wrong === 'н' ? 'Н' : 'НН',
        data[2].hint
    ));

    // 5. Парное (слово ↔ правило)
    tasks.push({
        type: 'pair', emoji: '🔗', badge: 'Парное', badgeClass: 'badge-pair',
        question: 'Соедини слово с правилом:',
        pairs: [
            { left: 'куриный', right: '-ИН- → Н', answer: '-ИН- → Н' },
            { left: 'соломенный', right: '-ЕНН- → НН', answer: '-ЕНН- → НН' },
            { left: 'стеклянный', right: 'Исключение!', answer: 'Исключение!' },
        ],
        explanation: 'Суффикс определяет количество Н!'
    });

    // 6. Ввод
    tasks.push({
        type: 'input', emoji: '✏️', badge: 'Ввод', badgeClass: 'badge-input',
        question: `Впиши (н или нн): «${data[4].q}»`,
        correctAns: data[4].a, explanation: data[4].hint
    });

    // 7. Ловушка (ветреный — исключение!)
    tasks.push(choiceR('⚠️', 'Ловушка', 'badge-trap',
        '«ВЕТРЕ_ЫЙ» — Н или НН?',
        'Н', 'НН',
        'Ветреный — исключение! Одна Н. А безветренный — уже две НН!'
    ));

    // 8. Босс
    tasks.push({
        type: 'boss_nn', emoji: '⭐', badge: 'Босс', badgeClass: 'badge-boss',
        question: 'Вставь Н или НН и объясни:',
        words: [
            { text: 'стекля_ый', answer: 'нн' },
            { text: 'кожа_ый', answer: 'н' },
            { text: 'деревя_ый', answer: 'нн' },
        ],
        explanation: 'СтекляННый (искл.), кожаНый (-АН-), деревяННый (искл.)'
    });

    return tasks;
}