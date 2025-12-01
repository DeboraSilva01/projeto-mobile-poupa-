const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// rotas
const usuarioRoutes = require('./routes/usuario');
const metaRoutes = require('./routes/meta');
const transacaoRoutes = require('./routes/transacao');
const categoriaRoutes = require('./routes/categoria');

app.use('/categorias', categoriaRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/meta', metaRoutes);
app.use('/transacao', transacaoRoutes);

app.get('/', (req, res) => {
  res.send('Servidor Poupa+ rodando 🚀');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});