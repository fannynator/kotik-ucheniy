// js/sounds.js

// Звуки через HTML5 Audio — работает всегда и везде
const audioCache = {};

function getAudio(type) {
    if (audioCache[type]) return audioCache[type];
    
    let frequency = 440;
    let duration = 0.3;
    let waveType = 'sine';
    
    switch (type) {
        case 'correct':
            frequency = 660; duration = 0.3; waveType = 'sine';
            break;
        case 'wrong':
            frequency = 200; duration = 0.4; waveType = 'triangle';
            break;
        case 'achievement':
            frequency = 520; duration = 0.5; waveType = 'sine';
            break;
        case 'pet':
            frequency = 550; duration = 0.25; waveType = 'sine';
            break;
        case 'meow':
            frequency = 700; duration = 0.2; waveType = 'sine';
            break;
    }
    
    // Генерируем WAV-подобный звук через OscillatorNode
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = waveType;
        osc.frequency.setValueAtTime(frequency, ctx.currentTime);
        if (type === 'pet' || type === 'meow') {
            osc.frequency.linearRampToValueAtTime(frequency * 1.3, ctx.currentTime + duration * 0.6);
            osc.frequency.linearRampToValueAtTime(frequency * 0.8, ctx.currentTime + duration);
        }
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
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

function playCorrectSound() { getAudio('correct'); vibrate(30); }
function playWrongSound() { getAudio('wrong'); vibrate([50, 50, 50]); }
function playAchievementSound() { getAudio('achievement'); vibrate([100, 50, 200]); }
function playPetSound() { getAudio('pet'); vibrate(20); }
function playMeowSound() { getAudio('meow'); }

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