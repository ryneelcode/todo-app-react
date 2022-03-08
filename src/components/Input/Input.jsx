import "./Input.css";

const Input = ({ errors, setErrors, formValues, setFormValues, name, label, type, placeholder, pattern, errorMessage, required }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const fieldValidation = (e) => {
    const errorsInput = { ...errors };
    const { name, value } = e.target;
    if (required) {
      if (value.trim() !== "") {
        if (pattern) {
          if (!pattern.test(value)) {
            errorsInput[name] = errorMessage;
          } else {
            delete errorsInput[name];
          }
        }
      } else {
        errorsInput[name] = "campo requerido";
      }
    } else {
      if (value.trim() !== "") {
        if (pattern) {
          if (pattern.test(value.trim())) {
            delete errorsInput[name];
          } else {
            errorsInput[name] = errorMessage;
          }
        }
      } else {
        delete errorsInput[name];
      }
    }
    setErrors(errorsInput);
  };

  return (
    <>
      <label htmlFor={name}>{label} {errors && <span className="error-message">{errors[name]}</span>}</label>
      {type === "text" &&
        <input type="text" name={name} className="field" placeholder={placeholder} onChange={handleInputChange} onKeyUp={fieldValidation} onBlur={fieldValidation} />
      }
      {type === "textarea" &&
        <textarea className="field" name={name} id="" cols="30" rows="10" placeholder={placeholder} onChange={handleInputChange} onKeyUp={fieldValidation} onBlur={fieldValidation} ></textarea>
      }
    </>
  );
};

export default Input;
