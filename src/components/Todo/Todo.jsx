import "./Todo.css";

const Todo = ({ id, title, description, handleDelete, handleEdit }) => {
  return (
    <article className="todo" >
      <h1>{title}</h1>
      <p>{description}</p>
      <label htmlFor="isCompleted">Finalizar <input type="radio" name="isCompleted" /></label>
      <button onClick={() => handleDelete(id)}>Eliminar</button>
      <button onClick={() => handleEdit(id)}>Editar</button>
    </article >
  );
};

export default Todo;
