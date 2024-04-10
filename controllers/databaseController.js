//controllers/databaseController.js
const { sequelize } = require('../config/database');

exports.fetchData = async (req, res) => {
  const { tableName, columns } = req.params; // Assuming you pass these as URL parameters
  try {
    const data = await sequelize.query(
      `SELECT ${columns} FROM ${tableName}`, 
      { type: sequelize.QueryTypes.SELECT }
    );
    res.render('dataView', { data }); // Assuming you have a dataView.ejs file in your views directory
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).send('Error fetching data');
  }
};


  
