const express = require('express');
const cors = require('cors');
const itemRoutes = require('./routes/itemRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Rota de teste / health check
app.get('/', (req, res) => {
  res.json({ message: 'API de Itens Recicláveis rodando!' });
});

// Rotas do CRUD
app.use('/items', itemRoutes);

// Em hosts como Render/Railway, a porta vem da variável de ambiente PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
