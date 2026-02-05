const express = require('express');
const routes = require('./routes');
const pool = require('./db');

const app = express();
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  try {
    await pool.query('SELECT 1');
    console.log('✅ Database connected');
  } catch (err) {
    console.error('❌ Database connection failed');
  }
  console.log(`🚀 Server running on port ${PORT}`);
});
