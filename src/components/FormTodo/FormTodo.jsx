import { useState } from "react";
import Input from "../Input/Input";

import "./FormTodo.css";

const initialValues = {
  title: {
    value: "",
    isValid: null
  },
  description: {
    value: "",
    isValid: null
  }
};

const inputs = [
  {
    id: 1,
    name: "title",
    label: "Título",
    type: "text",
    placeholder: "Nombra la tarea",
    pattern: /^[A-Za-z]+$/,
    errorMessage: "Solo letras",
    required: true
  },
  {
    id: 2,
    name: "description",
    label: "Descrición",
    type: "textarea",
    placeholder: "Descripción de la tarea",
    pattern: "",
    errorMessage: "Completa la descripcion",
    required: false
  }
];

const FormTodo = ({ addTodo }) => {
  const [formValues, setFormValues] = useState(initialValues);
  const { title, description } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.isValid) {
      console.log("es valido el titulo al hacer submit");
    } else {
      console.log("no es valido");
    }
    console.log(title, description);
  };

  return (
    <form className="form-todo" onSubmit={handleSubmit}>
      {inputs.map(({ id, name, label, type, placeholder, pattern, errorMessage, required }) => (
        <Input
          key={id}
          name={name}
          label={label}
          type={type}
          placeholder={placeholder}
          pattern={pattern}
          errorMessage={errorMessage}
          required={required}
          formValues={formValues}
          setFormValues={setFormValues}
        />
      ))}
      <button className="send-todo">
        Agregar
      </button>
    </form>
  );
};
export default FormTodo;
