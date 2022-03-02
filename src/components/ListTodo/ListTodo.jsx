import Todo from "../Todo/Todo";

const ListTodo = ({ todos, removeTodo }) => {
  return (
    <>
      {
        todos.map(({ id, title, description }) => (
          <Todo
            key={id}
            id={id}
            title={title}
            description={description}
            removeTodo={removeTodo} />
        ))
      }
    </>
  );
};

export default ListTodo;
