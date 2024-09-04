import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  const addTodo = () => {
    fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: newTodo }),
    })
      .then((res) => res.json())
      .then((data) => setTodos([...todos, data]));
    setNewTodo("");
  };

  const deleteTodo = (id) => {
    fetch(`/api/todos/${id}`, {
      method: "DELETE",
    }).then(() => {
      setTodos(todos.filter((todo) => todo._id !== id));
    });
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="flex-grow p-2 border rounded"
          placeholder="Add a new task"
        />
        <button
          onClick={addTodo}
          className="ml-2 p-2 bg-blue-500 text-white rounded"
        >
          Add
        </button>
      </div>
      <div>
        {todos.map((todo) => (
          <TodoItem key={todo._id} todo={todo} deleteTodo={deleteTodo} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
