import { useState } from "react";
import { Edit2, Check, Trash2 } from "lucide-react";

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.todoTitle);

  const saveEdit = () => {
    if (newTitle.trim() === "") return;
    onEdit(todo._id, newTitle);
    setIsEditing(false);
  };

  return (
    <div
      className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition"
    >
     
      <div className="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          checked={todo.status === "completed"}
          onChange={() => onToggle(todo)}
          className="w-5 h-5 accent-blue-600"
        />

        {isEditing ? (
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        ) : (
          <span
            className={`flex-1 text-gray-900 dark:text-gray-100 ${
              todo.status === "completed"
                ? "line-through text-gray-400 dark:text-gray-400"
                : ""
            }`}
          >
            {todo.todoTitle}
          </span>
        )}
      </div>

      
      <div className="flex gap-2 ml-4">
        {isEditing ? (
          <button
            onClick={saveEdit}
            className="p-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
          >
            <Check size={16} />
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            <Edit2 size={16} />
          </button>
        )}

        <button
          onClick={() => onDelete(todo._id)}
          className="p-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
