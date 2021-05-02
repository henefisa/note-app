const sqlite3 = require("sqlite3").verbose();
const { v4: uuidv4 } = require("uuid");

const db = new sqlite3.Database("./database.db");

function initializeDatabase() {
  db.serialize(function () {
    db.run(
      "CREATE TABLE if not exists notes (id VARCHAR(255) NOT NULL PRIMARY KEY, content TEXT, createdAt DATETIME, updatedAt DATETIME)"
    );
  });
}

function updateNote({ id, content }) {
  const data = {
    $id: id,
    $content: content,
    $updatedAt: new Date(),
  };
  const statement =
    "UPDATE notes SET content = $content, updatedAt = $updatedAt WHERE id = $id";
  return new Promise((resolve, reject) => {
    db.run(statement, data, (error) => {
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
    $id: uuidv4(),
    $content: content,
    $createdAt: new Date(),
    $updatedAt: new Date(),
  };

  return new Promise((resolve, reject) => {
    const statement =
      "INSERT INTO notes VALUES ($id, $content, $createdAt, $updatedAt)";

    db.run(statement, data, (error) => {
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
