const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Listar categorias de um usuário
router.get('/:idUsuario', (req, res) => {
  const { idUsuario } = req.params;

  db.all(
    `SELECT idCategoria, nome FROM CATEGORIA WHERE idUsuario = ?`,
    [idUsuario],
    (err, rows) => {
      if (err) return res.status(500).json({ erro: err.message });
      res.json(rows);
    }
  );
});

module.exports = router;