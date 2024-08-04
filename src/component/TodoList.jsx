import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Paper,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

export default function TodoList({ todos, onToggleDone, onDelete }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddTodo = () => {
    navigate("/addTodo");
  };

  const onEdit = (id) => {
    navigate(`/editTodo/${id}`);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container >
      
      <Grid container alignItems="center" style={{ marginBottom: "16px", marginTop:30 }}>
        <Grid item xs={8}>
          <TextField
            fullWidth
            label="Search Todos"
            variant="outlined"
            size="small" // Decreased height of search bar
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        <Grid
          item
          xs={4}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button variant="contained" color="primary" onClick={handleAddTodo}>
            Add Todo
          </Button>
        </Grid>
      </Grid>
      <Typography variant="h4" gutterBottom>
        Todo List
      </Typography>

      {filteredTodos.length === 0 ? (
        <Paper style={{ padding: "16px", textAlign: "center" }}>
          <Typography variant="h6">No Todos Found</Typography>
        </Paper>
      ) : (
        <Paper>
          {filteredTodos.map((todo) => (
            <Accordion key={todo.id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-${todo.id}-content`}
                id={`panel-${todo.id}-header`}
              >
                <Typography variant="h6">{todo.item}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" gutterBottom>
                  <strong>Description:</strong> {todo.description}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Start Date:</strong> {todo.date}
                </Typography>
                <Grid container spacing={1} style={{ marginTop: "16px" }}>
                  <Grid item>
                    <Button
                      variant="contained"
                      color={todo.done ? "success" : "primary"}
                      size="small"
                      onClick={() => onToggleDone(todo.id)}
                      startIcon={todo.done ? <CheckCircleIcon /> : null}
                    >
                      {todo.done ? "Done" : "Mark as Done"}
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => onEdit(todo.id)}
                      disabled={todo.done}
                    >
                      Edit
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => onDelete(todo.id)}
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
        </Paper>
      )}
    </Container>
  );
}
