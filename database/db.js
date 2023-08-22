const Sequelize = require('sequelize');
const db = require('../config/dbConfig')

const sequelize = new Sequelize(db.database, db.username, db.password, {
    host: db.host,
    dialect: db.dialect
});

const database = {};

database.Sequelize = Sequelize;
database.sequelize= sequelize;

database.goodNews = require('../models/goodNew')(sequelize, Sequelize);
database.badNews = require('../models/badNew')(sequelize, Sequelize);

module.exports = database