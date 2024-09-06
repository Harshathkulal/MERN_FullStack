import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // Fetch all todos
  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  // Add a new todo
  const addTodo = () => {
    if (!newTodo) {
      alert("Please enter a todo");
      return;
    }
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

  // Delete a todo
  const deleteTodo = (id) => {
    fetch(`/api/todos/${id}`, {
      method: "DELETE",
    }).then(() => {
      setTodos(todos.filter((todo) => todo._id !== id));
    });
  };

  // Update a todo
  const updateTodo = (id, newText) => {
    fetch(`/api/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: newText }),
    })
      .then((res) => res.json())
      .then((updatedTodo) => {
        // Update the state with the new todo
        setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
      })
      .catch((err) => console.error(err));
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
          <TodoItem
            key={todo._id}
            todo={todo}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
