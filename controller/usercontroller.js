const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const User = require('../model/User');
const Jwt = require('jsonwebtoken');
const jwtkey = 'e-comm'
const UserService = require("../services/user.service");
const { Validator } = require("node-input-validator");
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



exports.login = async function(req, res, next) {

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