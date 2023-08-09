const nodemailer = require("nodemailer");
var ejs = require("ejs");


module.exports = class EmailSenderClass {
   static async EmailSender(email_data, template_location, to) {

      let aPromice = new Promise(function (resolve, reject) {
         try {
            const transporter = nodemailer.createTransport({
               host: "smtp.ethereal.email",
               port: 587,
               auth: {
                  user: 'ryder71@ethereal.email',
                  pass: 'xQjCw3ZVuec3avJ6zc'
              }
            });
            ejs.renderFile(template_location, email_data, function (err, data) {
               if (err) {
               } else {
                  transporter.sendMail({
                     from: 'ryder71@ethereal.email', // sender address
                     to: "krupa.bhatt@cmarix.com",
                     subject: "Otp for reset password", // Subject line
                     text: '', // plain text body
                     html: data, // html body
                  }, function (err, info) {
                     if (err) {
                        reject(err);
                     } else {
                        resolve(info.response);
                     }

                  });
               }


            })
         } catch (error) {
            reject(error);
         }
      }
      )
      return aPromice;
   }

}