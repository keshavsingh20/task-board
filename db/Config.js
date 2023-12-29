const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config();

const dbConnectionUrl = process.env.DB_URL;

async function connect() {
    const db = await mongoose.connect(dbConnectionUrl);
    console.log('Database Connected Successfully...!');

    return db;
}

module.exports = connect;