const express = require('express');
const cors = require('cors');
const { getExpenses, appendExpense } = require('./sheets');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Test route
app.get('/', (req, res) => {
  res.send('Club Expense Server is running!');
});

// Get all expenses
app.get('/api/expenses', async (req, res) => {
  try {
    const expenses = await getExpenses();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new expense
app.post('/api/expense', async (req, res) => {
  try {
    const { date, amount, category, description, treasurer } = req.body;
    await appendExpense([date, amount, category, description, treasurer]);
    res.status(200).json({ success: true, message: 'Expense added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
