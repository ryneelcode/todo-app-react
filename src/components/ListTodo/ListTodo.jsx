import { useRef, useState } from "react";
import ConfirmAlert from "../../components/ConfirmAlert/ConfirmAlert";
import Modal from "../../components/Modal/Modal";
import { useModal } from "../../hooks/useModal";
import FormTodo from "../FormTodo/FormTodo";
import Todo from "../Todo/Todo";

const initialValues = {
  title: {
    value: "",
    pattern: /^[A-Za-z\s]+$/,
    errorMessage: "letters only",
    isRequired: true,
    isTouched: false
  },
  description: {
    value: "",
    pattern: "",
    errorMessage: "letters only",
    isRequired: false,
    isTouched: false
  }
};

const ListTodo = ({ todos, editTodo, removeTodo, completeTodo }) => {
  const [isVisible, showAlert, closeAlert] = useModal(false);
  const [isEditableTodo, setIsEditableTodo] = useState(false);
  const [isDeletableTodo, setIsDeletableTodo] = useState(false);
  const inputsValuesRef = useRef(initialValues);
  const idTodoRef = useRef(null);
  const todoRef = useRef(null);

  const handleDelete = (id) => {
    showAlert();
    setIsDeletableTodo(true);
    idTodoRef.current = id;
    todoRef.current = todos.find(todo => todo.id === idTodoRef.current);
    inputsValuesRef.current.title.value = todoRef.current.title;
    inputsValuesRef.current.description.value = todoRef.current.description;
  };

  const handleEdit = (id) => {
    showAlert();
    setIsEditableTodo(true);
    idTodoRef.current = id;
    todoRef.current = todos.find(todo => todo.id === idTodoRef.current);
    inputsValuesRef.current.title.value = todoRef.current.title;
    inputsValuesRef.current.description.value = todoRef.current.description;
  };

  const handleConfirmAlert = () => {
    removeTodo(idTodoRef.current);
    setIsDeletableTodo(false);
    closeAlert();
  };

  const handleCancelAlert = () => {
    setIsEditableTodo(false);
    setIsDeletableTodo(false);
    closeAlert();
  };

  const handleCompleteTodo = (e, id) => {
    completeTodo(id, e.target.checked);
  };

  const handleCallback = (todo) => {
    inputsValuesRef.current.title.value = todo.title;
    inputsValuesRef.current.description.value = todo.description;
    editTodo(idTodoRef.current, todo);
  };

  return (
    <>
      {
        todos.map(({ id, title, description, isCompleted }) => (
          <Todo
            key={id}
            id={id}
            title={title}
            description={description}
            isCompleted={isCompleted}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleComplete={handleCompleteTodo}
          />
        ))
      }
      <Modal isVisible={isVisible} closeModal={handleCancelAlert} title={inputsValuesRef.current?.title.value}>
        {isDeletableTodo && <p>{todoRef.current?.description}</p>}
        {isDeletableTodo && <ConfirmAlert title={"Do you want to delete this task?"} cancel={handleCancelAlert} confirm={handleConfirmAlert} />}

        {isEditableTodo && <FormTodo isFormVisible={isVisible} submitCallback={handleCallback} initialFormValues={inputsValuesRef.current} />}
      </Modal>
    </>
  );
};

export default ListTodo;
