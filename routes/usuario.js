const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Cadastro
router.post('/cadastro', (req, res) => {
  const { nome, email, senha, provedorLogin } = req.body;
  db.run(
    `INSERT INTO USUARIO (nome, email, senha, provedorLogin) VALUES (?, ?, ?, ?)`,
    [nome, email, senha, provedorLogin],
    function (err) {
      if (err) return res.status(400).json({ erro: err.message });
      res.json({ idUsuario: this.lastID, nome, email });
    }
  );
});

// Login
router.post('/login', (req, res) => {
  const { email, senha } = req.body;
  db.get(
    `SELECT * FROM USUARIO WHERE email = ? AND senha = ?`,
    [email, senha],
    (err, row) => {
      if (err) return res.status(400).json({ erro: err.message });
      if (!row) return res.status(401).json({ erro: 'Credenciais inválidas' });
      res.json({ idUsuario: row.idUsuario, nome: row.nome, email: row.email });
    }
  );
});

module.exports = router;