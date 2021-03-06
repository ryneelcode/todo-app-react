import { useState } from "react";

export function useTodo(initalTodos = []) {
  const [todos, setTodo] = useState(initalTodos);

  const addTodo = (todo) => {
    const newTodo = {
      id: Date.now(),
      ...todo,
      isCompleted: false
    };

    setTodo([newTodo, ...todos]);
  };

  const removeTodo = (idTodo) => {
    const changedTodo = todos.filter(todo => todo.id !== idTodo);
    setTodo(changedTodo);
  };

  const editTodo = (id, todo) => {
    const updatedTodos = todos.map(todos => todos.id === id ? { ...todos, title: todo.title, description: todo.description } : todos);
    setTodo(updatedTodos);
  };

  const completeTodo = (id, isChecked) => {
    const updatedTodos = todos
      .map(todos => todos.id === id ? { ...todos, isCompleted: isChecked } : todos)
      .sort(todo => todo.isCompleted ? 1 : -1);
    setTodo(updatedTodos);
  };
  return [todos, addTodo, editTodo, removeTodo, completeTodo];
}
