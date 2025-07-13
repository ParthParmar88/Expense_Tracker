const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const ExpenseRouter = require('./Routes/ExpenseRouter');
const ensureAuthenticated = require('./Middlewares/Auth');

require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;

// ✅ Updated CORS Configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL,  // e.g., "https://expense-tracker-ruby-xi-45.vercel.app"
    credentials: true,
};

app.use(cors(corsOptions));

// ✅ Allow preflight requests
app.options('*', cors(corsOptions));

app.use(bodyParser.json());

// 🔧 Routes
app.get('/ping', (req, res) => {
    res.send('PONG');
});
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);
app.use('/expenses', ensureAuthenticated, ExpenseRouter);

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
