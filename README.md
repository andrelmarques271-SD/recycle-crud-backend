# API - Cadastro de Itens Recicláveis (Backend)

Backend REST (Node.js + Express + SQLite) para gerenciar o cadastro de itens recicláveis (criar, listar, editar e excluir).

## Estrutura

```
backend/
├── controllers/
│   └── itemController.js   # Lógica de cada rota (validações e respostas)
├── models/
│   ├── db.js                 # Conexão e criação da tabela SQLite
│   └── itemModel.js          # Queries SQL (acesso a dados)
├── routes/
│   └── itemRoutes.js         # Define as rotas /items
├── server.js                 # Servidor Express
├── package.json
└── .gitignore
```

## Rotas da API

| Método | Rota        | Descrição                     |
|--------|-------------|---------------------------------|
| GET    | /items      | Lista todos os itens             |
| GET    | /items/:id  | Busca um item por ID             |
| POST   | /items      | Cadastra um novo item            |
| PUT    | /items/:id  | Atualiza um item existente       |
| DELETE | /items/:id  | Remove um item                   |

### Campos do item

```json
{
  "name": "Garrafa PET 2L",
  "material": "plastico",
  "quantity": 5,
  "collection_point": "Ecoponto Centro",
  "collected": false
}
```

`material` aceita: `plastico`, `papel`, `vidro`, `metal`, `eletronico`, `organico`, `outro`.

## Rodando localmente

```bash
npm install
npm start
```

A API sobe em `http://localhost:3000` (ou na porta definida em `PORT`).

## Enviando para o GitHub

Dentro da pasta `backend`:

```bash
git init
git add .
git commit -m "Backend CRUD de itens recicláveis"
git branch -M main
git remote add origin https://github.com/andrelmarques271-SD/repositorio-crud-backend.git
git push -u origin main
```

## Deploy (para não rodar em localhost)

Recomendado: **Render** (free tier)

1. Suba este repositório no GitHub (passos acima)
2. Crie conta em https://render.com
3. **New +** → **Web Service** → conecte o repositório `repositorio-crud-backend`
4. Configurações:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Após o deploy, você terá uma URL pública, ex:
   `https://repositorio-crud-backend.onrender.com`

> ⚠️ O SQLite (`database.sqlite`) é apagado a cada novo deploy/reinício em hosts como Render (sistema de arquivos efêmero). Para este projeto (acadêmico) isso é aceitável. Se precisar de persistência real, migre para um banco Postgres (Render oferece um free tier).

## Conectando o app (frontend)

No projeto do frontend (Expo), edite `src/services/api.js` e troque `BASE_URL` pela URL pública gerada no deploy:

```js
const BASE_URL = 'https://repositorio-crud-backend.onrender.com';
```
