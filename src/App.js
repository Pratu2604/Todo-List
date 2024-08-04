import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoList from './component/TodoList';
import TodoForm from './component/TodoForm';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('/todos.json')
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error('Error loading todos:', error));
  }, []);

  const handleSubmit = (task, isEditMode) => {
    if (isEditMode) {
      setTodos(todos.map((todo) => (todo.id === task.id ? task : todo)));
    } else {
      const newTask = {
        ...task,
        id: todos.length + 1,
      };
      setTodos([...todos, newTask]);
    }
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleDone = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <TodoList todos={todos} onDelete={handleDelete} onToggleDone={handleToggleDone} />
          }
        />
        <Route path="/addTodo" element={<TodoForm todos={todos} onSubmit={handleSubmit} />} />
        <Route path="/editTodo/:id" element={<TodoForm todos={todos} onSubmit={handleSubmit} />} />
      </Routes>
    </Router>
  );
}

export default App;
