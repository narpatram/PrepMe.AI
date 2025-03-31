import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Chatbot from "../components/ChatBot";
import { useState } from "react";
import { useFileUpload } from "../services/hooks/useFileUpload";

const ChatWithAi = () => {
  const [openChat, setOpenChat] = useState<boolean>(false);
  const [book, setBook] = useState<File>()
  const { mutate: uploadFile, data, isError } = useFileUpload();
  const navigate = useNavigate();

  const handleSelectBook = () => {
    navigate("/library"); // Navigate to the Library component
  };

  const handleUploadBook = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    const file = event.target.files?.[0]; // Get the selected file
    if (file) {
      setBook(file)
        uploadFile(file);
      console.log("Uploaded file:", file.name); // Log the file name
      setOpenChat(true); // Open the chat
    }
  };



  return (
    <Box sx={{ textAlign: "left", width: "95vw", mt: "10vw"}}>
      {openChat ? (
        <Chatbot filename={book?.name}/>
      ) : (
        <>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold", mb: 3 }} color="primary">
            Chat With AI
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", width: "30vw" }}>
            <Button variant="contained" color="primary" onClick={handleSelectBook}>
              Select Book
            </Button>
            <Button variant="contained" color="primary" component="label">
              Upload Book
              <input type="file" hidden onChange={handleUploadBook} /> {/* Fix: Pass the event directly */}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ChatWithAi;