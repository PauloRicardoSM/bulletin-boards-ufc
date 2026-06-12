import { avisos } from '../data/avisos.js';

export function eyeIcon() {
    return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
    </svg>`;
}

export function thumbsUpIcon(filled) {
    if (filled) {
        return `<svg class="icon" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M7 10v12"/>
            <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H7V10l4.34-7.66a1.93 1.93 0 0 1 3.5 1.5z"/>
        </svg>`;
    }
    return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M7 10v12"/>
        <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H7V10l4.34-7.66a1.93 1.93 0 0 1 3.5 1.5z"/>
    </svg>`;
}

export function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export function renderCards(filtered, sorted, cardsGrid) {
    cardsGrid.innerHTML = sorted.map(a => `
        <article class="card" data-id="${a.id}">
            <h3 class="card-title">${a.title}</h3>
            <p class="card-author">${a.author}</p>
            <p class="card-date">${formatDate(a.date)}</p>
            ${a.tags && a.tags.length > 0 ? `
                <div class="card-tags">
                    ${a.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            ` : ''}
            <p class="card-description">${a.description}</p>
            <div class="card-actions">
                <button class="card-action" data-action="view" aria-label="Visualizações">
                    ${eyeIcon()}
                    <span>${a.views}</span>
                </button>
                <button class="card-action ${a.liked ? 'liked' : ''}" data-action="like" aria-label="Curtir">
                    ${thumbsUpIcon(a.liked)}
                    <span>${a.likes}</span>
                </button>
            </div>
        </article>
    `).join('');

    if (sorted.length === 0) {
        cardsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; padding: 40px; opacity: 0.6;">Nenhum aviso encontrado.</p>`;
    }
}

export function getFilteredAndSorted(currentSearch, currentFilter, selectedTags = []) {
    const filtered = avisos.filter(a => {
        const q = currentSearch.toLowerCase().trim();
        const matchesSearch = !q || a.title.toLowerCase().includes(q) || a.author.toLowerCase().includes(q);

        const matchesTags = selectedTags.length === 0 ||
            (a.tags && a.tags.some(tag => selectedTags.includes(tag)));

        return matchesSearch && matchesTags;
    });

    const sorted = [...filtered].sort((a, b) => {
        if (currentFilter === 'top') return b.likes - a.likes;
        return new Date(b.date) - new Date(a.date);
    });

    return { filtered, sorted };
}
