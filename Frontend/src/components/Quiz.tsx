import { Box, Button, Typography, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuizProps {
  questions: Question[];
}

const Quiz: React.FC<QuizProps> = ({ questions }) => {
  const navigate = useNavigate();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleAnswerChange = (index: number, answer: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [index]: answer }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <Box sx={{ textAlign: "center", mt: 5, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Quiz
      </Typography>
      {questions.map((q, index) => (
        <Box key={index} sx={{ mb: 3, textAlign: "left" }}>
          <Typography variant="h6">{q.question}</Typography>
          <RadioGroup
            value={selectedAnswers[index] || ""}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
          >
            {q.options.map((option, i) => (
              <FormControlLabel key={i} value={option} control={<Radio />} label={option} />
            ))}
          </RadioGroup>
          {submitted && (
            <Typography color={selectedAnswers[index] === q.correctAnswer ? "green" : "red"}>
              {selectedAnswers[index] === q.correctAnswer ? "Correct!" : `Wrong! Correct answer: ${q.correctAnswer}`}
            </Typography>
          )}
        </Box>
      ))}
      {!submitted ? (
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mr: 2 }}>
          Submit
        </Button>
      ) : (
        <Button variant="contained" color="secondary" onClick={() => navigate("/")}>Back to Home</Button>
      )}
    </Box>
  );
};

export default Quiz;
