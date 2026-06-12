export function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;

            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            loadPage(page);
        });
    });
}

export function loadPage(page) {
    const main = document.querySelector('.content');
    const sidebar = document.querySelector('.sidebar');

    const pages = {
        'home': getHomePage(),
        'about': getAboutPage(),
        'contact': getContactPage()
    };

    if (pages[page]) {
        main.innerHTML = pages[page];

        // Mostrar/ocultar sidebar baseado na página
        if (page === 'home') {
            sidebar.style.display = 'block';
            window.dispatchEvent(new Event('page-changed'));
        } else {
            sidebar.style.display = 'none';
        }
    }
}

function getHomePage() {
    return `
        <div class="toolbar">
            <div class="search-wrapper">
                <input type="text" id="searchInput" class="search-input" placeholder="Buscar">
                <span class="search-icon">⌕</span>
            </div>
            <div class="filters">
                <button class="filter-btn active" data-filter="ultimos">Últimos</button>
                <button class="filter-btn" data-filter="top">Top</button>
            </div>
            <div class="tag-filter-wrapper">
                <button class="tag-filter-btn" id="tagFilterBtn">🏷️ Tags</button>
                <div id="tagFilterDropdown" class="tag-filter-dropdown" style="display: none;">
                    <div class="tag-filter-header">
                        <h4>Filtrar por tags</h4>
                        <button class="tag-filter-close" id="closeTagFilter">&times;</button>
                    </div>
                    <div class="tag-filter-content" id="tagFilterContent">
                        <!-- tags injetadas via JS -->
                    </div>
                </div>
            </div>
            <button class="btn-publish-mobile">Publicar no mural</button>
        </div>

        <div class="cards-grid" id="cardsGrid">
            <!-- cards injetados via JS -->
        </div>

        <div class="pagination">
            <button class="btn-pagination" id="loadMoreBtn">Mais antigos</button>
        </div>
    `;
}

function getAboutPage() {
    return `
        <div class="page-content">
            <h1>Sobre Nós</h1>
            <div class="page-body">
                <h2>Bulletin Boards UFC</h2>
                <p>O Bulletin Boards UFC é uma plataforma colaborativa desenvolvida para a comunidade acadêmica da Universidade Federal do Ceará.</p>

                <h3>Nossa Missão</h3>
                <p>Facilitar a comunicação entre estudantes, professores e grupos de pesquisa, criando um espaço centralizado para compartilhamento de oportunidades, eventos e informações importantes.</p>

                <h3>O Que Oferecemos</h3>
                <ul>
                    <li>📢 Espaço para publicação de avisos e comunicados</li>
                    <li>🔍 Busca e filtros avançados</li>
                    <li>❤️ Sistema de engajamento com curtidas</li>
                    <li>📊 Visualização de popularidade de posts</li>
                </ul>

                <h3>Nossa Equipe</h3>
                <div class="team-grid">
                    <div class="team-member">
                        <a href="https://github.com/PauloRicardoSM" target="_blank">
                            <img src="https://github.com/PauloRicardoSM.png" alt="Paulo Ricardo" class="team-avatar">
                            <p class="team-name">Paulo Ricardo</p>
                        </a>
                    </div>
                    <div class="team-member">
                        <a href="https://github.com/kill-dere" target="_blank">
                            <img src="https://github.com/kill-dere.png" alt="Antônio Kildere" class="team-avatar">
                            <p class="team-name">Antônio Kildere</p>
                        </a>
                    </div>
                    <div class="team-member">
                        <a href="https://github.com/brendonGMS" target="_blank">
                            <img src="https://github.com/brendonGMS.png" alt="Francisco Breno" class="team-avatar">
                            <p class="team-name">Francisco Breno</p>
                        </a>
                    </div>
                    <div class="team-member">
                        <a href="https://github.com/Eros-afk" target="_blank">
                            <img src="https://github.com/Eros-afk.png" alt="Eros Ryan" class="team-avatar">
                            <p class="team-name">Eros Ryan</p>
                        </a>
                    </div>
                    <div class="team-member">
                        <a href="https://github.com/Zagreus1447" target="_blank">
                            <img src="https://github.com/Zagreus1447.png" alt="Azael Frota" class="team-avatar">
                            <p class="team-name">Azael Frota</p>
                        </a>
                    </div>
                    <div class="team-member">
                        <a href="https://github.com/tayalvess" target="_blank">
                            <img src="https://github.com/tayalvess.png" alt="Taynara Alves" class="team-avatar">
                            <p class="team-name">Taynara Alves</p>
                        </a>
                    </div>
                    <div class="team-member">
                        <a href="https://github.com/danielneco" target="_blank">
                            <img src="https://github.com/danielneco.png" alt="Daniel Neco Silva" class="team-avatar">
                            <p class="team-name">Daniel Neco Silva</p>
                        </a>
                    </div>
                    <div class="team-member">
                        <a href="https://github.com/anarchyysm" target="_blank">
                            <img src="https://github.com/anarchyysm.png" alt="Emanuel Magalhães" class="team-avatar">
                            <p class="team-name">Emanuel Magalhães</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getContactPage() {
    return `
        <div class="page-content">
            <h1>Contato</h1>
            <div class="page-body">
                <p>Tem alguma dúvida ou sugestão? Entre em contato conosco!</p>

                <form class="contact-form">
                    <div class="form-group">
                        <label for="name">Nome:</label>
                        <input type="text" id="name" name="name" required>
                    </div>

                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" required>
                    </div>

                    <div class="form-group">
                        <label for="subject">Assunto:</label>
                        <input type="text" id="subject" name="subject" required>
                    </div>

                    <div class="form-group">
                        <label for="message">Mensagem:</label>
                        <textarea id="message" name="message" rows="5" required></textarea>
                    </div>

                    <button type="submit" class="btn-submit">Enviar Mensagem</button>
                </form>

                <div class="contact-info">
                    <h3>Outras Formas de Contato</h3>
                    <p><strong>Email:</strong> bulletin@ufc.br</p>
                    <p><strong>Telefone:</strong> (85) 3366-9000</p>
                    <p><strong>Campus:</strong> Universidade Federal do Ceará</p>
                </div>
            </div>
        </div>
    `;
}
