import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Chatbot from "../components/ChatBot";

const Library = () => {
    const [openChat, setOpenChat] = useState<boolean>(false)
    const [bookname, setBookname] = useState<string>("")
  const navigate = useNavigate();

  // Sample data for the table
  const books = [
    {
      id: 1,
      title: "Book 1",
      topics: ["AI", "Machine Learning"],
      version: "1.0",
      addedOn: "2023-10-01",
      addedFrom: "User Upload",
    },
    {
      id: 2,
      title: "Book 2",
      topics: ["Programming", "JavaScript"],
      version: "2.0",
      addedOn: "2023-09-15",
      addedFrom: "Library",
    },
    {
      id: 3,
      title: "Book 3",
      topics: ["Data Science", "Python"],
      version: "1.5",
      addedOn: "2023-08-20",
      addedFrom: "User Upload",
    },
  ];

  const handleRowClick = (bookId) => {
    setOpenChat(true)
    setBookname(bookId)
  };

  return (
    <Box sx={{ textAlign: "left", width: "95vw", }}>
      {/* Library Title */}
      {
        openChat ? <Chatbot filename={bookname}/> : <><Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", mb: 3 }} color="primary">
        Library
      </Typography>

      {/* Table */}
      <TableContainer component={Paper} sx={{ maxHeight: "70vh", overflow: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Book Title</TableCell>
              <TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Topics</TableCell>
              <TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Version</TableCell>
              <TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Added On</TableCell>
              <TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Added From</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow
                key={book.id}
                hover
                onClick={() => handleRowClick(book.title)}
                sx={{ cursor: "pointer", "&:hover": { backgroundColor: "#f9f9f9" } }}
              >
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.topics.join(", ")}</TableCell>
                <TableCell>{book.version}</TableCell>
                <TableCell>{book.addedOn}</TableCell>
                <TableCell>{book.addedFrom}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        </>
      }
      
    </Box>
  );
};

export default Library;