//controllers/databaseController.js
const sequelize = require('../config/database');

exports.getData = async (req, res) => {
  try {
    const { tableName, columnNames, allColumns } = req.body;
    let query = '';
    if (allColumns || !columnNames) {
      query = `SELECT * FROM ${tableName}`;
    } else {
      query = `SELECT ${columnNames} FROM ${tableName}`;
    }

    const results = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    
    res.render('results', { data: results });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while fetching the data.');
  }
};

  
