const nodemailer = require("nodemailer");


exports.sendMails = async function (req, res, next) {  
   const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      auth: {
         user: 'esther76@ethereal.email',
         pass: 'GQ72M9b7bRkBZB6G87'
      }
    });
    console.log('mail receive')

    const info =  transporter.sendMail({
      from: '"Fred Foo 👻" <esther76@ethereal.email>', // sender address
      to: "krupa.bhatt@cmarix.com",
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });

    console.log('mail send')
}