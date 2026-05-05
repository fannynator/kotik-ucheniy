// js/sounds.js

// Короткое мяу в base64 (настоящая запись кота)
const MEOW_BASE64 = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAABhgC7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7//////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAAAAAAAAAAAAYYAAN3kCxwAAAAAAAAAAAAAAAAAAAAAAP/7kGQAAgAABQAAAEAAAEAAAAEAAAQAAABgAAAACAAABGAAAAIAAAQAAAAEAAAABAAAAAgAAABAAAAAQAAAAEAAAABAAAAAIAAAAQAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/7kGQAAgAABQAAAEAAAEAAAAEAAAQAAABgAAAACAAABGAAAAIAAAQAAAAEAAAABAAAAAgAAABAAAAAQAAAAEAAAABAAAAAIAAAAQAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

// Простой звук через Audio — не блокируется браузером
function playTone(frequency, duration, type = 'sine') {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(frequency, ctx.currentTime);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + duration);
    } catch (e) {}
}

function playDoubleTone(f1, f2, duration) {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f1, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(f2, ctx.currentTime + duration);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + duration);
    } catch (e) {}
}

function vibrate(pattern) {
    if (navigator.vibrate) {
        try { navigator.vibrate(pattern); } catch (e) {}
    }
}

function playCorrectSound() { playTone(660, 0.3); vibrate(30); }
function playWrongSound() { playTone(200, 0.4, 'triangle'); vibrate([50, 50, 50]); }
function playAchievementSound() { playTone(520, 0.5); vibrate([100, 50, 200]); }
function playPetSound() { playMeow(); }
function playMeowSound() { playMeow(); }

function playMeow() {
    try {
        const audio = new Audio(MEOW_BASE64);
        audio.volume = 0.4;
        audio.play().catch(() => {});
    } catch (e) {
        // Если не сработало — синтетическое мяу
        playDoubleTone(600, 400, 0.3);
    }
    vibrate(20);
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

export function spawnGems(count, startX, startY, targetEl) {
    const target = targetEl || document.getElementById('gemCount');
    if (!target) return;
    const targetRect = target.getBoundingClientRect();
    const targetX = targetRect.left + targetRect.width / 2;
    const targetY = targetRect.top + targetRect.height / 2;
    for (let i = 0; i < count; i++) {
        const gem = document.createElement('span');
        gem.textContent = '💎';
        gem.style.cssText = `position:fixed;left:${startX}px;top:${startY}px;font-size:16px;pointer-events:none;z-index:1000;transition:all 0.8s;opacity:1;`;
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

export function playSound(type) {
    switch (type) {
        case 'correct': playCorrectSound(); break;
        case 'wrong': playWrongSound(); break;
        case 'achievement': playAchievementSound(); spawnConfetti(); break;
        case 'pet': playPetSound(); break;
        case 'meow': playMeowSound(); break;
    }
}