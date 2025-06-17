# 🎬 Radar Cine

O **Radar Cine** é uma aplicação web feita em **React.js** que consome a API da TMDB para listar filmes de ação em português, exibindo pôsteres, títulos e detalhes de cada filme.

## 🌐 Link para acessar o projeto online

Veja funcionando no Vercel: [https://radar-cine.vercel.app/](https://radar-cine.vercel.app/)

## 🚀 Funcionalidades

- Listagem de filmes do gênero ação (10 páginas de resultados)
- Exibição de pôster, título e link para detalhes do filme
- Carregamento dinâmico e indicação de carregamento
- Navegação via React Router

## 🛠 Tecnologias usadas

- React.js (Hooks: useState, useEffect)
- React Router DOM
- Axios (para requisições HTTP)
- CSS customizado

## 📂 Estrutura resumida do projeto

src/
├── components/
│ └── Acao.jsx
├── services/
│ └── api.js
├── App.js
└── index.js

bash
Copiar
Editar

## ⚙️ Como rodar localmente

1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/radar-cine.git
cd radar-cine
Instale as dependências

bash
Copiar
Editar
npm install
Configure sua chave da API TMDB

Crie um arquivo .env na raiz com:

ini
Copiar
Editar
REACT_APP_TMDB_KEY=sua_chave_aqui
Rode a aplicação

bash
Copiar
Editar
npm start
Sobre a API
O projeto usa a API pública do TMDB para buscar os filmes de ação em português. É necessário criar uma conta e obter a API key gratuita no site oficial.

Autor
Gabriel Fellipe Rodrigues Machado
