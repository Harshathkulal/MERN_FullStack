import React from "react";

const TodoItem = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <div className="flex items-center justify-between bg-gray-100 p-2 mb-2 rounded">
      {todo.text}

      <button className="text-red-500" onClick={() => deleteTodo(todo._id)}>
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
