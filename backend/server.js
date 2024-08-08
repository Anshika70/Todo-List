const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/todoList', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Access the MongoDB connection instance
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a Task schema and model
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  lastUpdated: Date,
  completed: Boolean,
});


 // Creating a Mongoose model for the Task schema
const Task = mongoose.model('Task', taskSchema);

// GET endpoint to fetch all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

// POST endpoint to add a new task
app.post('/tasks', async (req, res) => {
  try {
    const { title, description, lastUpdated } = req.body;
    const newTask = new Task({
      title,
      description,
      lastUpdated: lastUpdated || new Date(),
      completed: false,
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ message: 'Error adding task' });
  }
});

// PUT endpoint to update a task
app.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, lastUpdated, completed } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, lastUpdated: lastUpdated || new Date(), completed },
      { new: true }
    );

    if (updatedTask) {
      res.json(updatedTask);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Error updating task' });
  }
});

// DELETE endpoint to delete a task
app.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (deletedTask) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Error deleting task' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
