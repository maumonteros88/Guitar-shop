require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const URL = process.env.DB_HOST;

const connect = async () => {
  try {
    const client = await MongoClient.connect(URL, { useUnifiedTopology: true });
    const db = client.db('guitarshop');
    return db;
  } catch (error) {
    console.log(error);
  }
};

module.exports = connect;
