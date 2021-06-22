const ObjectID = require('mongodb').ObjectID;

const homeModel = require('../model/homeModel');

exports.index = (req, res) => {
  if (!req.session.mail) {
    res.redirect('/');
    return;
  }
  homeModel
    .findAll()
    .then((result) => {
      res.render('home', {
        guitar: result,
        pic: req.session.pic,
        profile: req.session.profile,
        cantidad: req.session.carritoCount,
      });
    })
    .catch((error) => console.log(error));
};

exports.indexPerfil = (req, res) => {
  if (!req.session.mail) {
    res.redirect('/');
    return;
  }
  res.render('perfil', {
    mail: req.session.mail,
    firstname: req.session.firstname,
    lastname: req.session.lastname,
    pic: req.session.pic,
    date: req.session.dateOfRegister,
    idUser: req.session.idUser,
    cantidad: req.session.carritoCount,
  });
};

exports.carritoIndex = (req, res) => {
  if (!req.session.mail) {
    res.redirect('/');
    return;
  }
  homeModel
    .carrito(req.session.idUser)
    .then((result) => {
      let suma = 0;
      if (result.carrito != undefined) {
        result.carrito.forEach((producto) => {
          suma += producto.precio;
        });
      }

      res.render('carrito', {
        titulo: 'Carrito de compras',
        pic: req.session.pic,
        cantidad: req.session.carritoCount,
        datos: result.carrito,
        total: suma,
      });
    })
    .catch((error) => console.log(error));
};

exports.add = (req, res) => {
  if (!req.session.mail) {
    res.redirect('/');
    return;
  }
  const newProductAdd = {
    // @ts-ignore
    id: ObjectID(req.query.id),
    model: req.query.model,
    detalles: req.query.detalles,
    precio: parseInt(req.query.precio),
  };
  homeModel
    .carritoAdd(req.session.idUser, newProductAdd)
    .then((result) => {
      req.session.carritoCount = result.length;
      res.json(result.length);
    })
    .catch((error) => console.log(error));
};

exports.deleteAll = (req, res) => {
  if (!req.session.mail) {
    res.redirect('/');
    return;
  }
  homeModel
    .deleteCarrito(req.session.idUser)
    .then(() => {
      req.session.carritoCount = '';

      res.redirect('/home');
    })
    .catch((error) => console.log(error));
};

exports.buy = (req, res) => {
  if (!req.session.mail) {
    res.redirect('/');
    return;
  }

  homeModel
    .carrito(req.session.idUser)
    .then((result) => {
      let suma = 0;
      if (result.carrito != undefined) {
        result.carrito.forEach((producto) => {
          suma += producto.precio;
        });
      }

      res.render('buy', {
        titulo: 'Guitar Shop',
        mail: req.session.mail,
        firstname: req.session.firstname,
        lastname: req.session.lastname,
        pic: req.session.pic,
        date: req.session.dateOfRegister,
        idUser: req.session.idUser,
        cantidad: req.session.carritoCount,
        carrito: result.carrito,
        total: suma,
      });
    })
    .catch((error) => console.log(error));
};

exports.search = (req, res) => {
  if (!req.session.mail) {
    res.redirect('/');
    return;
  }

  homeModel
    .findAll()
    .then((result) => {
      let search = req.query.search;
      let resultProduct = result;

      if (search) {
        resultProduct = resultProduct.filter((element) =>
          element.marca
            .toLocaleLowerCase()
            .includes(search.toString().toLocaleLowerCase())
        );
      }
      res.render('search', {
        guitar: resultProduct,
        pic: req.session.pic,
        cantidad: req.session.carritoCount,
      });
    })
    .catch((error) => console.log(error));
};

exports.finishBuy = (req, res) => {
  if (!req.session.mail) {
    res.redirect('/');
    return;
  }

  homeModel
    .deleteCarrito(req.session.idUser)
    .then(() => {
      req.session.carritoCount = '';

      res.render('finishbuy', {
        titulo: 'Muchas gracias por la compra',
        firstname: req.session.firstname,
        mail: req.session.mail,
        pic: req.session.pic,
        cantidad: req.session.carritoCount,
      });
    })
    .catch((error) => console.log(error));
};
