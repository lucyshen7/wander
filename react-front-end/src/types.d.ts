// Type Declaration File (global to the project)

interface Trip {
  id: number;
  destination_id: number;
  hotel_name: text;
}

interface User {
  name: string;
}

type ToggleTodo = (selectedTodo: Todo) => void;

// Declare the type AddTodo: each new todo will start off incomplete, so we just need a text prop to create one.
type AddTodo = (text: string) => void;