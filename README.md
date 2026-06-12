# Bulletin Boards UFC

Plataforma colaborativa para compartilhamento de avisos e oportunidades na comunidade acadêmica da Universidade Federal do Ceará.

## 📁 Estrutura do Projeto

```
trabalho/
├── index.html                      # Arquivo principal
├── README.md                       # Este arquivo
├── src/
│   ├── js/
│   │   ├── main.js                # Inicializa e orquestra todo o app
│   │   ├── data/
│   │   │   └── avisos.js          # Dados dos avisos (export como módulo)
│   │   └── modules/
│   │       ├── cards.js           # Renderização de cards
│   │       ├── filters.js         # Lógica de filtros
│   │       ├── modal.js           # Modal de expansão de cards
│   │       └── navbar.js          # Navegação dinâmica (SPA)
│   ├── css/
│   │   ├── index.css              # Arquivo principal (importa todos)
│   │   ├── base/
│   │   │   ├── variables.css      # Cores, espaçamentos, variáveis globais
│   │   │   ├── reset.css          # Reset e normalizações
│   │   │   └── typography.css     # Tipografia geral
│   │   ├── components/
│   │   │   ├── header.css         # Estilos do cabeçalho
│   │   │   ├── cards.css          # Cards e layout principal
│   │   │   ├── buttons.css        # Todos os botões
│   │   │   ├── modal.css          # Modal de expansão
│   │   │   └── forms.css          # Formulários
│   │   └── responsive.css         # Media queries
│   └── assets/
│       └── ideas.md               # Ideias e melhorias do projeto
├── script.js.bak                  # Backup do script original
└── styles.css.bak                 # Backup do CSS original
```

## 🎯 Funcionalidades

- Sistema de curtidas e visualizações
- Ordenação dinâmica dos avisos
- Busca em tempo real
- Modal para visualização completa
- Navegação SPA sem recarregamento

## 🚀 Como Usar

### Desenvolvimento Local

```bash
# Inicie um servidor HTTP local (Python 3)
python3 -m http.server 8000

# Ou use outra ferramenta:
# npx http-server
# php -S localhost:8000
```

Acesse `http://0.0.0.0:8000` no navegador.

### Disponibilidade web

Acesse o site [aqui](https://pauloricardosm.github.io/bulletin-boards-ufc/).

### Estrutura de Dados (avisos.js)

Cada aviso possui:
- `id`: Identificador único
- `title`: Título do aviso
- `author`: Autor do aviso
- `description`: Descrição curta (mostrada no card)
- `fullDescription`: Descrição completa (mostrada no modal)
- `views`: Número de visualizações
- `likes`: Número de curtidas
- `date`: Data de publicação (YYYY-MM-DD)
- `liked`: Boolean indicando se foi curtido

### Adicionar Novos Avisos

Edite `src/js/data/avisos.js` e adicione um novo objeto ao array:

```javascript
{
    id: 7,
    title: "Novo Aviso",
    author: "Seu Nome",
    description: "Descrição curta",
    fullDescription: "Descrição completa",
    views: 0,
    likes: 0,
    date: "2026-06-11",
    liked: false
}
```

## 📱 Responsividade

- **Desktop**: 3 colunas de cards
- **Tablet (≤ 1024px)**: 2 colunas, sidebar abaixo
- **Mobile (≤ 720px)**: 1 coluna, botão publicar ao lado da busca
- **Phones pequenos (≤ 480px)**: Otimizado para telas pequenas

## 🛠️ Arquitetura

### JavaScript Modular

O projeto usa módulos ES6 (`import`/`export`) para melhor organização:

- **main.js**: Orquestra e inicializa tudo
- **modules/cards.js**: Renderização e lógica de cards
- **modules/filters.js**: Gerencia filtros
- **modules/modal.js**: Modal de expansão
- **modules/navbar.js**: Navegação SPA

### CSS Modular

O CSS está organizado por componentes para facilitar manutenção:

- **base/**: Reset, variáveis e tipografia global
- **components/**: Estilos de cada componente
- **responsive.css**: Todos os media queries centralizados

## 🔧 Próximos Passos Sugeridos

- [ ] Implementar backend para persistência de dados
- [ ] Autenticação de usuários
- [ ] Edição/exclusão de avisos
- [ ] Comentários em avisos
- [ ] Temas escuros/claros
- [ ] PWA (Progressive Web App)

## 📄 Arquivos de Backup

Os arquivos originais foram mantidos como backup:
- `script.js.bak` - Script original
- `styles.css.bak` - CSS original

## 📝 Notas

- Todos os dados são armazenados em memória (recarregar a página reseta tudo)
- O projeto é estático e não possui backend
- Modal usa `position: fixed` com `z-index: 1000`
- Navegação SPA não altera a URL (sem router formal)

## 📜 Licença

Projeto desenvolvido para fins acadêmicos.

<h2>👥 Equipe</h2>

<table>
<tr>
<td align="center">
<a href="https://github.com/PauloRicardoSM">
<img src="https://github.com/PauloRicardoSM.png" width="100px"><br>
<b>Paulo Ricardo</b>
</a>
</td>

<td align="center">
<a href="https://github.com/kill-dere">
<img src="https://github.com/kill-dere.png" width="100px"><br>
<b>Antônio Kildere</b>
</a>
</td>

<td align="center">
<a href="https://github.com/brendonGMS">
<img src="https://github.com/brendonGMS.png" width="100px"><br>
<b>Francisco Breno</b>
</a>
</td>

<td align="center">
<a href="https://github.com/Eros-afk">
<img src="https://github.com/Eros-afk.png" width="100px"><br>
<b>Eros Ryan</b>
</a>
</td>
</tr>

<tr>
<td align="center">
<a href="https://github.com/Zagreus1447">
<img src="https://github.com/Zagreus1447.png" width="100px"><br>
<b>Azael Frota</b>
</a>
</td>

<td align="center">
<a href="https://github.com/tayalvess">
<img src="https://github.com/tayalvess.png" width="100px"><br>
<b>Taynara Alves</b>
</a>
</td>

<td align="center">
<a href="https://github.com/danielneco">
<img src="https://github.com/danielneco.png" width="100px"><br>
<b>Daniel Neco Silva</b>
</td>

<td align="center">
<a href="https://github.com/anarchyysm">
<img src="https://github.com/anarchyysm.png" width="100px"><br>
<b>Emanuel Magalhães</b>
</a>
</td>
</tr>
</table>