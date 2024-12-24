import React, { useState } from "react"

const LogInForm = ({ onSwitchForm }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    // Add your login logic here
    try {
      // await loginUser(email, password)
      console.log("Logging in with:", { email, password })
    } catch (err) {
      setError("Invalid email or password")
    }
  }

  return (
    <>
      <div className="flex flex-col gap-4 max-w-2xl">
        <h1 className="font-semibold text-7xl text-black">Welcome Back</h1>

        <div className="space-y-5">
          <p className="text-sm text-gray-600 max-w-lg">
            Sign in to continue managing your tasks with Tasketeer.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-yellow-400 text-black py-3 px-4 rounded-lg hover:bg-yellow-500 transition-colors font-medium"
            >
              Sign in
            </button>

       
          </form>

          <div className="pt-4">
            <p
              className="text-sm text-center text-gray-600 hover:underline cursor-pointer"
              onClick={onSwitchForm}
            >
              Don't have an account? Sign up
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default LogInForm