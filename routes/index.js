const express = require('express');
const router = express.Router();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const sequelize = require('../config/database');

router.get('/', (req, res) => {
  res.render('index');
});

// Route for database data retrieval
router.post('/fetch-data', async (req, res) => {
  const { tableName, columns } = req.body; // Assuming you have a form that submits these fields
  const query = `SELECT ${columns || '*'} FROM ${tableName}`;
  try {
    const [results, metadata] = await sequelize.query(query);
    res.render('results', { results });
  } catch (error) {
    console.error(error);
    res.send('Error retrieving data');
  }
});

// Route for API data retrieval
router.get('/fetch-api-data', async (req, res) => {
    const { apiEndpoint } = req.query;
    try {
      const response = await fetch(apiEndpoint);
      const data = await response.json();
      res.render('apiData', { data });
    } catch (error) {
      console.error('Error fetching API data:', error);
      res.status(500).send('Error fetching API data');
    }
  });

module.exports = router;