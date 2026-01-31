import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/Api";
import { AuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";


const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const passwordValidation = (password) => {
    if(password.length < 8){
      return "password must be more than 8 character !"
    }

    if(!/[!@#$%^&*]/.test(password)){
      return "password must be include a special symbol"
    }

    return null
  }

  useEffect(() => {
    if (user) navigate("/todos");
  }, [user, navigate]);

  const handleSignUp = async (e) => {
    e.preventDefault();
   
    if (password !== confirmPassword) {
      setError("Passwords does not match");
      toast.error("Passwords does not match")
      return;
    }
    if(name.length >= 30){
      setError("Name is big write small name !")
       toast.error("Name is to much big")
      return;
    }

    const error = passwordValidation(password)

    if(error){
      setError(error)
      toast.error(error)
      return
    }
   
    try {
      const { data } = await API.post("/users/register", {
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
      });


      // console.log(data);

     const userData = {
  _id: data._id,
  name: data.name,
  email: data.email,
};

localStorage.setItem("token", data.token);
localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      toast.success("Account created successfully");
      navigate("/todos");
    } catch {
      setError("Failed to create account");
      toast.error("Failed to create account")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-100 to-slate-200 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-xl p-8">
        <h1 className="text-3xl font-medium tracking-tight text-gray-900 dark:text-white text-center">
          Create your account
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
          Sign up to start managing your tasks
        </p>

        {error && (
          <div className="mt-4 text-sm text-red-600 bg-red-100 dark:bg-red-900/30 p-2 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp} className="mt-6 space-y-5">
          
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Full name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
              className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600
                bg-gray-50 dark:bg-gray-800 px-4 py-2 text-sm
                text-gray-900 dark:text-white placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

        
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600
                bg-gray-50 dark:bg-gray-800 px-4 py-2 text-sm
                text-gray-900 dark:text-white placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              placeholder="Create a strong password"
              required
              className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600
                bg-gray-50 dark:bg-gray-800 px-4 py-2 text-sm
                text-gray-900 dark:text-white placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

         
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              required
              className="mt-1 w-full rounded-lg border border-gray-300 dark:border-gray-600
                bg-gray-50 dark:bg-gray-800 px-4 py-2 text-sm
                text-gray-900 dark:text-white placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 py-2.5  font-medium text-white hover:bg-indigo-700 "
          >
            Create account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
