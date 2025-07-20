const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

const DATA_FILE = path.join(__dirname, 'users.json');

function readUsers() {
  if (!fs.existsSync(DATA_FILE)) return {};
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch {
    return {};
  }
}

function writeUsers(users) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
}

// تسجيل مستخدم جديد
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Username and password required' });

  const users = readUsers();
  if (users[username]) return res.status(400).json({ message: 'Username already exists' });

  users[username] = { password };
  writeUsers(users);

  res.json({ message: 'User registered successfully' });
});

// تسجيل الدخول
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Username and password required' });

  const users = readUsers();
  if (!users[username]) return res.status(404).json({ message: 'User not found' });
  if (users[username].password !== password) return res.status(401).json({ message: 'Incorrect password' });

  res.json({ message: 'Login successful', user: { username } });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
