import { useState } from "react";
import AuthPage from "./components/auth/AuthPage";
const App = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="bg-white min-h-screen flex font-['Lexend_Deca']">
      <AuthPage isLogin={isLogin} />
    </div>
  );
};

export default App;
