const express = require('express');
const expSession = require('express-session');
const path = require('path');
const app = express();
const expHbs = require('express-handlebars');
const Handlebars = require("handlebars");
const NumeralHelper = require("handlebars.numeral");
 
const appRoutes = require('./routes/routes');

const PORT = process.env.PORT || 3004;

NumeralHelper.registerHelpers(Handlebars);
app.engine(
  'handlebars',
  expHbs({
    defaultLayout: 'main',
    layoutsDir: 'views/layouts',
  })
);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '../views'));

app.use(
  expSession({
    secret:
      ',m.nlkcazxdfsñ,.lmjkncvfaxsdzm,.ncxzv,m.n-czxv.,jmk-cxvz.,-mjkczxv',
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.use(appRoutes);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log('Server is up and listening on PORT:', PORT);
});
