import { useState } from "react";

export const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const formReset = () => {
    setErrors({});
    setValues(initialValues);
  };

  const handleOnChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: { ...values[name], value: value } });
  };

  const handleOnBlur = e => {
    const { name } = e.target;
    setValues({ ...values, [name]: { ...values[name], isTouched: true } });
  };

  const handleOnSubmit = (e, callback) => {
    e.preventDefault();
    setErrors(formValidate(values));

    if (Object.keys(formValidate(values)).length === 0) {
      const newObject = {};
      Object.entries(values).forEach(field => {
        const [key, value] = field;
        newObject[key] = value.value;
      });
      callback(newObject);
      formReset();
    }
  };

  const fieldValidate = (e) => {
    const errorsInput = { ...errors };
    const { name } = e.target;
    const value = values[name];
    const { fieldName, fieldError } = validation(name, value);

    if (fieldName !== "") {
      errorsInput[fieldName] = fieldError;
    } else {
      delete errorsInput[name];
    }
    setErrors(errorsInput);
  };

  const formValidate = values => {
    const newErrors = {};
    Object.entries(values).forEach(entry => {
      const [field, values] = entry;
      const { fieldName, fieldError } = validation(field, values);
      if (fieldName !== "") {
        newErrors[fieldName] = fieldError;
      }
    });
    return newErrors;
  };

  return {
    values,
    errors,
    handleOnChange,
    handleOnBlur,
    handleOnSubmit,
    fieldValidate,
    formReset
  };
};

const validation = (key, values) => {
  let fieldName = key;
  let fieldError = "";

  if (values.isRequired) {
    if (values.value.trim() !== "") {
      if (values.pattern) {
        if (!values.pattern.test(values.value)) {
          fieldError = values.errorMessage;
        } else {
          fieldName = "";
          fieldError = "";
        }
      }
    } else {
      fieldError = "campo requerido";
    }
  } else {
    if (values.value.trim() !== "") {
      if (values.pattern) {
        if (values.pattern.test(values.value.trim())) {
          fieldName = "";
          fieldError = "";
        } else {
          fieldError = values.errorMessage;
        }
      }
    } else {
      fieldName = "";
      fieldError = "";
    }
  }
  return { fieldName, fieldError };
};
