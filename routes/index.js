//routes/index.js
const express = require('express');
const router = express.Router();
const databaseController = require('../controllers/databaseController');

const API_KEY = '53aa2cd6';
const URL = 'https://www.omdbapi.com/?apikey=' + API_KEY + '&t=';

router.get('/', (req, res) => res.render('index'));
router.post('/', databaseController.getData);

router.get('/api', function(req, res) {
    res.render('api', {title: 'API Data'});
    });
    
router.get('/get-movie', async function(req, res) {
    const movieSearch = req.query.t;
    const response = await fetch(URL + movieSearch);
    const data = await response.json();
    res.json(data);
    });

router.post('/data', databaseController.getData);

module.exports = router;
