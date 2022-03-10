import Modal from "./components/Modal/Modal";
import ListTodo from "./components/ListTodo/ListTodo";
import FormTodo from "./components/FormTodo/FormTodo";
import { useTodo } from "./hooks/useTodo";
import { useModal } from "./hooks/useModal";

import "./App.css";

const initalTodos = [
  { id: 1, title: "new task 1", description: "description 1", isCompleted: false },
  { id: 2, title: "new task 2", description: "description 2", isCompleted: false },
  { id: 3, title: "new task 3", description: "description 3", isCompleted: false },
  { id: 4, title: "new task 4", description: "description 4", isCompleted: false }
];

function App() {
  const [todos, addTodo, removeTodo] = useTodo(initalTodos);
  const [isVisible, showModal, closeModal] = useModal(false);
  // TODO confirmacion de borrar tarea, editar las tareas disponibles (utilizar el mismo modal y form), notificiaciones (agregado, borrado)
  return (
    <div className="app-todo">
      <h1>Lista de tareas</h1>
      <button className="add-button" onClick={showModal}>
        <img src="/add-icon.svg" alt="boton añádir tarea" />
      </button>
      <Modal
        isVisible={isVisible}
        closeModal={closeModal}
        title={"Añadir tarea"}
      >
        <FormTodo addTodo={addTodo} formIsVisible={isVisible} />
      </Modal>
      <section className="todo-list">
        <ListTodo todos={todos} removeTodo={removeTodo} />
      </section>
    </div>
  );
}
export default App;
