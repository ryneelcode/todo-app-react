import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import "./FormTodo.css";

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

const FormTodo = ({ addTodo, isFormVisible }) => {
  const {
    values,
    submited,
    errors,
    handleOnChange,
    handleOnBlur,
    handleOnSubmit,
    validateField,
    resetForm
  } = useForm(initialValues);

  useEffect(() => {
    if (!isFormVisible) {
      resetForm();
    }
  }, [isFormVisible]);

  return (
    <form className="form-todo" onSubmit={e => handleOnSubmit(e, addTodo)}>
      <label htmlFor="title">Title {errors.title && <span className="error-label">{errors.title}</span>}</label>
      <input type="text" name="title" className={errors.title && submited.isSubmited !== null ? "field error-field" : "field"} onChange={handleOnChange} onKeyUp={validateField} onBlur={handleOnBlur} value={values.title.value} />

      <label htmlFor="title">Description {errors.description && <span className="error-label">{errors.description}</span>}</label>
      <textarea name="description" className={errors.description && submited.isSubmited !== null ? "field error-field" : "field"} id="" cols="30" rows="10" onChange={handleOnChange} onKeyUp={validateField} onBlur={handleOnBlur} value={values.description.value}></textarea>
      {submited.isSubmited !== null && <span className={submited.isSubmited ? "notification notification-success" : "notification notification-error"}>{submited.message}</span>}
      <button className="send-todo">
        Add Todo
      </button>
    </form>
  );
};
export default FormTodo;
