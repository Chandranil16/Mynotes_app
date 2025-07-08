import React, { useState } from "react";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Contextprovider"; 
import { toast } from "react-toastify"; // Import toast for notifications
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); 
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if password and confirm password match
    if (password !== confirm) {
      setError("Passwords do not match.");
      setSuccess("");
      return;
    }

    
    try {
      const res = await axios.post("https://mynotes-app-backend.onrender.com/api/auth/login", {
        email,
        password,
      });
      setSuccess("Login successful!");
      setError("");
      console.log(res);
      localStorage.setItem("token", res.data.token); // Store token in local storage

      login(res.data.user); 
      toast.success("Login successful!");
      navigate("/"); // Navigate to home page on successful login
    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
      setSuccess("");
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-2">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-4 sm:p-8 w-full max-w-xs sm:max-w-md flex flex-col gap-4"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-2">Login</h2>
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded text-sm sm:text-base">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded text-sm sm:text-base">
            {success}
          </div>
        )}

        <div className="flex items-center border rounded px-3 py-2 bg-gray-50">
          <FiMail className="mr-2 text-gray-400" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="bg-transparent outline-none flex-1 text-sm sm:text-base"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>
        <div className="flex items-center border rounded px-3 py-2 bg-gray-50">
          <FiLock className="mr-2 text-gray-400" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="bg-transparent outline-none flex-1 text-sm sm:text-base"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
            minLength={6}
          />
        </div>
        <div className="flex items-center border rounded px-3 py-2 bg-gray-50">
          <FiLock className="mr-2 text-gray-400" />
          <input
            type="password"
            name="confirm"
            placeholder="Confirm Password"
            className="bg-transparent outline-none flex-1 text-sm sm:text-base"
            onChange={(e) => setConfirm(e.target.value)}
            autoComplete="new-password"
            required
            minLength={6}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition text-sm sm:text-base"
        >
          Login
        </button>
        <div className="text-center text-gray-500 mt-2 text-sm sm:text-base">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline ml-1">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
