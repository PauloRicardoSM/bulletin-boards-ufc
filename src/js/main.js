import { avisos } from './data/avisos.js';
import { renderCards, getFilteredAndSorted, eyeIcon, thumbsUpIcon } from './modules/cards.js';
import { initFilters } from './modules/filters.js';
import { initTagFilters, getSelectedTags, clearSelectedTags } from './modules/tag-filters.js';
import { attachCardClickListeners } from './modules/modal.js';
import { initNavigation, loadPage } from './modules/navbar.js';
import { openPublishModal } from './modules/publish.js';

let currentFilter = 'ultimos';
let currentSearch = '';
let currentTagFilters = [];

function initializeApp() {
    loadPage('home');
    initNavigation();
    initializeHomeContent();
    setupEventListeners();
}

function initializeHomeContent() {
    renderAllCards();
    initFilters(handleFilterChange);
    initTagFilters(handleTagFilterChange);
    setupSearchInput();
    setupLoadMoreButton();
    setupPublishButton();
}

function renderAllCards() {
    const { filtered, sorted } = getFilteredAndSorted(currentSearch, currentFilter, currentTagFilters);
    const cardsGrid = document.getElementById('cardsGrid');
    renderCards(filtered, sorted, cardsGrid);
    attachCardClickListeners(renderAllCards);
}

function handleFilterChange(filter) {
    currentFilter = filter;
    renderAllCards();
}

function handleTagFilterChange(selectedTags) {
    currentTagFilters = selectedTags;
    renderAllCards();
}

function setupSearchInput() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value;
            renderAllCards();
        });
    }
}

function setupLoadMoreButton() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            loadMoreBtn.textContent = 'Carregando...';
            setTimeout(() => {
                loadMoreBtn.textContent = 'Mais antigos';
                alert('Não há mais avisos antigos para carregar.');
            }, 600);
        });
    }
}

function setupPublishButton() {
    const publishBtns = document.querySelectorAll('.btn-publish, .btn-publish-mobile');
    publishBtns.forEach(btn => {
        btn.addEventListener('click', openPublishModal);
    });
}

function setupEventListeners() {
    const ctaBtn = document.querySelector('.btn-cta');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', () => {
            loadPage('contact');
            document.querySelector('.nav-link[data-page="contact"]').click();
        });
    }

    window.addEventListener('page-changed', () => {
        currentFilter = 'ultimos';
        currentSearch = '';
        currentTagFilters = [];
        clearSelectedTags();
        initializeHomeContent();
    });

    window.addEventListener('aviso-published', () => {
        renderAllCards();
    });
}

document.addEventListener('DOMContentLoaded', initializeApp);

