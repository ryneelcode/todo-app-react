import { useState, useRef } from "react";
import { useModal } from "../../hooks/useModal";
import ConfirmAlert from "../../components/ConfirmAlert/ConfirmAlert";
import FormTodo from "../FormTodo/FormTodo";
import Modal from "../../components/Modal/Modal";
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
    pattern: /^[A-Za-z\s]+$/,
    errorMessage: "letters only",
    isRequired: false,
    isTouched: false
  }
};

const ListTodo = ({ todos, removeTodo }) => {
  const [isVisible, showAlert, closeAlert] = useModal(false);
  const [isEditableTodo, setIsEditableTodo] = useState(false);
  const [isDeletableTodo, setIsDeletableTodo] = useState(false);

  const idRef = useRef(null);
  const todoToDelete = todos.find(todo => todo.id === idRef.current);

  const handleDelete = (id) => {
    showAlert();
    setIsDeletableTodo(true);
    idRef.current = id;
  };

  // TODO pasar datos al formulario para que muestre los valores en el input al editar valor
  // TODO refactorizar el componente de form para al pasarle valores iniciales renderize inputs con el tipo
  const handleEdit = (id) => {
    showAlert();
    setIsEditableTodo(true);
    const todoToEdit = todos.find(todo => todo.id === id);
    idRef.current = id;
    initialValues.title.value = todoToEdit.title;
    initialValues.description.value = todoToEdit.description;
  };

  const handleConfirmAlert = () => {
    removeTodo(idRef.current);
    closeAlert();
  };

  const handleCancelAlert = () => {
    setIsEditableTodo(false);
    setIsDeletableTodo(false);
    closeAlert();
  };

  const callback = () => {
    console.log("callback ejecutado");
  };

  return (
    <>
      {
        todos.map(({ id, title, description }) => (
          <Todo
            key={id}
            id={id}
            title={title}
            description={description}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))
      }
      <Modal isVisible={isVisible} closeModal={handleCancelAlert} title={todoToDelete?.title}>
        {isDeletableTodo && <p>{todoToDelete?.description}</p>}
        {isDeletableTodo && <ConfirmAlert title={"Do you want to delete this task?"} cancel={handleCancelAlert} confirm={handleConfirmAlert} />}

        {isEditableTodo && <FormTodo isFormVisible={isVisible} submitCallback={callback} initialFormValues={initialValues} />}
      </Modal>

    </>
  );
};

export default ListTodo;
