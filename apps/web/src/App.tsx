import { Route, Routes, Navigate } from "react-router-dom";
import { SignInPage } from "./components/pages/SignInPage/SignInPage";
import { useAuth } from "./hooks/useAuth";
import "./App.css";
import { DashboardPage } from "./components/pages/DashboardPage/DashboardPage";

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/sign-in" element={<SignInPage />} />
      {isAuthenticated ? (
        <Route path="/dashboard" element={<DashboardPage />} />
      ) : (
        <Route path="*" element={<Navigate to="/sign-in" replace />} />
      )}
    </Routes>
  );
};

export default App;
