var express = require("express");
var router = express.Router();

// module.exports = function(app){
  const usercontroller = require('../controller/usercontroller.js')
  const mailController = require('../controller/mailController.js')

    router.post('/register', usercontroller.register);

    router.post('/login', usercontroller.login);

    router.get('/sendmail', mailController.sendMails);

    module.exports = router;

// }