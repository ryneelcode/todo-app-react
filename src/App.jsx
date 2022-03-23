import "./App.css";
import { useEffect } from "react";
import FormTodo from "./components/FormTodo/FormTodo";
import ListTodo from "./components/ListTodo/ListTodo";
import Modal from "./components/Modal/Modal";
import { useModal } from "./hooks/useModal";
import { useTodo } from "./hooks/useTodo";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { AiOutlineAppstoreAdd } from "react-icons/ai";

const initialTodos = [
  { id: 3, title: "First task", description: "First description", isCompleted: false },
  { id: 2, title: "Second task", description: "Second description", isCompleted: false }
];

function App() {
  const [initalValues, setInitalValues] = useLocalStorage("task_todolist", initialTodos);
  const [todos, addTodo, editTodo, removeTodo, completeTodo] = useTodo(initalValues);
  const [isVisible, showModal, closeModal] = useModal(false);

  useEffect(() => {
    setInitalValues(todos);
  }, [todos]);

  return (
    <div className="app-todo">
      <h1>TODO</h1>
      <button className="add-button" onClick={showModal}>
        <AiOutlineAppstoreAdd className="add-icon" title="addicon" />
      </button>
      <Modal
        isVisible={isVisible}
        closeModal={closeModal}
        title={"New Todo"}
      >
        <FormTodo submitCallback={addTodo} isFormVisible={isVisible} />
      </Modal>
      <section className="todo-list">
        <ListTodo todos={todos} removeTodo={removeTodo} editTodo={editTodo} completeTodo={completeTodo} />
      </section>
    </div>
  );
}
export default App;
