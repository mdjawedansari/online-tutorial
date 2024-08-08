import express from 'express';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import cors from 'cors'

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors({
  origin: 'https://coding-pathshala.vercel.app/', // Allow only this origin
  // origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type'], // Allowed headers
}));

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to db.json
const dbPath = resolve(__dirname, 'db.json');

// Function to read from db.json
const readDB = () => {
  const dataPath = path.join(__dirname, 'db.json');
  return JSON.parse(fs.readFileSync(dataPath));
};

// Function to write to db.json
const writeDB = (data) => {
  const dataPath = path.join(__dirname, 'db.json');
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};


// Route to get all users
app.get('/users', (req, res) => {
  const db = readDB();
  res.json(db.users || []);
});
app.post('/users', (req, res) => {
  console.log('Received user data:', req.body); // Log incoming request data

  const db = readDB();
  const newUser = req.body;

  // Check if user already exists
  const userExists = db.users.some(user => user.email === newUser.email);
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Generate a new ID (simple approach; consider a more robust solution in production)
  newUser.id = db.users.length ? Math.max(db.users.map(user => user.id)) + 1 : 1;

  db.users.push(newUser);
  writeDB(db);

  console.log('User added:', newUser); // Log added user
  res.status(201).json(newUser);
});


// Route to get a single user by ID
app.get('/users/:id', (req, res) => {
  const db = readDB();
  const user = db.users.find(user => user.id === parseInt(req.params.id, 10));
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Route to update user profile
// Update user profile
app.put('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const updatedUser = req.body;

  const db = readDB();
  const userIndex = db.users.findIndex(user => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  db.users[userIndex] = { ...db.users[userIndex], ...updatedUser };
  writeDB(db);

  res.status(200).json(db.users[userIndex]);
});



// Route to get all courses
app.get('/courses', (req, res) => {
  const db = readDB();
  res.json(db.courses || []);
});

// Route to get a single course by ID
app.get('/courses/:id', (req, res) => {
  const db = readDB();
  const course = db.courses.find(course => course.id === parseInt(req.params.id, 10));
  if (course) {
    res.json(course);
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
