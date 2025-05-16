import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setIsLoading(true);
    
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, {
        email,
        password,
      });
      sessionStorage.setItem("token", res.data.token);
      setSuccess(true);
      setTimeout(() => navigate("/feedback"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-200">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-white">Login</h2>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-100 p-2 rounded text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500/20 border border-green-500 text-green-100 p-2 rounded text-sm">
            Login successful! Redirecting to feedback page...
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded border border-gray-700 bg-gray-900 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded border border-gray-700 bg-gray-900 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:opacity-70 text-white py-2 rounded font-semibold flex items-center justify-center"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <p className="text-center mt-4">
        Don't have an account? <Link to="/" className="text-blue-400 underline">Register</Link>
      </p>
      </form>
      
    </div>
  );
}
