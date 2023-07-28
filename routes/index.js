var express = require("express");
var router = express.Router();
const tokenValidate = require("../middleware/tokencheck");

// module.exports = function(app){
const usercontroller = require('../controller/usercontroller.js')
const mailController = require('../controller/mailController.js')
const productController = require('../controller/productController.js')

router.post('/register', usercontroller.register);

router.post('/login', usercontroller.login);

router.post('/add-product', tokenValidate(), productController.addProduct);

router.get('/products', tokenValidate(), productController.listProduct);

router.delete('/product/:id', tokenValidate(), productController.deleteProduct);

router.get('/product/:id', tokenValidate(), productController.editDataProduct);

router.put('/product/:id', tokenValidate(), productController.editDataChangeProduct);

router.get('/search/:key', tokenValidate(), productController.searchProduct);

router.get('/sendmail', mailController.sendMails);

module.exports = router;

// }