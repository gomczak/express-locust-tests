const express = require('express')
const app = express()

// Add middleware to parse JSON bodies
app.use(express.json())

// Sample data (in-memory database)
let users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Bob Johnson' },
    { id: 4, name: 'Sarah Williams' },
    { id: 5, name: 'Michael Brown' },
    { id: 6, name: 'Emily Davis' },
    { id: 7, name: 'James Wilson' }
]

// Add delay middleware (applies to all routes)
const delay = (ms) => {
    return (req, res, next) => {
        setTimeout(next, ms);
    };
};

// GET all users
app.get('/api/users', delay(2000), (req, res) => {
    res.json(users)
})

// GET single user by ID
app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id))
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)
})

// POST new user
app.post('/api/users', (req, res) => {
    const user = {
        id: users.length + 1,
        name: req.body.name
    }
    users.push(user)
    res.status(201).json(user)
})

// PUT update user
app.put('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id))
    if (!user) return res.status(404).json({ message: 'User not found' })

    user.name = req.body.name
    res.json(user)
})

// DELETE user
app.delete('/api/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id))
    if (userIndex === -1) return res.status(404).json({ message: 'User not found' })

    users.splice(userIndex, 1)
    res.status(204).send()
})

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})