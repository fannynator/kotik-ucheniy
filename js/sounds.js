// js/sounds.js

let audioCtx = null;

function getAudioContext() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return audioCtx;
}

function playCorrectSound() {
    try {
        const ctx = getAudioContext(); const now = ctx.currentTime;
        const o1 = ctx.createOscillator(); const g1 = ctx.createGain();
        o1.type = 'sine'; o1.frequency.setValueAtTime(523.25, now); o1.frequency.setValueAtTime(659.25, now + 0.08);
        g1.gain.setValueAtTime(0.25, now); g1.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        o1.connect(g1); g1.connect(ctx.destination); o1.start(now); o1.stop(now + 0.3);
        const o2 = ctx.createOscillator(); const g2 = ctx.createGain();
        o2.type = 'sine'; o2.frequency.setValueAtTime(659.25, now + 0.1); o2.frequency.setValueAtTime(783.99, now + 0.18);
        g2.gain.setValueAtTime(0.2, now + 0.1); g2.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
        o2.connect(g2); g2.connect(ctx.destination); o2.start(now + 0.1); o2.stop(now + 0.45);
    } catch (e) {}
    vibrate(30);
}

function playWrongSound() {
    try {
        const ctx = getAudioContext(); const now = ctx.currentTime;
        const o = ctx.createOscillator(); const g = ctx.createGain();
        o.type = 'triangle'; o.frequency.setValueAtTime(220, now); o.frequency.linearRampToValueAtTime(110, now + 0.35);
        g.gain.setValueAtTime(0.25, now); g.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        o.connect(g); g.connect(ctx.destination); o.start(now); o.stop(now + 0.4);
    } catch (e) {}
    vibrate([50, 50, 50]);
}

function playAchievementSound() {
    try {
        const ctx = getAudioContext(); const now = ctx.currentTime;
        [523.25, 659.25, 783.99].forEach((f, i) => {
            const o = ctx.createOscillator(); const g = ctx.createGain();
            o.type = 'sine'; o.frequency.setValueAtTime(f, now + i * 0.12);
            g.gain.setValueAtTime(0.22, now + i * 0.12); g.gain.exponentialRampToValueAtTime(0.01, now + i * 0.12 + 0.35);
            o.connect(g); g.connect(ctx.destination); o.start(now + i * 0.12); o.stop(now + i * 0.12 + 0.35);
        });
        [523.25, 659.25, 783.99].forEach(f => {
            const o = ctx.createOscillator(); const g = ctx.createGain();
            o.type = 'sine'; o.frequency.setValueAtTime(f, now + 0.5);
            g.gain.setValueAtTime(0.15, now + 0.5); g.gain.exponentialRampToValueAtTime(0.01, now + 0.9);
            o.connect(g); g.connect(ctx.destination); o.start(now + 0.5); o.stop(now + 0.9);
        });
    } catch (e) {}
    vibrate([100, 50, 100, 50, 200]);
}

function playPetSound() {
    try {
        const ctx = getAudioContext();
        if (!ctx || ctx.state === 'closed') return;
        const now = ctx.currentTime;
        
        // "Мя" — короткий высокий
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(650, now);
        osc1.frequency.linearRampToValueAtTime(850, now + 0.06);
        osc1.frequency.linearRampToValueAtTime(700, now + 0.12);
        gain1.gain.setValueAtTime(0.22, now);
        gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start(now);
        osc1.stop(now + 0.15);
        
        // "у" — протяжный низкий
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(480, now + 0.08);
        osc2.frequency.linearRampToValueAtTime(350, now + 0.35);
        gain2.gain.setValueAtTime(0.16, now + 0.08);
        gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(now + 0.08);
        osc2.stop(now + 0.4);
    } catch (e) {}
    vibrate(20);
}

function playMeowSound() {
    try {
        const ctx = getAudioContext();
        if (!ctx || ctx.state === 'closed') return;
        const now = ctx.currentTime;
        
        // Короткое "мя!"
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(700, now);
        osc1.frequency.linearRampToValueAtTime(900, now + 0.05);
        gain1.gain.setValueAtTime(0.2, now);
        gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start(now);
        osc1.stop(now + 0.12);
        
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(500, now + 0.06);
        osc2.frequency.linearRampToValueAtTime(380, now + 0.2);
        gain2.gain.setValueAtTime(0.14, now + 0.06);
        gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(now + 0.06);
        osc2.stop(now + 0.25);
    } catch (e) {}
}

function vibrate(pattern) {
    if (navigator.vibrate) {
        try { navigator.vibrate(pattern); } catch (e) {}
    }
}

export function spawnConfetti() {
    const c = document.createElement('div'); c.className = 'confetti-container'; document.body.appendChild(c);
    const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
    for (let i = 0; i < 12; i++) {
        const p = document.createElement('span'); p.className = 'confetti-piece'; p.textContent = '●';
        p.style.left = Math.random() * 100 + '%'; p.style.top = -(Math.random() * 100) + 'px';
        p.style.color = colors[Math.floor(Math.random() * colors.length)];
        p.style.fontSize = (Math.random() * 10 + 6) + 'px';
        p.style.animationDelay = Math.random() * 0.3 + 's';
        p.style.animationDuration = (Math.random() * 0.4 + 0.5) + 's';
        c.appendChild(p);
    }
    setTimeout(() => c.remove(), 1200);
}

export function spawnLeaves() {
    const c = document.createElement('div'); c.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1000;';
    document.body.appendChild(c);
    const leaves = ['🍃', '🌿', '🍂', '🍁', '🌱', '✨'];
    for (let i = 0; i < 20; i++) {
        const l = document.createElement('span'); l.className = 'leaf-particle'; l.textContent = leaves[Math.floor(Math.random() * leaves.length)];
        l.style.left = Math.random() * 100 + '%'; l.style.top = -(Math.random() * 50) + 'px';
        l.style.fontSize = (Math.random() * 16 + 10) + 'px';
        l.style.animationDelay = Math.random() * 0.8 + 's';
        l.style.animationDuration = (Math.random() * 1.5 + 2) + 's';
        c.appendChild(l);
    }
    setTimeout(() => c.remove(), 3500);
}

export function playSound(type) {
    switch (type) {
        case 'correct': playCorrectSound(); break;
        case 'wrong': playWrongSound(); break;
        case 'achievement': playAchievementSound(); spawnConfetti(); break;
        case 'pet': playPetSound(); break;
        case 'meow': playMeowSound(); break;
    }
}

export function spawnGems(count, startX, startY, targetEl) {
    const target = targetEl || document.getElementById('gemCount');
    if (!target) return;
    
    const targetRect = target.getBoundingClientRect();
    const targetX = targetRect.left + targetRect.width / 2;
    const targetY = targetRect.top + targetRect.height / 2;
    
    for (let i = 0; i < count; i++) {
        const gem = document.createElement('span');
        gem.textContent = '💎';
        gem.style.cssText = `
            position: fixed;
            left: ${startX}px;
            top: ${startY}px;
            font-size: 16px;
            pointer-events: none;
            z-index: 1000;
            transition: all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            opacity: 1;
        `;
        document.body.appendChild(gem);
        
        requestAnimationFrame(() => {
            gem.style.left = targetX + 'px';
            gem.style.top = targetY + 'px';
            gem.style.opacity = '0';
            gem.style.transform = 'scale(0.3)';
        });
        
        setTimeout(() => gem.remove(), 900);
    }
}
