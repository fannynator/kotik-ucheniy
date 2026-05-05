import { $, $$, showToast } from '../utils.js';
import { getCurrentSkills, state } from '../state.js';
import { startLesson } from './lesson.js';

export function renderSkillTree() {
    const skills = getCurrentSkills();
    const container = $('#skillTree');
    if (!container) return;

    // Находим первый заблокированный навык
    const firstLockedIndex = skills.findIndex(s => s.status === 'locked');
    let prevCompletedName = '';
    if (firstLockedIndex > 0) {
        prevCompletedName = skills[firstLockedIndex - 1].name;
    }

    container.innerHTML = '<div class="skill-path">' + skills.map((s, i) => {
        const nc = s.status === 'completed' ? 'completed' : s.status === 'current' ? 'current' : 'locked';
        const cc = s.status === 'locked' ? 'locked' : s.status === 'completed' ? 'completed' : 'current';
        const se = s.status === 'completed' ? '✅' : s.status === 'current' ? '▶️' : '🔒';
        
        // Текст статуса
        let pt;
        if (s.status === 'completed') {
            pt = 'Пройдено';
        } else if (s.status === 'current') {
            pt = s.progress > 0 ? `${s.progress}%` : 'Готов к старту 🚀';
        } else {
            // Заблокирован
            if (i === firstLockedIndex && prevCompletedName) {
                pt = `Пройди «${prevCompletedName}»`;
            } else {
                pt = '';
            }
        }
        
        // Прогресс-бар показываем только для разблокированных
        const progressBar = s.status !== 'locked' ? 
            `<div class="skill-progress-bar"><div class="skill-progress-fill" style="width:${s.progress}%;background:${s.color};"></div></div>` : 
            '';
        
        return `<div class="skill-node ${nc}">
            <div class="skill-card ${cc}" data-id="${s.id}" data-status="${s.status}">
                <div class="skill-icon-box" style="background:${s.color}15;color:${s.color};">${s.icon}</div>
                <div class="skill-info">
                    <div class="skill-name">${s.name}</div>
                    <div class="skill-progress-text">${pt}</div>
                    ${progressBar}
                </div>
                <div class="skill-badge">${se}</div>
            </div>
        </div>`;
    }).join('') + '</div>';

    $$('#skillTree .skill-card').forEach(card => {
        card.addEventListener('click', () => {
            const st = card.dataset.status;
            const id = card.dataset.id;
            if (st === 'locked') {
                // Находим название предыдущего навыка
                const idx = skills.findIndex(s => s.id === id);
                if (idx > 0) {
                    const prevName = skills[idx - 1].name;
                    showToast('🔒', `Пройди «${prevName}» сначала!`, $('#toast'));
                } else {
                    showToast('🔒', 'Навык заблокирован', $('#toast'));
                }
            } else if (st === 'completed') {
                showToast('✅', 'Уже пройден!', $('#toast'));
            } else {
                startLesson(id);
            }
        });
    });
}
