const express = require('express');
const router = express.Router();

const home = require('../../controller/homeController');

router.get('/', home.index);
router.get('/perfil', home.indexPerfil);
router.get('/carrito', home.carritoIndex);
router.get('/add', home.add);
router.get('/deleteAll', home.deleteAll);
router.get('/buy', home.buy);
router.get('/buscar', home.search);
router.get('/finishBuy',home.finishBuy)

module.exports = router;
