import "./Todo.css";
const Todo = ({ id, title, description, isCompleted, handleDelete, handleEdit, handleComplete }) => {
  return (
    <article className={isCompleted ? "todo finaliced" : "todo"}>
      <h1>{title}</h1>
      <p>{description}</p>
      <label htmlFor="isCompleted">{isCompleted ? "completed" : "complete"} <input type="checkbox" name="isCompleted" onChange={(e) => handleComplete(e, id)} /></label>
      <button onClick={() => handleDelete(id)}>Delete</button>
      {!isCompleted && <button onClick={() => handleEdit(id)}>Edit</button>}
    </article >
  );
};

export default Todo;
