const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let todos = [];
let idCounter = 1;

// Get all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// Get a single todo by ID
app.get('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
    if (todo) {
        res.json(todo);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
});

// Create a new todo
app.post('/todos', (req, res) => {
    const { title, description } = req.body;
    if (title) {
        const newTodo = { id: idCounter++, title, description: description || '' };
        todos.push(newTodo);
        res.status(201).json(newTodo);
    } else {
        res.status(400).json({ message: 'Title is required' });
    }
});

// Update a todo by ID
app.patch('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, description } = req.body;
    const todo = todos.find(t => t.id === id);
    if (todo) {
        if (title) todo.title = title;
        if (description) todo.description = description;
        res.json(todo);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
});

// Delete a todo by ID
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex(t => t.id === id);
    if (index !== -1) {
        const deletedTodo = todos.splice(index, 1);
        res.json(deletedTodo[0]);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});