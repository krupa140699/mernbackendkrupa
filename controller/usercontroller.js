const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const User = require('../model/User');
const UserService = require("../services/user.service");
const { Validator } = require("node-input-validator");
const Jwt = require('jsonwebtoken');
const Otp = require('../model/Otp');
const EmailSenderClass = require('./mailController');
const jwtkey = 'e-comm'
app.use(express.json())
app.use(cors());

exports.register = async function (req, res, next) {

    try {
        var message = "Register sucessfully.";
        const v = new Validator(req.body, {
            name: "required",
            email: "required",
            password: "required",
        });

        const matched = await v.check();
        if (!matched) {
            return res.status(404).send(v.errors);
        }
        const checkEmail = await UserService.checkEmail(req.body.email);

        if (checkEmail.length > 0) {
            message = "Email already exist.";
            return res
                .status(404)
                .json({ data: [], success: false, message: message });
        } else {
            const salt = await bcrypt.genSalt(10);
            let user = new User(req.body);
            let result = await user?.save();
            user.password = user.password?.toString()
            user.password = await bcrypt.hash(user.password, salt)
            result = result.toObject();
            Jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    return res.send({ result: 'result not found please try after some time' })
                }
                return res.send({ result, auth: token })
            })
        }
    } catch (error) {
        return res
            .status(404)
            .json({ success: false, message: "Something went to wrong." });
    }
}



exports.login = async function (req, res, next) {

    try {
        var message = "Login sucessfully.";
        const v = new Validator(req.body, {
            email: "required|email",
            password: "required",
        });

        const matched = await v.check();
        if (!matched) {
            return res.status(404).send(v.errors);
        }
        const checkEmail = await UserService.checkEmail(req.body.email);

        if (checkEmail.length == 0) {
            message = "Email does not exist.";
            return res
                .status(404)
                .json({ data: [], success: false, message: message });
        } else {
            if (req.body.password && req.body.email) {
                let user = await User.findOne(req.body).select("-password");
                if (user) {
                    Jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
                        if (err) {
                            res.send({ result: 'result not found please try after some time' })
                        }
                        res.send({ user, auth: token })
                    })
                } else {
                    res.send({ result: "no user found" })
                }
            }
            else {
                res.send({ result: "no user found" })
            }
        }
    } catch (error) {
        return res
            .status(404)
            .json({ success: false, message: "Something went to wrong." });
    }
}


exports.emailSend = async function (req, res, next) {
    try {
        const v = new Validator(req.body, {
            email: "required",
        });

        const matched = await v.check();
        if (!matched) {
            return res.status(404).send(v.errors);
        }
        const checkEmail = await UserService.checkEmail(req.body.email);
        console.log(checkEmail)
        if (checkEmail.length != 0) {
            let Otpcode = Math.floor((Math.random() * 10000 + 1));
            let otpData = new Otp({
                email: req.body.email,
                code: Otpcode,
                expireIn: new Date().getTime() + 300 * 1000
            });
            let otpResponse = await otpData.save();
            var html = './view/ForgetPasswordcode.ejs'
            var user_forgot_password_data = {
                otp: Otpcode,
                title: 'Forgot Password'
            }
            await EmailSenderClass.EmailSender(user_forgot_password_data, html, req.body.email);
            return res.status(200).json({
                success: true,
                data: [],
                message: "OTP send successfully Please check your email.",
            });
        }else{
            return res
            .status(401)
            .json({ success: false, message: "Email is not exist" });
        }

    } catch (error) {
        return res
            .status(401)
            .json({ success: false, message: "Something went to wrong." });
    }
}


exports.changePassword = async function (req, res, next) {

    try {
        const v = new Validator(req.body, {
            password: "required",
        });

        const matched = await v.check();
        if (!matched) {
            return res.status(404).send(v.errors);
        }
        let  data = await Otp.find({email: req.body.email,code: req.body.otpCode});
        if(data){
            let currentTime = new Date().getTime();
            let diff = data.expireIn - currentTime 
            if(diff < 0){
                return res
                .status(401)
                .json({ data: [], success: false, message: 'Token expire' });
            }else{
                let  user = await User.findOne({email: req.body.email}); 
                user.password = req.body.password;
                user.save();
                return res.status(200).json({
                    success: true,
                    data: [],
                    message: "Password change successfully.",
                  });
            }
        }else{
            return res
            .status(401)
            .json({ success: false, message: "Invalid OTP." });  
        }

    } catch (error) {
        return res
            .status(404)
            .json({ success: false, message: "Something went to wrong." });
    }
}

