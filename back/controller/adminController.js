const adminModel = require('../model/adminModel');

exports.adminIndex = (req, res) => {
  if (!req.session.profile) {
    res.redirect('/');
    return;
  }
  res.render('admin', {
    mail: req.session.mail,
    firstname: req.session.firstname,
    lastname: req.session.lastname,
    pic: req.session.pic,
    date: req.session.dateOfRegister,
    idUser: req.session.idUser,
  });
};

exports.registerAdmin = (req, res) => {
  const data = req.body;
  if (data.password === data.passrepeat) {
    adminModel
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
            password: data.password,
            dateOfRegister: dateOfRegister,
            profile: data.profile,
          };
          adminModel.adminRegister(newUser);

          res.redirect('/');
        } else {
          res.redirect('/admin');
        }
      })
      .catch((error) => console.log(error));
  } else {
    res.redirect('/admin');
  }
};
