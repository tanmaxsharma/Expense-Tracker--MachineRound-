require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions');
const categoryRoutes = require('./routes/categories');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/categories', categoryRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('DB_USER:', process.env.DB_USER);
  console.log('DB_NAME:', process.env.DB_NAME);
  console.log('DB_HOST:', process.env.DB_HOST);
});