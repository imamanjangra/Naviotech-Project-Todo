import { useContext, useState } from "react";
import TodoItem from "../components/TodoItem";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const {user , logout} = useContext(AuthContext)
  const navigate = useNavigate()
  // Add todo
  const addTodo = (e) => {
    e.preventDefault();
    if (!text) return;

    setTodos([
      ...todos,
      { id: Date.now(), title: text, completed: false },
    ]);
    setText("");
  };

  // Toggle complete
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Edit todo
  const editTodo = (id, newTitle) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      )
    );
  };

  // Logout
  const handleLogout  = () => {
    logout();
    navigate("/"); 
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Todos</h1>
        <button
          onClick={handleLogout }
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* Add Todo */}
      <form onSubmit={addTodo} className="flex gap-2 mb-6">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter todo"
          className="flex-1 px-4 py-2 border rounded-lg"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Add
        </button>
      </form>

      {/* Todo List */}
      <div className="space-y-3">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoPage;
