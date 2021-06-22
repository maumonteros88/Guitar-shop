const connect = require('../config/database');
const ObjectID = require('mongodb').ObjectID;

exports.findAll = async () => {
  const db = await connect();
  const allProducts = await db.collection('products').find({}).toArray();
  return allProducts;
};

exports.carrito = async (idUser) => {
  const db = await connect();
  const carrito = await db
    .collection('users')
    .findOne({ _id: ObjectID(idUser) });
  return carrito;
};

exports.carritoAdd = async (id, newProductAdd) => {
  const db = await connect();
  await db
    .collection('users')
    .findOneAndUpdate(
      { _id: ObjectID(id) },
      { $push: { carrito: newProductAdd } },
      { upsert: true }
    );

  const count = await db.collection('users').findOne({ _id: ObjectID(id) });
  return count.carrito;
};

exports.deleteCarrito = async (id) => {
  const db = await connect();
  await db
    .collection('users')
    .findOneAndUpdate(
      { _id: ObjectID(id) },
      { $unset: { carrito: '' } },
      { upsert: true }
    );
};
