const express = require('express');
const router = express.Router();
const todosQueries = require('../db/todos-queries');

// GET todos
router.get("/", (req, res) => {
  todosQueries.getTodos()
    .then((todos) => {
      console.log('todos', todos);
      res.json({ todos });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// POST to todos table
router.post("/", (req, res) => {
  const { complete, id } = req.body;

  todosQueries.updateTodo(complete, id)
    .then((response) => {
      res.json({ response });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// ADD todo
router.post("/add", (req, res) => {
  const { text } = req.body;

  todosQueries.addTodo(text)
    .then((response) => {
      res.json({ response });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// export router object
module.exports = router;