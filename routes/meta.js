const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Criar nova meta
router.post('/nova', (req, res) => {
  const { descricao, valorObjetivo, prazo, idUsuario } = req.body;

  if (!descricao || !valorObjetivo || !prazo || !idUsuario) {
    return res.status(400).json({ erro: 'Preencha todos os campos obrigatórios' });
  }

  db.run(
    `INSERT INTO METAFINANCEIRA (descricao, valorObjetivo, prazo, progresso, idUsuario) 
     VALUES (?, ?, ?, ?, ?)`,
    [descricao, valorObjetivo, prazo, 0, idUsuario],
    function (err) {
      if (err) return res.status(500).json({ erro: err.message });
      res.json({
        idMeta: this.lastID,
        descricao,
        valorObjetivo,
        prazo,
        progresso: 0,
        idUsuario,
      });
    }
  );
});

// Listar metas de um usuário
router.get('/:idUsuario', (req, res) => {
  const { idUsuario } = req.params;

  db.all(
    `SELECT * FROM METAFINANCEIRA WHERE idUsuario = ?`,
    [idUsuario],
    (err, rows) => {
      if (err) return res.status(500).json({ erro: err.message });
      res.json(rows);
    }
  );
});

// Atualizar progresso da meta
router.put('/:idMeta/progresso', (req, res) => {
  const { idMeta } = req.params;
  const { progresso } = req.body;

  db.run(
    `UPDATE METAFINANCEIRA SET progresso = ? WHERE idMeta = ?`,
    [progresso, idMeta],
    function (err) {
      if (err) return res.status(500).json({ erro: err.message });
      if (this.changes === 0) return res.status(404).json({ erro: 'Meta não encontrada' });
      res.json({ mensagem: 'Progresso atualizado com sucesso' });
    }
  );
});

module.exports = router;