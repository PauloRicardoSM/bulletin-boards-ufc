import { allTags } from '../data/avisos.js';

export function initTagFilters(onTagFilterChange) {
    const tagFilterBtn = document.getElementById('tagFilterBtn');
    const tagFilterDropdown = document.getElementById('tagFilterDropdown');
    const closeTagFilter = document.getElementById('closeTagFilter');
    const tagFilterContent = document.getElementById('tagFilterContent');

    if (!tagFilterBtn || !tagFilterDropdown) return;

    renderTagFilters(tagFilterContent);

    tagFilterBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        tagFilterDropdown.style.display = tagFilterDropdown.style.display === 'none' ? 'block' : 'none';
    });

    closeTagFilter.addEventListener('click', () => {
        tagFilterDropdown.style.display = 'none';
    });

    tagFilterDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('#tagFilterBtn') && !e.target.closest('.tag-filter-dropdown')) {
            tagFilterDropdown.style.display = 'none';
        }
    });

    tagFilterContent.addEventListener('change', (e) => {
        if (e.target.classList.contains('tag-checkbox')) {
            const selectedTags = Array.from(document.querySelectorAll('.tag-checkbox:checked'))
                .map(cb => cb.value);
            onTagFilterChange(selectedTags);
        }
    });
}

function renderTagFilters(container) {
    container.innerHTML = '';

    allTags.forEach(tag => {
        const label = document.createElement('label');
        label.className = 'tag-filter-label';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'tag-checkbox';
        checkbox.value = tag;

        const span = document.createElement('span');
        span.textContent = tag;

        label.appendChild(checkbox);
        label.appendChild(span);
        container.appendChild(label);
    });
}

export function getSelectedTags() {
    return Array.from(document.querySelectorAll('.tag-checkbox:checked'))
        .map(cb => cb.value);
}

export function clearSelectedTags() {
    document.querySelectorAll('.tag-checkbox').forEach(cb => {
        cb.checked = false;
    });
}
