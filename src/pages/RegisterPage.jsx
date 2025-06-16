import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    localStorage.setItem('joburio_logged_in', true);
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-green-100 to-green-300">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-xl shadow-2xl w-96">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-700">Create Your Joburio Account</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button className="bg-green-600 hover:bg-green-700 transition text-white w-full py-2 rounded font-semibold">Register</button>
      </form>
    </div>
  );
}
