import { useContext, useEffect, useState } from "react";
import TodoItem from "../components/TodoItem";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../services/Api.jsx";
const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const {user , logout} = useContext(AuthContext)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  // Add todo
  console.log(user);
  const fetchTodo = async () => {
    try {
      setLoading(true)
      const {data} = await API.get('/todos')
      console.log(data);
      setTodos(data)
    } catch (error) {
      console.log("Failed to fetch todo");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTodo();
  } , [])


  const addTodo = async (e) => {
    e.preventDefault();
    if (!text) return;

    try {
      const {data} = await API.post('/todos' , {
        todoTitle : text,
        status : "pending",
      });

      setTodos([data , ...todos]);
      setText("");
    } catch (error) {
      console.log("Failed to add todo ");
    }
  };

  
  // Delete todo
  const deleteTodo = async (id) => {
   try {
    await API.delete(`/todos/${id}`);
    setTodos(todos.filter((todo) => todo._id !== id));
   } catch (error) {
    console.log("Failed to delete Todo");
   }
  };

  // Toggle complete
  const toggleTodo = async (todo) => {
    
    try {
      const newStatus = todo.status === "completed" ? "pending" : "completed";

      const {data} = await API.put(`/todos/${todo._id}` , {
        status : newStatus,
      })

      setTodos(todos.map((status) => (status._id === todo._id ? data : status)))
    } catch (error) {
      console.log("Failed to toggle todo");
    }
    
  };


  // Edit todo
  const editTodo =async (id, newText) => {
    try {
      const {data} =await API.put(`/todos/${id}` , {
        todoTitle : newText,
      })

      setTodos(todos.map((edit) => (edit._id === id ? data : edit)));
    } catch (error) {
      console.log("Failed to edit todo ");
    }
  };
console.log( 'todos' ,todos);
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
       {loading ? (
        <p> loading todo </p>
       ) : todos.length === 0 ? (
        <p> no todo yet </p>
       ) : (
        todos.map((todo) => (
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
  );
};

export default TodoPage;
