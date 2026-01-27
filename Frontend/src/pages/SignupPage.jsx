import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/Api";
import { AuthContext } from "../contexts/AuthContext";

const SignupPage = () => {
    const [name , setName] = useState('')
    const [email , setEmail] =  useState('')
    const [password , setPassword] = useState('')
    const [confirmPassword , setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [error , setError] = useState('')
    const {user , setUser} = useContext(AuthContext)
    const navigate = useNavigate()

     useEffect(() => {
    if (user) navigate("/todos");
  }, [user, navigate]);

    const handleSignUp = async (e) => {
        e.preventDefault();
         setIsLoading(true);
        try {
            const {data} = await API.post("users/register" ,{
                name : name.trim(),
                email : email.trim(),
                password : password.trim(),
            });

            localStorage.setItem('token' , data.token)
            localStorage.setItem('user' , JSON.stringify(data.user))
             setUser(data.user)
             navigate('/todos')
        } catch (error) {
             setError("Failed to create account ")
        } finally {
            setIsLoading(false)
        }
    };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Create Account
        </h1>
        <p className="text-center text-gray-500 mt-1">
          Sign up to get started
        </p>

        {/* Form */}
        <form onSubmit={handleSignUp} className="mt-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              value={email}
              type="email"
              required
              onChange={(e) => setEmail(e.target.value) }
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
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Create a password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2 text-sm">
            <input type="checkbox" className="mt-1 rounded" />
            <p className="text-gray-600">
              I agree to the{" "}
              <a href="#" className="text-blue-600 hover:underline">Terms</a>
              {" "}and{" "}
              <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
            </p>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <a href="/" className="text-blue-600 font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
