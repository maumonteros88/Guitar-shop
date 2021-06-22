const connect = require('../config/database');

exports.userFindOne = async (body) => {
  const mail = body.mail;
  const db = await connect();
  const user = await db.collection('users').findOne({ mail: mail });
  return user;
};

exports.adminRegister = async (newUser) => {
  const db = await connect();
  await db.collection('users').insertOne(newUser);
};
