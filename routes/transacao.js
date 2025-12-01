const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Criar nova transação
router.post('/nova', (req, res) => {
  const { tipo, valor, idCategoria, descricao, data, idUsuario } = req.body;

  if (!tipo || !valor || !data || !idUsuario || !idCategoria) {
    return res.status(400).json({ erro: 'Campos obrigatórios ausentes' });
  }

  db.run(
    `INSERT INTO TRANSACAO (tipo, valor, idCategoria, descricao, data, idUsuario)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [tipo, valor, idCategoria, descricao || '', data, idUsuario],
    function (err) {
      if (err) return res.status(500).json({ erro: err.message });
      res.json({
        idTransacao: this.lastID,
        tipo,
        valor,
        idCategoria,
        descricao,
        data,
        idUsuario,
      });
    }
  );
});

// Listar transações de um usuário
router.get('/:idUsuario', (req, res) => {
  const { idUsuario } = req.params;

  db.all(
    `SELECT * FROM TRANSACAO WHERE idUsuario = ? ORDER BY data DESC`,
    [idUsuario],
    (err, rows) => {
      if (err) return res.status(500).json({ erro: err.message });
      res.json(rows);
    }
  );
});

// Atualizar transação
router.put('/:idTransacao', (req, res) => {
  const { idTransacao } = req.params;
  const { tipo, valor, idCategoria, descricao, data } = req.body;

  db.run(
    `UPDATE TRANSACAO SET tipo = ?, valor = ?, idCategoria = ?, descricao = ?, data = ?
     WHERE idTransacao = ?`,
    [tipo, valor, idCategoria, descricao, data, idTransacao],
    function (err) {
      if (err) return res.status(500).json({ erro: err.message });
      if (this.changes === 0) return res.status(404).json({ erro: 'Transação não encontrada' });
      res.json({ mensagem: 'Transação atualizada com sucesso' });
    }
  );
});

// Deletar transação
router.delete('/:idTransacao', (req, res) => {
  const { idTransacao } = req.params;

  db.run(
    `DELETE FROM TRANSACAO WHERE idTransacao = ?`,
    [idTransacao],
    function (err) {
      if (err) return res.status(500).json({ erro: err.message });
      if (this.changes === 0) return res.status(404).json({ erro: 'Transação não encontrada' });
      res.json({ mensagem: 'Transação excluída com sucesso' });
    }
  );
});

module.exports = router;