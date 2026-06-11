import { avisos } from '../data/avisos.js';
import { eyeIcon, thumbsUpIcon, formatDate } from './cards.js';

export function openCardModal(cardId) {
    const aviso = avisos.find(a => a.id === cardId);
    if (!aviso) return;

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close" aria-label="Fechar">✕</button>
            <article class="modal-card">
                <h2 class="modal-title">${aviso.title}</h2>
                <div class="modal-meta">
                    <p class="modal-author">${aviso.author}</p>
                    <p class="modal-date">${formatDate(aviso.date)}</p>
                </div>
                ${aviso.tags && aviso.tags.length > 0 ? `
                    <div class="modal-tags">
                        ${aviso.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                ` : ''}
                <p class="modal-description">${aviso.fullDescription}</p>
                <div class="modal-actions">
                    <button class="card-action" data-action="view" aria-label="Visualizações">
                        ${eyeIcon()}
                        <span>${aviso.views}</span>
                    </button>
                    <button class="card-action ${aviso.liked ? 'liked' : ''}" data-action="like" aria-label="Curtir">
                        ${thumbsUpIcon(aviso.liked)}
                        <span>${aviso.likes}</span>
                    </button>
                </div>
            </article>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');

    const closeModal = () => {
        modal.remove();
        document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    const likeBtn = modal.querySelector('.card-action[data-action="like"]');
    const viewBtn = modal.querySelector('.card-action[data-action="view"]');

    likeBtn.addEventListener('click', () => {
        aviso.liked = !aviso.liked;
        aviso.likes += aviso.liked ? 1 : -1;
        const span = likeBtn.querySelector('span');
        span.textContent = aviso.likes;
        likeBtn.classList.toggle('liked');
        likeBtn.innerHTML = `${thumbsUpIcon(aviso.liked)}<span>${aviso.likes}</span>`;
    });

    viewBtn.addEventListener('click', () => {
        aviso.views += 1;
        viewBtn.querySelector('span').textContent = aviso.views;
    });
}

export function attachCardClickListeners(renderCards) {
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.card-action')) {
                const id = parseInt(card.dataset.id, 10);
                openCardModal(id);
            }
        });
    });

    document.querySelectorAll('.card-action[data-action="like"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = e.currentTarget.closest('.card');
            const id = parseInt(card.dataset.id, 10);
            const aviso = avisos.find(a => a.id === id);
            aviso.liked = !aviso.liked;
            aviso.likes += aviso.liked ? 1 : -1;
            renderCards();
        });
    });

    document.querySelectorAll('.card-action[data-action="view"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = e.currentTarget.closest('.card');
            const id = parseInt(card.dataset.id, 10);
            const aviso = avisos.find(a => a.id === id);
            aviso.views += 1;
            renderCards();
        });
    });
}
