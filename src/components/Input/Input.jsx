import "./Input.css";

const Input = ({ formValues, setFormValues, name, label, type, placeholder, pattern, errorMessage, required }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: { ...formValues[name], value: value } });
  };

  const validateInput = (e) => {
    const { name, value } = e.target;

    // modifica el state isValid de los valores del form
    if (required) {
      if (value.trim() !== "") {
        if (pattern) {
          const isValid = pattern.test(value);
          setFormValues({ ...formValues, [name]: { ...formValues[name], isValid: isValid } });
        } else {
          setFormValues({ ...formValues, [name]: { ...formValues[name], isValid: true } });
        }
      } else {
        setFormValues({ ...formValues, [name]: { ...formValues[name], isValid: false } });
      }
    } else {
      if (pattern) {
        const isValid = pattern.test(value.trim());
        setFormValues({ ...formValues, [name]: { ...formValues[name], isValid: isValid } });
      } else {
        setFormValues({ ...formValues, [name]: { ...formValues[name], isValid: true } });
      }
    }
  };
  // BUG
  /**
   * al modificar el input modifica el value pero el isValid sigue en null
   * el key up se ejecuta la funcion de validacion, conflicto entre las 2
   * al mostrar el mensaje de alerta, ya que modifica en la segunda ejecucion
   */
  // TODO cuando esta vacio el input no mostrar el error de pattern, si es requerido si
  console.log(name, formValues[name].isValid);
  return (
    <>
      <label htmlFor={name}>{label} {formValues[name].value !== "" && formValues[name].isValid === false ? <span className="error-message">{errorMessage}</span> : null}</label>
      {type === "text" &&
        <input type="text" name={name} className="field" placeholder={placeholder} onChange={handleInputChange} onKeyUp={validateInput} onBlur={validateInput} />
      }
      {type === "textarea" &&
        <textarea className="field" name={name} id="" cols="30" rows="10" placeholder={placeholder} onChange={handleInputChange} onKeyUp={validateInput} onBlur={validateInput}></textarea>
      }
    </>
  );
};

export default Input;
