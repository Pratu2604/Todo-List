import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper, Grid, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

export default function TodoForm({ todos, onSubmit }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [task, setTask] = useState({
    name: '',
    description: '',
    date: '',
  });

  useEffect(() => {
    if (isEditMode) {
      const todoToEdit = todos.find((todo) => todo.id === parseInt(id));
      if (todoToEdit) {
        setTask({
          name: todoToEdit.item,
          description: todoToEdit.description,
          date: todoToEdit.date,
        });
      }
    }
  }, [isEditMode, id, todos]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedTask = {
      id: isEditMode ? parseInt(id) : todos.length + 1,
      item: task.name,
      description: task.description,
      date: task.date,
      done: false,
    };
    onSubmit(updatedTask, isEditMode);
    navigate('/');
  };

  return (
    <Paper style={{ padding: '16px', maxWidth: '500px', margin: '0 auto' }}>
      <Typography variant="h6" gutterBottom>
        {isEditMode ? 'Edit Task' : 'Add New Task'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Task Name"
              name="name"
              value={task.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Task Description"
              name="description"
              value={task.description}
              onChange={handleChange}
              multiline
              rows={4}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Task Date"
              name="date"
              value={task.date}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              {isEditMode ? 'Update Task' : 'Add Task'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
