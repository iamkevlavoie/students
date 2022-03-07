const Sequelize = require('sequelize');
const config = require('./../config');

const Student = config.define('Student', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    fname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    gpa: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    department: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nationality: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {timestamps: false});

module.exports = Student;
