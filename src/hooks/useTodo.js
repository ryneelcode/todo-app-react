
import { useState } from "react";

export function useTodo(initalTodos = []) {
  const [todos, setTodo] = useState(initalTodos);

  const addTodo = (todo) => {
    const newTodo = {
      id: Date.now(),
      ...todo,
      isCompleted: false
    };

    const todosChanged = [
      newTodo,
      ...todos
    ];

    setTodo(todosChanged);
  };

  const removeTodo = (idTodo) => {
    const changedTodo = todos.filter(todo => todo.id !== idTodo);
    setTodo(changedTodo);
  };

  return [todos, addTodo, removeTodo];
}
