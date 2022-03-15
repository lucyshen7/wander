import { useEffect, useState } from "react";
import { TodoList } from "./TodoList";
import { AddTodoForm } from "./AddTodoForm";
import { Navbar } from "./Navbar";
import { Container } from "@mui/material";
import axios from "axios";
import "./App.scss";

const initialTodos: Todo[] = [];

const fakeUser = { name: "Alice" }; // to be replaced

function App() {
  const [todos, setTodos] = useState(initialTodos);

  useEffect(() => {
    // fetch todos
    axios
      .get("http://localhost:8080/api/trips")
      .then((response) => {
        const todos = response.data.todos;
        setTodos(todos);
      })
      .catch((err) => console.log("err fetching data!!!!", err.message));
  }, []);

  const toggleTodo = (selectedTodo: Todo) => {
    axios
      .post("http://localhost:8080/api/todos", {
        id: selectedTodo.id,
        complete: !selectedTodo.complete,
      })
      .then((res) => {
        const newTodos = todos.map((todo) => {
          if (todo === selectedTodo) {
            return {
              ...todo,
              complete: !todo.complete,
            };
          }
          return todo;
        });
        setTodos(newTodos);
      });
  };

  const addTodo: AddTodo = (text: string) => {
    axios
      .post("http://localhost:8080/api/todos/add", {
        text: text,
      })
      .then((res) => {
        const newTodo = res.data.response[0];
        setTodos([...todos, newTodo]);
      });
  };

  return (
    <>
      <Navbar user={fakeUser} />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "auto",
          width: "100%",
          height: "100%",
          backgroundColor: "#b4a4bb",
          overflow: "auto",
        }}
      >
        <div className="todo-box">
          <h1 className="title">My Trips</h1>
          <TodoList todos={todos} toggleTodo={toggleTodo} />
          <AddTodoForm addTodo={addTodo} />
        </div>
      </Container>
    </>
  );
}

export default App;
