import React from "react";
import { TodoListItem } from "./TodoListItem";
import List from "@mui/material/List";

interface Props {
  todos: Todo[];
  toggleTodo: ToggleTodo;
}

export const TodoList: React.FC<Props> = ({ todos, toggleTodo }) => {
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        height: "50",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        rowGap: "5px",
        maxHeight: "60vh",
        overflow: "auto",
      }}
    >
      {todos.map((todo) => (
        <TodoListItem key={todo.text} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </List>
  );
};
