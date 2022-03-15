
import "./ConfirmAlert.css";
const ConfirmAlert = ({ title, cancel, confirm }) => {
  return (
    <section className="alert">
      <h2>{title}</h2>
      <div className="alert-buttons">
        <button onClick={confirm} className="confirm">Confirm</button>
        <button onClick={cancel} className="cancel">Cancel</button>
      </div>
    </section>
  );
};

export default ConfirmAlert;
