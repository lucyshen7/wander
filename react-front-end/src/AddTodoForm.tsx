import { Button } from "@mui/material";
import React, { useState } from "react";
import "./App.scss";

interface Props {
  addTodo: AddTodo;
}

export const AddTodoForm: React.FC<Props> = ({ addTodo }) => {
  const [text, setText] = useState("");

  return (
    <div className="todo-form">
      <form className="add-todo">
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          style={{ height: "30px", width: "240px" }}
        />
        <Button
          variant="contained"
          type="submit"
          onClick={(e) => {
            e.preventDefault(); // cancel the default event of actually submitting the form
            addTodo(text);
            setText("");
          }}
        >
          Add Todo
        </Button>
      </form>
    </div>
  );
};
