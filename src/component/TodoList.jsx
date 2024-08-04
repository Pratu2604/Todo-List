import React, { useState } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Typography,
  Container,
  TextField
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function TodoList({ todos, onToggleDone, onDelete }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddTodo = () => {
    navigate("/addTodo");
  };
 const onEdit=(id)=>{
 navigate(`/editTodo/${id}`)
 }
  const filteredTodos = todos.filter(todo => 
    todo.item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Todo List</Typography>
      <Grid container alignItems="center" style={{ marginBottom: "16px" }}>
        <Grid item xs={8}>
          <TextField
            fullWidth
            label="Search Todos"
            variant="outlined"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        <Grid item xs={4} style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" color="primary" onClick={handleAddTodo}>
            Add Todo
          </Button>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Todo Items</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Start Date</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Description</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Action</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTodos.map((todo) => (
              <TableRow key={todo.id}>
                <TableCell>{todo.item}</TableCell>
                <TableCell>{todo.date}</TableCell>
                <TableCell>{todo.description}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color={todo.done ? "success" : "primary"}
                    size="small"
                    style={{ marginRight: "4px" }}
                    onClick={() => onToggleDone(todo.id)}
                    startIcon={todo.done ? <CheckCircleIcon /> : null}
          
                  >
                    {todo.done ? "Done" : "Mark as Done"}
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginRight: "4px" }}
                    onClick={() => onEdit(todo.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => onDelete(todo.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
