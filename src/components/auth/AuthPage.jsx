import React, { useState } from 'react'
import AuthLayout from './layout/AuthLayout'
import SignupForm from './forms/SignupForm'
import LogInForm from './forms/LogInForm'

const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(true)

  return (
    <AuthLayout>
      {showLogin ? (
        <LogInForm onSwitchForm={() => setShowLogin(false)} />
      ) : (
        <SignupForm onSwitchForm={() => setShowLogin(true)} />
      )}
    </AuthLayout>
  )
}

export default AuthPage