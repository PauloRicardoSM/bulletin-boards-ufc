import { avisos, allTags } from '../data/avisos.js';

export function openPublishModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content publish-modal">
            <button class="modal-close" aria-label="Fechar">✕</button>
            <h2 class="modal-title">Publicar no Mural</h2>

            <form class="publish-form">
                <div class="form-group">
                    <label for="pub-title">Título:</label>
                    <input type="text" id="pub-title" name="title" placeholder="Ex: Vaga de Monitoria" required>
                </div>

                <div class="form-group">
                    <label for="pub-content">Conteúdo:</label>
                    <textarea id="pub-content" name="content" placeholder="Descreva sua publicação..." rows="6" required></textarea>
                </div>

                <div class="form-group">
                    <label>Tags (selecione uma ou mais):</label>
                    <div class="tags-selector">
                        ${allTags.map(tag => `
                            <label class="tag-checkbox">
                                <input type="checkbox" value="${tag}" name="tags">
                                <span>${tag}</span>
                            </label>
                        `).join('')}
                    </div>
                </div>

                <div class="form-actions">
                    <button type="button" class="btn-discard">Descartar</button>
                    <button type="submit" class="btn-publish-submit">Publicar</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    const discardBtn = modal.querySelector('.btn-discard');
    const form = modal.querySelector('.publish-form');

    const closeModal = () => {
        modal.remove();
        document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    discardBtn.addEventListener('click', closeModal);

    modal.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const title = document.getElementById('pub-title').value;
        const content = document.getElementById('pub-content').value;
        const tagCheckboxes = document.querySelectorAll('.tag-checkbox input:checked');
        const tags = Array.from(tagCheckboxes).map(cb => cb.value);

        if (!title.trim() || !content.trim()) {
            alert('Por favor, preencha título e conteúdo.');
            return;
        }

        if (tags.length === 0) {
            alert('Por favor, selecione pelo menos uma tag.');
            return;
        }

        const newAviso = {
            id: Math.max(...avisos.map(a => a.id), 0) + 1,
            title: title,
            author: "Usuário",
            description: content.substring(0, 100) + (content.length > 100 ? '...' : ''),
            fullDescription: content,
            views: 0,
            likes: 0,
            date: new Date().toISOString().split('T')[0],
            liked: false,
            tags: tags
        };

        avisos.unshift(newAviso);

        closeModal();

        window.dispatchEvent(new Event('aviso-published'));
    });
}
