import React, { useEffect } from "react";
import { TextField, Button, Paper, Grid, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function TodoForm({ todos, onSubmit }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  // Initial values for formik
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      date: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Task Name is required"),
      description: Yup.string().required("Task Description is required"),
      date: Yup.date().required("Task Date is required").nullable(),
    }),
    onSubmit: (values) => {
      const updatedTask = {
        id: isEditMode ? parseInt(id) : todos.length + 1,
        item: values.name,
        description: values.description,
        date: values.date,
        done: false,
      };
      onSubmit(updatedTask, isEditMode);
      navigate("/");
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (isEditMode) {
      const todoToEdit = todos.find((todo) => todo.id === parseInt(id));
      if (todoToEdit) {
        formik.setValues({
          name: todoToEdit.item,
          description: todoToEdit.description,
          date: todoToEdit.date,
        });
      }
    }
  }, [isEditMode, id, todos]);

  return (
    <Paper style={{ padding: "16px", maxWidth: "500px", margin: "0 auto", marginTop: 35 }}>
      <Typography variant="h6" gutterBottom>
        {isEditMode ? "Edit Task" : "Add New Task"}
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Task Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Task Description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              multiline
              rows={4}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Task Date"
              name="date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={formik.values.date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.date && Boolean(formik.errors.date)}
              helperText={formik.touched.date && formik.errors.date}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              {isEditMode ? "Update Task" : "Add Task"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
