import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState('all');

  // Load tasks from backend
  useEffect(() => {
    axios.get('/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  // Add new task
  const addTask = async (title, category) => {
    const res = await axios.post('/tasks', { title, category });
    setTasks([...tasks, res.data]);
  };

  // Toggle complete
  const toggleTask = async (id, completed) => {
    const res = await axios.put(`/tasks/${id}`, { completed: !completed });
    setTasks(tasks.map(t => t._id === id ? res.data : t));
  };

  // Delete task
  const deleteTask = async (id) => {
    await axios.delete(`/tasks/${id}`);
    setTasks(tasks.filter(t => t._id !== id));
  };

  // Progress calculation
  const completedCount = tasks.filter(t => t.completed).length;
  const progress = tasks.length ? (completedCount / tasks.length) * 100 : 0;

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <h1>Task Manager</h1>

      {/* Dark Mode Toggle */}
      <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <p>{completedCount} of {tasks.length} tasks completed</p>

      {/* Task Form */}
      <TaskForm addTask={addTask} />

      {/* Filters */}
      <div className="filters">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('pending')}>Pending</button>
      </div>

      {/* Task List */}
      <TaskList tasks={filteredTasks} toggleTask={toggleTask} deleteTask={deleteTask} />
    </div>
  );
}

export default App;
