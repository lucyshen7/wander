import React from "react";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import "./App.scss";

interface Props {
  todo: Todo;
  toggleTodo: ToggleTodo;
}

// the TodoListItem component will take a todo item as a prop. The todo item has a text & boolean property.

export const TodoListItem: React.FC<Props> = ({ todo, toggleTodo }) => {
  // Declare TodoListItem as a functional component (React.FC) and pass Props as a generic
  return (
    <ListItem sx={{ bgcolor: "#eaeaea" }}>
      <label
        style={{ textDecoration: todo.complete ? "line-through" : undefined }}
        className="todo-items"
      >
        <Checkbox
          edge="start"
          checked={todo.complete}
          tabIndex={-1}
          onClick={() => {
            toggleTodo(todo);
          }}
          inputProps={{ "aria-labelledby": todo.text }}
        />{" "}
        {todo.text}
      </label>
    </ListItem>
  );
};
