
import "./Alert.css";
import { MdCancel, MdDelete } from "react-icons/md";
const ConfirmAlert = ({ title, cancel, confirm }) => {
  return (
    <section className="alert">
      <h2>{title}</h2>
      <div className="alert-buttons">
        <button onClick={confirm} className="confirm"><MdDelete className="alert-icons" />Delete</button>
        <button onClick={cancel} className="cancel"><MdCancel className="alert-icons" />Cancel</button>
      </div>
    </section>
  );
};

export default ConfirmAlert;
