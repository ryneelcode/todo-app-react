import { useState } from "react";

export const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: { ...values[name], value: value } });
  };

  const handleOnSubmit = (e, addTodo) => {
    e.preventDefault();
    setErrors(formValidate(values));

    if (Object.keys(formValidate(values)).length === 0) {
      console.log("formulario valido");
    } else {
      console.log("formulario no valido");
    }
  };

  const handleOnBlur = (e) => {
    const { name } = e.target;
    setValues({ ...values, [name]: { ...values[name], isTouched: true } });
  };

  const fieldValidate = (e) => {
    const errorsInput = { ...errors };
    const { name, value } = e.target;
    const field = values[name];
    if (field.isRequired) {
      if (field.value.trim() !== "") {
        if (field.pattern) {
          if (!field.pattern.test(value)) {
            errorsInput[name] = field.errorMessage;
          } else {
            delete errorsInput[name];
          }
        }
      } else {
        errorsInput[name] = "campo requerido";
      }
    } else {
      if (value.trim() !== "") {
        if (field.pattern) {
          if (field.pattern.test(value.trim())) {
            delete errorsInput[name];
          } else {
            errorsInput[name] = field.errorMessage;
          }
        }
      } else {
        delete errorsInput[name];
      }
    }
    setErrors(errorsInput);
  };

  const validation = (field) => {
    const errors = {};
  };

  const formValidate = (values) => {
    const newErrors = { ...errors };
    Object.entries(values).forEach(entry => {
      const [key, field] = entry;
      if (field.isRequired) {
        if (field.value.trim() !== "") {
          if (field.pattern) {
            if (!field.pattern.test(field.value)) {
              newErrors[key] = field.errorMessage;
            } else {
              delete newErrors[key];
            }
          }
        } else {
          newErrors[key] = "campo requerido";
        }
      } else {
        if (field.value.trim() !== "") {
          if (field.pattern) {
            if (field.pattern.test(field.value.trim())) {
              delete newErrors[key];
            } else {
              newErrors[key] = field.errorMessage;
            }
          }
        } else {
          delete newErrors[key];
        }
      }
    });

    return newErrors;
  };

  return [
    values,
    errors,
    handleOnChange,
    handleOnSubmit,
    handleOnBlur,
    fieldValidate
  ];
};
