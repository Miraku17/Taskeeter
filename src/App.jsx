import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AuthPage from "@/components/auth/AuthPage";
// import Home from "./pages/Home";
import Home from '@/pages/home'
import ProtectedRoute from "@/components/ProtectedRoute";

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <div className="bg-white min-h-screen flex font-['Lexend_Deca']">
      <Routes>
        {/* Public auth route */}
        <Route 
          path="/auth" 
          element={
            isAuthenticated ? <Navigate to="/home" replace /> : <AuthPage />
          } 
        />
        
        {/* Protected home route */}
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        
        {/* Root route redirect */}
        <Route 
          path="/" 
          element={
            <Navigate to={isAuthenticated ? "/home" : "/auth"} replace />
          } 
        />
      </Routes>
    </div>
  );
};

export default App;