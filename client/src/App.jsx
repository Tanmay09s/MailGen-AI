import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Layout from "./components/Layout";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyOtp from "./pages/VerifyOtp";

import Dashboard from "./pages/DashBoard";
import History from "./pages/History"; // <-- Import History

import { useAuth } from "./context/AuthContext";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#030712] text-white">
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <Toaster position="top-right" />

      <Routes>

        {/* Public Routes */}

        <Route path="/" element={<LandingPage />} />

        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/dashboard" replace />}
        />

        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/dashboard" replace />}
        />

        <Route path="/verify-otp" element={<VerifyOtp />} />

        {/* Protected Routes */}

        <Route
          path="/dashboard"
          element={user ? <Layout /> : <Navigate to="/login" replace />}
        >
          <Route index element={<Dashboard />} />
        </Route>

        <Route
          path="/history"
          element={user ? <Layout /> : <Navigate to="/login" replace />}
        >
          <Route index element={<History />} />
        </Route>

        {/* Catch All */}

        <Route
          path="*"
          element={<Navigate to={user ? "/dashboard" : "/"} replace />}
        />

      </Routes>
    </Router>
  );
}

export default App;