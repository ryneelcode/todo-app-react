import "./Todo.css";
import { MdDelete, MdEdit } from "react-icons/md";

const Todo = ({ id, title, description, isCompleted, handleDelete, handleEdit, handleComplete }) => {
  return (
    <article className={isCompleted ? "todo finalised" : "todo"}>
      <div className="todo-actions">
        <h1 title={title}>{title}</h1>
        {!isCompleted && <button onClick={() => handleEdit(id)}><MdEdit className="todo-icon edit" /></button>}
        <button onClick={() => handleDelete(id)}><MdDelete className={isCompleted ? "delete todo-icon finalised" : "delete todo-icon"} /></button>
      </div>
      <label className="todo-check" htmlFor="isCompleted">{isCompleted ? "completed" : "complete"} <input checked={isCompleted} type="checkbox" name="isCompleted" onChange={(e) => handleComplete(e, id)} /> </label>
      <p className="todo-description">{description}</p>
    </article >
  );
};

export default Todo;
