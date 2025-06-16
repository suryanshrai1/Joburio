import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('joburio_logged_in', true);
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-100 to-blue-300">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-2xl w-96">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Welcome to Joburio</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button className="bg-blue-600 hover:bg-blue-700 transition text-white w-full py-2 rounded font-semibold">Login</button>
        <p className="text-sm mt-4 text-center">Don't have an account? <a href="/register" className="text-blue-500 font-medium">Register</a></p>
      </form>
    </div>
  );
}
