const sqlite3 = require("sqlite3").verbose();
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

const db = new sqlite3.Database("./database.db");

function transform(data) {
  return Object.entries(data).reduce(
    (acc, [key, val]) => {
      acc[`$${key}`] = val;
      return acc;
    },
    { $updatedAt: moment().unix() }
  );
}

function initializeDatabase() {
  db.serialize(function () {
    db.run(
      "CREATE TABLE if not exists notes (id VARCHAR(255) NOT NULL PRIMARY KEY, content TEXT, createdAt int, updatedAt int)"
    );
  });
}

function updateNote({ id, content }) {
  const data = {
    id,
    content,
  };

  const transformed = transform(data);

  const statement =
    "UPDATE notes SET content = $content, updatedAt = $updatedAt WHERE id = $id";
  return new Promise((resolve, reject) => {
    db.run(statement, transformed, (error) => {
      if (error) reject(error);
    });
    resolve(data);
  });
}

function deleteNote(id) {
  return new Promise((resolve, reject) => {
    const statement = "DELETE FROM notes WHERE id = $id";
    db.run(statement, { $id: id }, (error) => {
      if (error) reject(error);
    });
    resolve();
  });
}

function insertNote(content) {
  const data = {
    id: uuidv4(),
    content,
    createdAt: moment().unix(),
    updatedAt: moment().unix(),
  };

  const transformed = transform(data);

  return new Promise((resolve, reject) => {
    const statement =
      "INSERT INTO notes VALUES ($id, $content, $createdAt, $updatedAt)";

    db.run(statement, transformed, (error) => {
      if (error) reject(error);
    });
    resolve(data);
  });
}

function getAllNotes() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * from notes", (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
}

function getNote(id) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * from notes WHERE id = ?", id, (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
}

module.exports = {
  initializeDatabase,
  insertNote,
  updateNote,
  deleteNote,
  getAllNotes,
  getNote,
};
