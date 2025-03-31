import React from "react";
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

const App: React.FC = () => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
      <Router>
        <AppBarComponent />
        {/* Add a Box with paddingTop equal to the AppBar height */}
        <Box sx={{ pl: 4, paddingTop: 10, height: "85vh" }}> {/* Adjust paddingTop to match AppBar height */}
          <Routes>
            <Route path="/chat/:bookId" element={<Chatbot />} />
            <Route path="/chat" element={<ChatWithAi />} />
            <Route path="/library" element={<Library />} />
            <Route path="/test" element={<TakeATest />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<ChatWithAi />} /> {/* Default route */}
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;