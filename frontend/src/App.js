import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./styles/theme"; // Ensure you have a theme file for Material UI
import Navbar from "./components/common/Navbar"; // Navbar component with the login button
import Footer from "./components/common/Footer"; // Footer component
import Home from "./pages/Home"; // Home page
import Login from "./pages/Login"; // Customer Login page
import PostJob from "./pages/PostJob"; // Post job page
import LoginJobs from "./pages/LoginJobs"; // NEW Worker Login Page
import TaskerDashboardPage from "./pages/TaskerDashboardPage";
import TaskerProfilePage from "./pages/TaskerProfilePage";
import Chat from "./components/Chat";
import TaskForm from "./components/TaskForm";
import Recommendations from "./pages/Recommendations"; // Import Recommendations page
import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Ensures consistent baseline styles across browsers */}
      <Router>
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <Navbar /> {/* Navbar with Login / Signup button */}
          <main style={{ flex: 1 }}>
            {/* Define all the routes */}
            <Routes>
              <Route path="/" element={<Home />} /> {/* Default route for the homepage */}
              <Route path="/login" element={<Login />} /> {/* Customer Login route */}
              <Route path="/login-jobs" element={<LoginJobs />} /> {/* NEW Worker Login route */}
              <Route path="/tasker-profile/:taskerId" element={<TaskerProfilePage />} />
              <Route path="/chat" element={<Chat currentUser="User1" chatPartner="User2" />} />
              <Route path="/task-form/:service" element={<TaskForm />} />
              <Route path="/recommendations" element={<Recommendations />} />
              <Route path="/post-job" element={<ProtectedRoute element={<PostJob />} userType="user" />} />
              <Route path="/tasker-dashboard" element={<ProtectedRoute element={<TaskerDashboardPage />} userType="worker" />} />
              <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} userType="user" />} />
            </Routes>
          </main>
          <Footer /> {/* Footer component, remains at the bottom */}
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
