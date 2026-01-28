import { useState } from "react";

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.todoTitle);

  const saveEdit = () => {
    onEdit(todo._id, newTitle);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.status === "completed"}
          onChange={() => onToggle(todo)}
        />

        {isEditing ? (
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        ) : (
          <span
            className={`${
              todo.status === 'completed' ? "line-through text-gray-400" : ""
            }`}
          >
            {todo.todoTitle}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        {isEditing ? (
          <button
            onClick={saveEdit}
            className="text-green-600 font-medium"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 font-medium"
          >
            Edit
          </button>
        )}

        <button
          onClick={() => onDelete(todo._id)}
          className="text-red-600 font-medium"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
