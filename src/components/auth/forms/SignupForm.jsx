import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../features/user/userSlice";
import { useNavigate } from 'react-router-dom';

const SignupForm = ({ onSwitchForm }) => {
  const dispatch = useDispatch();
  const { loading, error: reduxError } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await dispatch(registerUser({ name, email, password })).unwrap();
      // Handle successful registration (e.g., redirect or show success message)
      console.log("Registration successful!");
      navigate('/home');

    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    }
  };

  if (!showForm) {
    return (
      <div className="flex flex-col gap-4 max-w-2xl">
        <h1 className="font-semibold text-7xl text-black">Tasketeer</h1>

        <div className="space-y-5">
          <p className="text-md text-gray-600 max-w-lg">
            With only the features you need, Tasketeer is customized for
            individuals seeking a stress-free way to stay focused on their tasks
            and goals.
          </p>

          <button
            type="button"
            className="w-full bg-yellow-400 text-black py-3 px-4 rounded-lg hover:bg-yellow-500 transition-colors font-medium"
            onClick={() => setShowForm(true)}
          >
            Get started
          </button>

          <p
            className="text-sm text-center text-gray-600 mt-4 hover:underline cursor-pointer"
            onClick={onSwitchForm}
          >
            Already have an account? Sign in
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 max-w-2xl text-black">
      <h1 className="font-semibold text-7xl text-black">Join Tasketeer</h1>

      <div className="space-y-5">
        <p className="text-md text-gray-600 max-w-lg">
          Create your account and start managing tasks effectively.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white"
              required
            />
          </div>

          {(error || reduxError) && (
            <p className="text-red-500 text-sm">{error || reduxError}</p>
          )}

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black py-3 px-4 rounded-lg hover:bg-yellow-500 transition-colors font-medium"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div className="border-t border-gray-200 pt-4">
          <p
            className="text-sm text-center text-gray-600 hover:underline cursor-pointer"
            onClick={onSwitchForm}
          >
            Already have an account? Sign in
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
