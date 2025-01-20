const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');

dotenv.config()

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT , () => console.log('listening on port ' + PORT));