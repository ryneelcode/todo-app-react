import Todo from "../Todo/Todo";

const ListTodo = ({ todos }) => {
  return (
    <>
      {
        todos.map(({ id, title, description }) => (
          <Todo
            key={id}
            id={id}
            title={title}
            description={description} />
        ))
      }
    </>
  );
};

export default ListTodo;
