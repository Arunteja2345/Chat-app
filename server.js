const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const messages = [];

app.post('/send-message', express.json(), (req, res) => {
  const { message } = req.body;
  if (message && message.trim() !== '') {
    messages.push(message);
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false });
  }
});

app.get('/get-messages', (req, res) => {
  res.json(messages);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
