import "./Todo.css";

const Todo = (todos) => {
  const { title, description } = todos;
  return (
    <article className="todo" >
      <h1>{title}</h1>
      <p>{description}</p>
      <label htmlFor="isCompleted">Finalizar <input type="radio" name="isCompleted" /></label>
    </article>
  );
};

export default Todo;
