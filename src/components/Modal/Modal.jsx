import "./Modal.css";

const Modal = ({ isVisible, closeModal, children, title }) => {
  const handleModalCick = (e) => {
    e.stopPropagation();
  };

  return (
    <section className={isVisible ? "modal modal-open" : "modal"} onClick={closeModal}>
      <div className="content-modal" onClick={handleModalCick}>
        <h1>{title}</h1>
        {children}
      </div>
    </section >
  );
};

export default Modal;
