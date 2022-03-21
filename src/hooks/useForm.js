import { useState, useEffect } from "react";

export const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submited, setIsSubmited] = useState({ isSubmited: null, message: "" });

  useEffect(() => {
    if (submited.isSubmited !== null) {
      formNotification();

      const timeOut = setTimeout(() => {
        setIsSubmited({ ...submited, isSubmited: null, message: "" });
      }, 2500);

      return () => {
        clearTimeout(timeOut);
      };
    }
  }, [submited]);

  const formNotification = () => {
    if (submited.isSubmited === true) {
      setValues(initialValues);
      setErrors({});
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    if (submited.isSubmited !== null) {
      setIsSubmited({ ...submited, isSubmited: null, message: "" });
    }
  };

  const handleOnChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: { ...values[name], value: value } });
  };

  const handleOnBlur = e => {
    const { name } = e.target;
    setValues({ ...values, [name]: { ...values[name], isTouched: true } });
  };

  const handleOnSubmit = (e, submitCallback) => {
    e.preventDefault();
    setErrors(formValidate(values));

    if (Object.keys(formValidate(values)).length === 0) {
      const dataToSend = {};
      Object.entries(values).forEach(field => {
        const [key, value] = field;
        dataToSend[key] = value.value.trim();
      });
      submitCallback(dataToSend);
      setIsSubmited({ ...submited, isSubmited: true, message: "todo added" });
    } else {
      setIsSubmited({ ...submited, isSubmited: false, message: "complete the fields" });
    }
  };

  const validateField = e => {
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
    submited,
    errors,
    handleOnChange,
    handleOnBlur,
    handleOnSubmit,
    validateField,
    resetForm
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
      fieldError = "required";
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
      } else {
        fieldName = "";
        fieldError = "";
      }
    } else {
      fieldName = "";
      fieldError = "";
    }
  }
  return { fieldName, fieldError };
};
