const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.resolve(__dirname, 'poupa.db'));

db.serialize(() => {
  // Usuário
  db.run(`
    CREATE TABLE IF NOT EXISTS USUARIO (
      idUsuario INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      email TEXT UNIQUE,
      senha TEXT,
      provedorLogin TEXT
    )
  `);

  // Categoria
  db.run(`
    CREATE TABLE IF NOT EXISTS CATEGORIA (
      idCategoria INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      cor TEXT,
      icone TEXT,
      idUsuario INTEGER,
      FOREIGN KEY(idUsuario) REFERENCES USUARIO(idUsuario)
    )
  `);

  // Transação
  db.run(`
    CREATE TABLE IF NOT EXISTS TRANSACAO (
      idTransacao INTEGER PRIMARY KEY AUTOINCREMENT,
      valor REAL,
      data TEXT,
      descricao TEXT,
      tipo TEXT, -- 'entrada' ou 'saida'
      idUsuario INTEGER,
      idCategoria INTEGER,
      FOREIGN KEY(idUsuario) REFERENCES USUARIO(idUsuario),
      FOREIGN KEY(idCategoria) REFERENCES CATEGORIA(idCategoria)
    )
  `);

  // Orçamento
  db.run(`
    CREATE TABLE IF NOT EXISTS ORCAMENTO (
      idOrcamento INTEGER PRIMARY KEY AUTOINCREMENT,
      mesReferencia TEXT,
      limiteGasto REAL,
      idCategoria INTEGER,
      idUsuario INTEGER,
      FOREIGN KEY(idCategoria) REFERENCES CATEGORIA(idCategoria),
      FOREIGN KEY(idUsuario) REFERENCES USUARIO(idUsuario)
    )
  `);

  // Meta Financeira
  db.run(`
    CREATE TABLE IF NOT EXISTS METAFINANCEIRA (
      idMeta INTEGER PRIMARY KEY AUTOINCREMENT,
      descricao TEXT,
      valorObjetivo REAL,
      prazo TEXT,
      progresso REAL,
      idUsuario INTEGER,
      FOREIGN KEY(idUsuario) REFERENCES USUARIO(idUsuario)
    )
  `);

  // Notificação
  db.run(`
    CREATE TABLE IF NOT EXISTS NOTIFICACAO (
      idNotificacao INTEGER PRIMARY KEY AUTOINCREMENT,
      tipo TEXT,
      mensagem TEXT,
      status TEXT,
      idUsuario INTEGER,
      FOREIGN KEY(idUsuario) REFERENCES USUARIO(idUsuario)
    )
      
  `);
  db.run(`
  INSERT INTO CATEGORIA (nome, cor, icone, idUsuario)
  VALUES ('Transporte', '#FF9800', 'bus', 1)
`);

});

module.exports = db;