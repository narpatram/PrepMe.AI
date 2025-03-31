import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppBarComponent from "./components/AppBar";
import ChatWithAi from "./pages/ChatWithAi";
import Library from "./pages/Library";
import TakeATest from "./pages/TakeATest";
import Profile from "./pages/Profile";
import { Box, ThemeProvider } from "@mui/material";
import theme from "./theme";
import Schedule from "./pages/Schedule";
import Chatbot from "./components/ChatBot";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";

const App: React.FC = () => {
  const queryClient = new QueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check localStorage for token
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true); // User is authenticated
    } else {
      setIsAuthenticated(false); // User is not authenticated
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router>
          {/* Conditionally render the AppBar */}
          {isAuthenticated && <AppBarComponent />}
          <Box sx={{ pl: 4, paddingTop: 10, height: "85vh" }}>
            <Routes>
              {/* Public Route for Login */}
              <Route path="/login" element={<Login />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/chat/:bookId" element={<Chatbot />} />
                <Route path="/chat" element={<ChatWithAi />} />
                <Route path="/library" element={<Library />} />
                <Route path="/test" element={<TakeATest />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/" element={<ChatWithAi />} />
              </Route>
            </Routes>
          </Box>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
