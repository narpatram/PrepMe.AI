import React, { useState, useEffect, useRef } from "react";
import { Box, TextField, IconButton, Paper, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

// Define the type for a chat message
type ChatMessage = {
  id: number;
  text: string;
  sender: "user" | "bot";
};

// Props for the Chatbot component
type ChatbotProps = {
  filename?: string; // Filename of the selected/uploaded book
};

const Chatbot: React.FC<ChatbotProps> = ({ filename }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]); // State for chat messages
  const [inputText, setInputText] = useState<string>(""); // State for input text
  const chatEndRef = useRef<HTMLDivElement>(null); // Ref for auto-scrolling to the latest message

  // Auto-scroll to the latest message when new messages are added
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Handle sending a message
  const handleSendMessage = () => {
    if (inputText.trim() === "") return; // Ignore empty messages

    // Add the user's message to the chat
    const newMessage: ChatMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: "user",
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // Clear the input field
    setInputText("");

    // Simulate a bot response (you can replace this with an API call)
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: messages.length + 2,
        text: "This is a response from the bot.",
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 1000);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "80vh", width: "100%", maxWidth: "100%", margin: "auto", border: "1px solid #ccc", borderRadius: "8px", overflow: "hidden" }}>
      {/* Chat Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, backgroundColor: "#f5f5f5", borderBottom: "1px solid #ddd" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#011E2B" }}>
          Chat with AI
        </Typography>
        {filename && (
          <Typography variant="subtitle1" sx={{ color: "#011E2B", fontStyle: "italic" }}>
            {filename}
          </Typography>
        )}
      </Box>

      {/* Divider */}
      <Divider />

      {/* Chat Messages */}
      <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2, backgroundColor: "#fff" }}>
        <List>
          {messages.map((message) => (
            <ListItem
              key={message.id}
              sx={{
                justifyContent: message.sender === "user" ? "flex-end" : "flex-start",
              }}
            >
              <Paper
                sx={{
                  p: 1.5,
                  backgroundColor: message.sender === "user" ? "#e3f2fd" : "#f5f5f5",
                  borderRadius: message.sender === "user" ? "10px 10px 0 10px" : "10px 10px 10px 0",
                }}
              >
                <ListItemText primary={message.text} />
              </Paper>
            </ListItem>
          ))}
          {/* Empty div for auto-scrolling to the latest message */}
          <div ref={chatEndRef} />
        </List>
      </Box>

      {/* Input Area */}
      <Box sx={{ display: "flex", p: 2, backgroundColor: "#f5f5f5" }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />
        <IconButton color="primary" onClick={handleSendMessage}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Chatbot;