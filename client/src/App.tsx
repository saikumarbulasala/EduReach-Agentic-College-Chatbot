import type { ReactNode } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import FloatingChatButton from "./components/FloatingChatButton";

const WithNavbar = ({ children }: { children: ReactNode }) => <>{children}</>;

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <WithNavbar>
                <HomePage />
              </WithNavbar>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

        <FloatingChatButton />
      </Router>

      <Toaster position="top-right" />
    </AuthProvider>
  );
}
