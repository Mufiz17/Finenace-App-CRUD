const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const userRoutes = require('./routes/userRoute');
const financeRoutes = require('./routes/financeRoute');
const reminderRoutes = require('./routes/reminderRoute');

app.use('/api/users', userRoutes);
app.use('/api/finances', financeRoutes);
app.use('/api/reminders', reminderRoutes);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
