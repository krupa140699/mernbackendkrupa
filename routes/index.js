var express = require("express");
var router = express.Router();
const tokenValidate = require("../middleware/tokencheck");

// module.exports = function(app){
const usercontroller = require('../controller/usercontroller.js')
const mailController = require('../controller/mailController.js')
const productController = require('../controller/productController.js')
const productCategoryController = require('../controller/productCategoryController')


router.post('/register', usercontroller.register);

router.post('/login', usercontroller.login);

router.post('/email-send', usercontroller.emailSend);

router.post('/change-password', usercontroller.changePassword);

router.post('/add-product', tokenValidate(), productController.addProduct);

router.post('/add-productCategory', tokenValidate(), productCategoryController.addProductCategory);

router.get('/products', tokenValidate(), productController.listProduct);

router.get('/productWithCategory', tokenValidate(), productCategoryController.listproductWithCategory);

router.get('/productCategory', tokenValidate(), productCategoryController.listProductCategory);

router.delete('/product/:id', tokenValidate(), productController.deleteProduct);

router.get('/product/:id', tokenValidate(), productController.editDataProduct);

router.put('/product/:id', tokenValidate(), productController.editDataChangeProduct);

router.get('/search/:key', tokenValidate(), productController.searchProduct);

router.delete('/productCategory/:id', tokenValidate(), productCategoryController.deleteProductCategory);

router.get('/sendmail', mailController.EmailSender);

module.exports = router;

// }