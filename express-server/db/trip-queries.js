const db = require('./index');

const getTodos = () => {
  return db.query(`SELECT * FROM todos;`)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log('DB error fetching todos: ' + err.message);
    });
};

const updateTodo = (complete, id) => {
  return db.query(`UPDATE todos SET complete = $1 WHERE id = $2;`, [complete, id])
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log('DB error updating todo: ' + err.message);
    });
};

const addTodo = (text) => {
  return db.query(`INSERT INTO todos (text, complete) VALUES ($1, false) RETURNING *;`, [text])
    .then((res) => {
      console.log('res.rows', res.rows);
      return res.rows;
    })
    .catch((err) => {
      console.log('DB error adding todo: ' + err.message);
    });
};

module.exports = {
  updateTodo,
  getTodos,
  addTodo
};