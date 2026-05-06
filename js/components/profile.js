// js/components/profile.js

import { $ } from '../utils.js';
import { state, resetAllProgress } from '../state.js';
import { SUBJECTS } from '../config.js';
import { renderSkillTree } from './skillTree.js';
import { updateStats } from '../app.js';

export function renderProfile() {
    const im = state.subject === SUBJECTS.MATH;
    const done = (state.storiesCompleted.math ? 1 : 0) + (state.storiesCompleted.rus1 ? 1 : 0) + (state.storiesCompleted.rus2 ? 1 : 0);
    const def = state.traps.reduce((s, t) => s + t.defuses, 0);
    const unl = Object.values(state.achievements).filter(a => a.unlocked).length;
    const total = Object.values(state.achievements).length;

    let html = `
    <div class="profile-header ${im ? 'math-prof' : 'rus-prof'}">
        <div class="profile-cat">${im ? '🐱' : '😺'}</div>
        <div class="profile-name">Кот Учёный</div>
        <div style="font-size:11px;color:var(--text-light);">${im ? 'Математик' : 'Филолог'}</div>
        <div class="profile-stats">
            <div class="profile-stat">
                <div class="profile-stat-val">${done}</div>
                <div class="profile-stat-label">Историй</div>
            </div>
            <div class="profile-stat">
                <div class="profile-stat-val">${def}</div>
                <div class="profile-stat-label">Ловушек</div>
            </div>
            <div class="profile-stat">
                <div class="profile-stat-val">${unl}/${total}</div>
                <div class="profile-stat-label">Ачивок</div>
            </div>
        </div>
    </div>

    <div style="font-weight:800;color:var(--text);margin-bottom:10px;display:flex;align-items:center;gap:6px;">
        <span>🏆</span> Достижения
    </div>
    <div class="ach-grid">`;

    Object.values(state.achievements).forEach(a => {
        const cls = a.unlocked ? 'unlocked' : 'locked';
        const icon = a.unlocked ? a.name.split(' ')[0] : '🔒';
        const name = a.name.split(' ').slice(1).join(' ');
        html += `
        <div class="ach-item ${cls}">
            <div class="ach-icon">${icon}</div>
            <div class="ach-name">${name}</div>
            <div class="ach-desc">${a.desc}</div>
        </div>`;
    });

    html += `
    </div>
    <button class="reset-progress-btn" id="toggleThemeBtn" style="margin-bottom:8px;">🌙 Тёмная тема</button>
    <button class="reset-progress-btn" id="resetProgressBtn">🔄 Сбросить прогресс</button>`;

    $('#profileContent').innerHTML = html;

    // Переключатель темы
    const themeBtn = $('#toggleThemeBtn');
    if (themeBtn) {
        const isDark = document.body.classList.contains('dark-theme');
        themeBtn.textContent = isDark ? '☀️ Светлая тема' : '🌙 Тёмная тема';
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDarkNow = document.body.classList.contains('dark-theme');
            themeBtn.textContent = isDarkNow ? '☀️ Светлая тема' : '🌙 Тёмная тема';
            localStorage.setItem('kot_ucheniy_dark_theme', isDarkNow ? '1' : '0');
        });
    }

    // Сброс прогресса
    $('#resetProgressBtn').addEventListener('click', () => {
        if (confirm('Точно сбросить ВЕСЬ прогресс? Это нельзя отменить!')) {
            if (confirm('Последний шанс. Сбросить?')) {
                resetAllProgress();
                renderProfile();
                renderSkillTree();
                updateStats();
                const catSpeech = $('#catSpeech');
                const catBody = $('#catBody');
                if (catSpeech) catSpeech.textContent = 'Мур! Начинаем заново!';
                if (catBody) catBody.textContent = '🐱';
                document.getElementById('headerBar').className = 'header math-header';
                document.getElementById('catStage').className = 'cat-stage math-stage';
                document.getElementById('app').classList.remove('rus-mode');
            }
        }
    });
}