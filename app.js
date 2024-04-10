//app.js
require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const indexRouter = require('./routes/index');

const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use('/', indexRouter);

//Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}.`);
  try {
    await sequelize.authenticate();
    console.log('Database connected.');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
});
