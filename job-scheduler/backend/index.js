
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'job_scheduler'
});

app.post('/jobs', (req, res) => {
  const { taskName, payload, priority } = req.body;
  db.query(
    'INSERT INTO jobs (taskName, payload, priority, status) VALUES (?, ?, ?, ?)',
    [taskName, JSON.stringify(payload), priority, 'pending'],
    () => res.send({ message: 'Job Created' })
  );
});

app.get('/jobs', (req, res) => {
  db.query('SELECT * FROM jobs', (err, results) => {
    res.send(results);
  });
});

app.post('/run-job/:id', (req, res) => {
  const id = req.params.id;
  db.query('UPDATE jobs SET status="running" WHERE id=?', [id]);

  setTimeout(async () => {
    db.query('UPDATE jobs SET status="completed" WHERE id=?', [id]);
    await axios.post('https://webhook.site/your-id', { jobId: id });
  }, 3000);

  res.send({ message: 'Job Running' });
});

app.listen(5000, () => console.log('Backend running on 5000'));
