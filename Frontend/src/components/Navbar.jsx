import { Github, Sun, Moon , LogOut } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
 
  const [theme, setTheme] = useState(true);
   const { logout } = useContext(AuthContext);
   const navigate = useNavigate();

 
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme !== null) {
      setTheme(savedTheme === "true");
    }
  }, []);

  
  useEffect(() => {
    if (theme) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "true");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "false");
    }
  }, [theme]);

const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="h-14 px-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <h1 className="text-lg font-medium text-gray-900 dark:text-white">
        Dashboard
      </h1>

      <div className="flex items-center gap-4">
      
        <button
          onClick={() => setTheme(!theme)}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
        >
          {theme ? <Sun size={18} /> : <Moon size={18} />}
        </button>

       
        <a
          href="https://github.com/imamanjangra/Naviotech-Project-Todo"
          target="_blank"
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
        >
          <Github size={20} />
        </a>

         <button
          onClick={handleLogout}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
        >
         <LogOut size={20}/>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
