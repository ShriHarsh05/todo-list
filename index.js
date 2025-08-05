const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // To serve your styles.css and other static files

// A simple counter for unique IDs
let nextId = 1;
// Data storage with ID and priority
let items = [
    { id: nextId++, task: "Complete MERN Assignment 7", priority: "High" },
    { id: nextId++, task: "Learn Express.js", priority: "Medium" }
];

// Home route to display the todo list
app.get('/', (req, res) => {
    res.render('list', {
        exej: items,
        filter: 'All'
    });
});

// Route to add new items
app.post('/', (req, res) => {
    const newItem = req.body.ele1;
    const itemPriority = req.body.priority;
    if (newItem) {
        items.push({
            id: nextId++,
            task: newItem,
            priority: itemPriority
        });
    }
    res.redirect('/');
});

// Route to handle filtering
app.post('/filter', (req, res) => {
    const filterPriority = req.body.filterPriority;
    let filteredItems = items;
    if (filterPriority !== 'All') {
        filteredItems = items.filter(item => item.priority === filterPriority);
    }
    res.render('list', {
        exej: filteredItems,
        filter: filterPriority
    });
});

// Route to handle editing
app.post('/edit', (req, res) => {
    const editId = parseInt(req.body.editId);
    const updatedTask = req.body.updatedTask;
    const updatedPriority = req.body.updatedPriority;

    const itemIndex = items.findIndex(item => item.id === editId);

    if (itemIndex > -1) {
        items[itemIndex].task = updatedTask;
        items[itemIndex].priority = updatedPriority;
    }
    res.redirect('/');
});

// Route to handle deleting
app.post('/delete', (req, res) => {
    const deleteId = parseInt(req.body.deleteId);
    items = items.filter(item => item.id !== deleteId);
    res.redirect('/');
});

app.listen(port, () => {
    console.log('Server is running on port 3000');
});