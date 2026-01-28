import { ListTodo, CheckCircle, Clock, LogOut } from "lucide-react";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
     const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const [isOpen, setIsOpen] = useState(false);   
  const [isHover, setIsHover] = useState(false); 
  if (!user) return null; 

  const showPopup = isOpen || isHover;

  return (
    <div className="w-64 h-screen flex flex-col border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">

   
      <div className="h-14 flex items-center px-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Todo App
        </h2>
      </div>

   
      <nav className="flex-1 px-4 py-6 space-y-3">

        <NavLink
          to="/todos"
          className={({ isActive }) =>
            `w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition
            ${
              isActive
                ? "dark:bg-gray-800 bg-gray-100 text-gray-800 dark:text-gray-200"
                : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`
          }
        >
          <ListTodo size={18} />
          <span>All Todos</span>
        </NavLink>

        <NavLink
          to="/completed"
          className={({ isActive }) =>
            `w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition
            ${
              isActive
                ? "dark:bg-gray-800 bg-gray-100 text-gray-800 dark:text-gray-200"
                : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`
          }
        >
          <CheckCircle size={18} />
          <span>Completed</span>
        </NavLink>

        <NavLink
          to="/pending"
          className={({ isActive }) =>
            `w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition
            ${
              isActive
                ? "dark:bg-gray-800 bg-gray-100 text-gray-800 dark:text-gray-200"
                : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`
          }
        >
          <Clock size={18} />
          <span>Pending</span>
        </NavLink>

      </nav>

   
      <div
        className="relative p-4 border-t border-gray-200 dark:border-gray-700 "
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >

       
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          <div className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center font-semibold">
            {user.name?.charAt(0).toUpperCase()}
          </div>

          <span className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
            {user.name}
          </span>
        </div>

        
        {showPopup && (
          <div
            className="
              absolute bottom-16 left-4 w-56
              bg-white dark:bg-gray-800
              border border-gray-200 dark:border-gray-700
              rounded-lg shadow-lg p-4
              z-50
            "
          >
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {user.name}
            </p>

            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
              {user.email}
            </p>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-md bg-red-600 text-white hover:bg-red-700 transition"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default Sidebar;
