import { useState } from "react";

const initialValues = {
  title: "",
  description: ""
};

const FormTodo = ({ addTodo }) => {
  const [formValues, setValues] = useState(initialValues);
  const { title, description } = formValues;

  const handleInputChange = (e) => {
    const inputs = {
      ...formValues,
      [e.target.name]: e.target.value
    };
    setValues(inputs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      return;
    }
    if (description.trim() === "") {
      return;
    }
    addTodo(formValues);
    setValues(initialValues);
  };

  return (
    <form className="form-todo" onSubmit={handleSubmit}>
      <label htmlFor="title">Título </label>
      <input type="text" name="title" onChange={handleInputChange} value={title} placeholder="ej: Hacer la compra" />
      <label htmlFor="description">Descripción </label>
      <textarea name="description" id="" cols="30" rows="10" onChange={handleInputChange} value={description} placeholder="ej: Comprar huevos..."></textarea>
      <button className="send-todo">
        Agregar
      </button>
    </form>
  );
};
export default FormTodo;
