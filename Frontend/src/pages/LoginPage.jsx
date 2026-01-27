import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import {useNavigate} from 'react-router-dom';
import API from "../services/Api";

const LoginPage = () => {
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [isLoding , setIsLoding] = useState(false);
    const [error , setError] = useState("");
    const {setUser , user} = useContext(AuthContext)

    const navigate = useNavigate()

    useEffect(() => {
        if(user){
        navigate('/todos');
    }
    } , [user])


    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const {data} = await API.post("/users/login" , {
                email,
                password
            });

            const userData = {
                _id : data._id,
                name: data.name,
                email: data.email,
            }

            localStorage.setItem('token' , data.token)
            localStorage.setItem('user' , JSON.stringify(userData))
            setUser(userData)
            
            navigate('/todos');
        } catch (error) {
            setError("invalid email or password ")
        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Login
        </h1>
        <p className="text-center text-gray-500 mt-1">
          Welcome back! Please sign in
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              Remember me
            </label>
            <a href="#" className="text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 font-medium hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
