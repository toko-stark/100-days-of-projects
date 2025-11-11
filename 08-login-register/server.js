import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const readUsers = () => {
  try {
    return JSON.parse(fs.readFileSync('./user.json', 'utf-8'));
  } catch {
    return [];
  }
};

const writeUsers = (users) => {
  fs.writeFileSync('./user.json', JSON.stringify(users, null, 2));
};

app.post('/api/:login_register_type', (req, res) => {
  const { login_register_type } = req.params;
  const data = req.body;

  if (!data || Object.keys(data).length === 0) {
    return res
      .status(400)
      .json({ success: false, message: 'No data provided' });
  }

  if (login_register_type !== 'login' && login_register_type !== 'register') {
    return res
      .status(404)
      .json({ success: false, message: 'Endpoint not found' });
  }

  const users = readUsers();

  if (login_register_type === 'login') {
    let { user, password } = data;

    if (!user || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'Missing user or password' });
    }

    user = user.trim().toLowerCase();

    const foundUser = users.find(
      (u) =>
        (u.username && u.username.toLowerCase() === user) ||
        (u.email && u.email.toLowerCase() === user)
    );

    if (!foundUser) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    if (foundUser.password !== password) {
      return res
        .status(400)
        .json({ success: false, message: 'Incorrect password' });
    }

    return res.json({ success: true, message: 'Login successful' });
  } else if (login_register_type === 'register') {
    let { username, email, password } = data;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: 'Missing required fields' });
    }

    username = username.trim().toLowerCase();
    email = email.trim().toLowerCase();
    password = password.trim();

    const existingUser = users.find(
      (u) =>
        (u.username && u.username.toLowerCase() === username) ||
        (u.email && u.email.toLowerCase() === email)
    );

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: 'User already exists' });
    }

    // Add new user and persist to fil
    users.push({ username, email, password });
    writeUsers(users);

    return res.json({ success: true, message: 'Register successful' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
