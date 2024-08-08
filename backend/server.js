const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;
const FILE_PATH = path.join(__dirname, 'tasks.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS if frontend and backend are on different ports

const readTasks = () => {
  try {
    if (!fs.existsSync(FILE_PATH)) {
      fs.writeFileSync(FILE_PATH, JSON.stringify([]));
    }
    return JSON.parse(fs.readFileSync(FILE_PATH));
  } catch (error) {
    console.error('Error reading tasks:', error);
    throw new Error('Error reading tasks');
  }
};

const writeTasks = (tasks) => {
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2));
  } catch (error) {
    console.error('Error writing tasks:', error);
    throw new Error('Error writing tasks');
  }
};

app.get('/tasks', (req, res) => {
  console.log('Fetching tasks');
  try {
    res.json(readTasks());
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

app.post('/tasks', (req, res) => {
  console.log('Received POST request:', req.body);
  try {
    const { title, description, lastUpdated } = req.body;
    const tasks = readTasks();
    const newTask = { id: Date.now(), title, description, lastUpdated, completed: false };
    tasks.push(newTask);
    writeTasks(tasks);
    console.log('New task added:', newTask);
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ message: 'Error adding task' });
  }
});

app.put('/tasks/:id', (req, res) => {
  console.log('Received PUT request:', req.params.id, req.body);
  try {
    const taskId = parseInt(req.params.id, 10);
    const { title, description, lastUpdated, completed } = req.body;
    const tasks = readTasks();
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      tasks[taskIndex] = { id: taskId, title, description, lastUpdated, completed };
      writeTasks(tasks);
      console.log('Task updated:', tasks[taskIndex]);
      res.json(tasks[taskIndex]);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Error updating task' });
  }
});

app.delete('/tasks/:id', (req, res) => {
  console.log('Received DELETE request:', req.params.id);
  try {
    const taskId = parseInt(req.params.id, 10);
    let tasks = readTasks();
    tasks = tasks.filter(task => task.id !== taskId);
    writeTasks(tasks);
    console.log('Task deleted');
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Error deleting task' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
