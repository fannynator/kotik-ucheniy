export const $ = (selector, parent = document) => parent.querySelector(selector);
export const $$ = (selector, parent = document) => parent.querySelectorAll(selector);

export const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const shuffle = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

export const showToast = (emoji, message, toastEl) => {
    if (!toastEl) return;
    toastEl.innerHTML = `<span>${emoji}</span> ${message}`;
    toastEl.classList.add('show');
    clearTimeout(toastEl._tid);
    toastEl._tid = setTimeout(() => toastEl.classList.remove('show'), 2000);
};

eexport const makeWrongs = (correct, count = 3) => {
    const wrongs = new Set();
    const maxAttempts = 50;
    let attempts = 0;
    
    while (wrongs.size < count && attempts < maxAttempts) {
        attempts++;
        let delta;
        if (correct <= 10) {
            delta = rnd(-5, 5);
        } else if (correct <= 50) {
            delta = rnd(-Math.floor(correct * 0.3), Math.floor(correct * 0.3));
        } else {
            delta = rnd(-Math.floor(correct * 0.2), Math.floor(correct * 0.2));
        }
        
        // Убеждаемся что дельта не ноль и не уводит в минус
        if (delta === 0) delta = rnd(1, 3) * (Math.random() > 0.5 ? 1 : -1);
        
        const candidate = correct + delta;
        
        if (candidate !== correct && candidate >= 0 && !wrongs.has(candidate)) {
            wrongs.add(candidate);
        }
    }
    
    return [...wrongs];
};

export const choiceT = (emoji, badge, badgeClass, question, correct, explanation) => {
    const allOptions = [correct, ...makeWrongs(correct)];
    const options = shuffle(allOptions);
    const correctIdx = options.findIndex(opt => opt === correct);
    
    return { type: 'choice', emoji, badge, badgeClass, question, options, correctIdx, correctAns: correct, explanation };
};

export const inputT = (emoji, badge, badgeClass, question, correct, explanation) => {
    return { type: 'input', emoji, badge, badgeClass, question, correctAns: correct, explanation };
};

export const pairT = (emoji, badge, badgeClass, question, pairs, explanation) => {
    return { type: 'pair', emoji, badge, badgeClass, question, pairs, explanation };
};
