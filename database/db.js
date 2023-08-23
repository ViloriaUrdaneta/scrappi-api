require('dotenv').config();
const Sequelize = require('sequelize');
const db = require('../config/dbConfig')


let sequelize;
if (process.env.NODE_ENV === 'development'){
    sequelize = new Sequelize(db.database, db.username, db.password, {
        host: db.host,
        dialect: db.dialect
    });
}else {
    sequelize = new Sequelize(db.database, db.username, db.password, {
        host: db.host,
        dialect: db.dialect,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    });
}

const database = {};

database.Sequelize = Sequelize;
database.sequelize= sequelize;

database.goodNews = require('../models/goodNew')(sequelize, Sequelize);
database.badNews = require('../models/badNew')(sequelize, Sequelize);

module.exports = database