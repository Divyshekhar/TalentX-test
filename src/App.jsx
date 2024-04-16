import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import Subscriptions from "./pages/Subscriptions";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import "./App.css";
import Home from "./pages/Home";
import { Box } from "@mui/material";
import MySubscriptions from "./pages/MySubscriptions";
import PageNotFound from "./pages/NotFound";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [role, setRole] = useState(localStorage.getItem("role") || "");

  useEffect(() => {
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");
    const isLoggedIn = username && role;

    setIsLoggedIn(isLoggedIn);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole("");
    setUsername("");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
  };

  return (
    <Router>
      <Box>
        <Box>
          <Navbar
            isLoggedIn={isLoggedIn}
            onLogout={handleLogout}
            username={username}
            isAdmin={role === "admin"}
          />
        </Box>
        <Box sx={{ mt: 8, minHeight: "100vh" }}>
          <Routes>
            <Route path="/" element={<Home role={role} />} />
            <Route path="/about" element={<AboutUs />} />
            <Route
              path="/subscriptions"
              element={
                <Subscriptions
                  username={username}
                  isLoggedIn={isLoggedIn}
                  isAdmin={role === "admin"}
                />
              }
            />
            {isLoggedIn && (
              <Route
                path="/all-subscriptions"
                element={
                  <MySubscriptions
                    username={username}
                    isLoggedIn={isLoggedIn}
                    isAdmin={role === "admin"}
                  />
                }
              />
            )}
            {!isLoggedIn && (
              <Route
                path="/login"
                element={
                  <Login
                    onLogin={handleLogin}
                    setNavbarUsername={setUsername}
                    setRole={setRole}
                  />
                }
              />
            )}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </Router>
  );
}

export default App;
