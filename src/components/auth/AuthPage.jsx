import React, { useState } from 'react'
// import AuthLayout from '/layout/AuthLayout'
import AuthLayout from '@/components/auth/layout/AuthLayout'
import SignupForm from '@/components/auth/forms/SignupForm'
import LoginForm from '@/components/auth/forms/LogInForm'

const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(true)

  return (
    <AuthLayout>
      {showLogin ? (
        <LoginForm onSwitchForm={() => setShowLogin(false)} />
      ) : (
        <SignupForm onSwitchForm={() => setShowLogin(true)} />
      )}
    </AuthLayout>
  )
}

export default AuthPage