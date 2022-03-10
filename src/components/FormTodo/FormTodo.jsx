import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import "./FormTodo.css";

const initialValues = {
  title: {
    value: "",
    pattern: /^[A-Za-z\s]+$/,
    errorMessage: "solo letras",
    isRequired: true,
    isTouched: false
  },
  description: {
    value: "",
    pattern: /^[A-Za-z\s]+$/,
    errorMessage: "solo letras",
    isRequired: false,
    isTouched: false
  }
};

const FormTodo = ({ addTodo, formIsVisible }) => {
  const {
    values,
    errors,
    handleOnChange,
    handleOnBlur,
    handleOnSubmit,
    fieldValidate,
    formReset
  } = useForm(initialValues);

  useEffect(() => {
    formReset();
  }, [formIsVisible]);

  console.log(formIsVisible, values);
  // TODO crear notificacion de todo agregado, o formulario incompleto
  return (
    <form className="form-todo" onSubmit={e => handleOnSubmit(e, addTodo)}>
      <label htmlFor="title">Título {errors.title && <span className="error-message">{errors.title}</span>}</label>
      <input type="text" name="title" className="field" onChange={handleOnChange} onKeyUp={fieldValidate} onBlur={handleOnBlur} value={values.title.value} />

      <label htmlFor="title">Descripción {errors.description && <span className="error-message">{errors.description}</span>}</label>
      <textarea name="description" className="field" id="" cols="30" rows="10" onChange={handleOnChange} onKeyUp={fieldValidate} onBlur={handleOnBlur} value={values.description.value}></textarea>
      <button className="send-todo">
        Agregar
      </button>
    </form>
  );
};
export default FormTodo;
