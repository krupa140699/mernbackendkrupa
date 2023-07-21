
module.exports = function(app){
  const usercontroller = require('../controller/usercontroller.js')
  const mailController = require('../controller/mailController.js')
    app.get('/users',usercontroller.getUsers);
  
    app.get('/posts', function(request, response){
       response.send("Simple Call posts Route from Here!");
    });

    app.get('/sendmail', mailController.sendMails);
}