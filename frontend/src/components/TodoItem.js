import React, { useState } from "react";

const TodoItem = ({ todo, deleteTodo, updateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateTodo(todo._id, editText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text); // Reset to the original text on cancel
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between bg-gray-100 p-2 mb-2 rounded">
      {isEditing ? (
        <div className="flex-grow">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
      ) : (
        <div className="flex-grow">{todo.text}</div>
      )}

      <div className="ml-4 flex items-center space-x-2">
        {isEditing ? (
          <>
            <button onClick={handleSave} className="text-blue-500">
              Save
            </button>
            <button onClick={handleCancel} className="text-gray-500">
              Cancel
            </button>
          </>
        ) : (
          <>
            <button onClick={handleEdit} className="text-green-500">
              Edit
            </button>
            <button
              onClick={() => deleteTodo(todo._id)}
              className="text-red-500"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
