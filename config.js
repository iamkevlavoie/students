// Setting up our database connection
const Sequelize = require('sequelize');
const config = new Sequelize("roboschool", "root1", "password", {dialect: 'mysql'});

module.exports = config; 