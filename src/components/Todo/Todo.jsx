import "./Todo.css";

const Todo = ({ id, title, description, removeTodo }) => {
  return (
    <article className="todo" >
      <h1>{title}</h1>
      <p>{description}</p>
      <label htmlFor="isCompleted">Finalizar <input type="radio" name="isCompleted" /></label>
      <button onClick={() => removeTodo(id)}>Eliminar</button>
    </article>
  );
};

export default Todo;
