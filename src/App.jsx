import { useState } from "react";
import "./App.css";
import Todo from "./components/Todo/Todo";

const initalTodos = [
  { id: 1, title: "new task 1", description: "description" },
  { id: 2, title: "new task 2", description: "description 2" },
  { id: 3, title: "new task 3", description: "description 3" },
  { id: 4, title: "new task 4", description: "description 4" }
];

function App() {
  const [todos, setTodo] = useState(initalTodos);

  return (
    <div className="app-todo">
      <h1>Lista de tareas</h1>
      <section className="todo-list">
        {
          todos.map(({ id, title, description }) => (
            <Todo
              key={id}
              id={id}
              title={title}
              description={description} />
          ))
        }
      </section>
      <section className="todo-form">
        {/* //TODO crear modal para agregar tareas */}
        <form>
          <label htmlFor="title">Titulo</label>
          <input type="text" name="title" />

          <label htmlFor="description">Descripción</label>
          <textarea name="description" rows="5" cols="30" />
        </form>
      </section>
    </div>
  );
}
export default App;
