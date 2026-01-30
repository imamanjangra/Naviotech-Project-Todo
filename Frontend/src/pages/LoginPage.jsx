import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate  , Link} from "react-router-dom";
import API from "../services/Api";
import toast from "react-hot-toast";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/todos");
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/users/login", { email, password });

      const userData = {
        _id: data._id,
        name: data.name,
        email: data.email,
      };

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      toast.success("Login successfully");
      navigate("/todos");
      
    } catch {
      setError("Invalid email or password");
      toast.error("Invalid email or password")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-100 to-slate-200 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-xl p-8">
        <h1 className="text-3xl font-medium tracking-tight text-gray-900 dark:text-white text-center">
          Welcome Back
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
         Login to manage your todos
        </p>

        {error && (
          <div className="mt-4 text-sm text-red-600 bg-red-100 dark:bg-red-900/30 p-2 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="mt-6 space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 px-4 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 px-4 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-2.5  text-white hover:bg-blue-700 transition"
          >
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
         <Link to="/signup" className="text-indigo-600 hover:underline">Signup</Link>

        </p>
      </div>
    </div>
  );
};

export default LoginPage;
