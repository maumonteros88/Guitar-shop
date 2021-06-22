const connect = require('../config/database');

exports.authUser = async (req) => {
  const mail = req.body.mail;
  const password = req.body.password;

  const db = await connect();
  const users = await db
    .collection('users')
    .findOne({ mail: mail, password: password });
  return users;
};


exports.userFindOne = async (body) => {
  const mail = body.mail;
  const db = await connect();
  const user = await db.collection('users').findOne({ mail: mail });
  return user;
};

exports.userRegister = async (newUser) => {
  const db = await connect();
  await db.collection('users').insertOne(newUser);
};