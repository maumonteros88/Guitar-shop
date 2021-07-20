const path = require('path');
const environment_var = require('../config/environment_var');
const simplecrypt = require('simplecrypt');

const sc = simplecrypt({
  password: environment_var.secret_key,
  salt: '10',
  method: 'aes256',
});

const userModel = require('../model/usersModel');

const register = path.join(
  __dirname,
  '../../public/pages/register',
  'register.html'
);
const login = path.join(__dirname, '../../public/pages/login', 'login.html');

exports.index = (req, res) => {
  res.sendFile(login);
};

exports.auth = (req, res) => {
  if (req.body.mail !== '' && req.body.password !== '') {
    const pass_req = req.body.password;
    userModel
      .authUser(req)
      .then((result) => {
        const userFound = result;
        const pass_db = sc.decrypt(userFound.password);

        if (pass_req === pass_db) {
          req.session.mail = userFound.mail;
          req.session.firstname = userFound.firstname;
          req.session.lastname = userFound.lastname;
          req.session.pic = userFound.pic;
          req.session.dateOfRegister = userFound.dateOfRegister;
          req.session.idUser = userFound._id;
          req.session.profile = userFound.profile === 'admin' ? true : false;
          if (userFound.carrito != undefined) {
            req.session.carritoCount = userFound.carrito.length;
          }

          res.status(200).send({ success: true, message: 'ok' });
        } else {
          res
            .status(200)
            .send({ success: false, message: 'Datos de ingreso incorrectos' });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    res
      .status(200)
      .send({ success: false, message: 'Debe ingresar datos para la sesión' });
  }
};

exports.registerIndex = (req, res) => {
  res.sendFile(register);
};

exports.newRegister = async (req, res) => {
  const data = req.body;
  if (data.password === data.passrepeat) {
    userModel
      .userFindOne(data)
      .then((result) => {
        const userFound = result;
        if (!userFound) {
          const hora = new Date().toString();
          const dateOfRegister = hora.slice(4, 16);
          const newUser = {
            mail: data.mail,
            firstname: data.firstname,
            lastname: data.lastname,
            pic: data.pic,
            password: sc.encrypt(data.password),
            dateOfRegister: dateOfRegister,
            profile: 'user',
          };
          userModel.userRegister(newUser);

          res.redirect('/');
        } else {
          res.redirect('/users/register');
        }
      })
      .catch((error) => console.log(error));
  } else {
    res.redirect('/users/register');
  }
};

exports.signOut = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};
