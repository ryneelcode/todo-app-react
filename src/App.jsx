import { useState } from "react";
import Modal from "./components/Modal/Modal";
import ListTodo from "./components/ListTodo/ListTodo";
import FormTodo from "./components/FormTodo/FormTodo";
import "./App.css";

const initalTodos = [
  { id: 1, title: "new task 1", description: "description 1", isCompleted: false },
  { id: 2, title: "new task 2", description: "description 2", isCompleted: false },
  { id: 3, title: "new task 3", description: "description 3", isCompleted: false },
  { id: 4, title: "new task 4", description: "description 4", isCompleted: false }
];

function App() {
  const [todos, setTodo] = useState(initalTodos);
  const [isVisible, setVisibility] = useState(false);

  const showModal = () => {
    setVisibility(true);
  };

  const closeModal = () => {
    setVisibility(false);
  };

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
  // TODO validaciones del formulario y crud del todo
  return (
    <div className="app-todo">
      <h1>Lista de tareas</h1>
      <button className="add-button" onClick={showModal}>
        <img src="/add-icon.svg" alt="boton añádir tarea" />
      </button>
      <Modal
        isVisible={isVisible}
        closeModal={closeModal}
      >
        <FormTodo addTodo={addTodo} />
      </Modal>
      <section className="todo-list">
        <ListTodo todos={todos} />
      </section>
    </div>
  );
}
export default App;
