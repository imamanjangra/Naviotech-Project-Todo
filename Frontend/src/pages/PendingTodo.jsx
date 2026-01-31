import { useContext, useEffect, useState } from "react";
import TodoItem from "../components/TodoItem";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../services/Api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import { TodoItemSkeleton } from "../components/TodoItemSkeleton ";
import { EmptyTodo } from "../components/EmptyTodo";

const PendingTodo = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [filerData , setFilerData] = useState([])

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchTodo = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/todos");
      setTodos(data);
    } catch {
      console.log("Failed to fetch todos");
      toast.error("Failed to Fetch Todo")
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!text) return;

    try {
      const { data } = await API.post("/todos", {
        todoTitle: text,
        status: "pending",
      });
      setTodos([data, ...todos]);
      setText("");
       toast.success("Add Todo successfully");
    } catch {
      console.log("Failed to add todo");
      toast.error("Failed to add Todo")
    }
  };

  const deleteTodo = async (id) => {
    try {
      await API.delete(`/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
      toast.success("Delete Todo successfully");
    } catch {
      console.log("Failed to delete todo");
      toast.error("Failed to Delete Todo")
    }
  };

  const toggleTodo = async (todo) => {
    try {
      const newStatus =
        todo.status === "completed" ? "pending" : "completed";

      const { data } = await API.put(`/todos/${todo._id}`, {
        status: newStatus,
      });

      setTodos(
        todos.map((t) => (t._id === todo._id ? data : t))
      );
    } catch {
      console.log("Failed to toggle todo");
      toast.error("Failed to Toggle Todo")
    }
  };

  const editTodo = async (id, newText) => {
    try {
      const { data } = await API.put(`/todos/${id}`, {
        todoTitle: newText,
      });

      setTodos(todos.map((t) => (t._id === id ? data : t)));
       toast.success("Edit Todo successfully");
    } catch {
      console.log("Failed to edit todo");
      toast.error("Failed to Edit Todo")
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    setFilerData(todos.filter((todo) => todo.status === "pending"))
  } , [todos])

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
     
      <Sidebar onLogout={handleLogout} />

    
      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-6 flex-1 overflow-y-auto">
        
          <form onSubmit={addTodo} className="flex gap-2 mb-6">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Add a new todo"
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition">
              Add
            </button>
          </form>

         
          <div className="space-y-3">
            {loading ? (
              <div className="text-sm text-gray-500"><TodoItemSkeleton/></div>
            ) : todos.length === 0 ? (
              <div className="text-sm text-gray-500"><EmptyTodo/></div>
            ) : (
              filerData.map((todo) => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  onDelete={deleteTodo}
                  onToggle={toggleTodo}
                  onEdit={editTodo}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingTodo;
