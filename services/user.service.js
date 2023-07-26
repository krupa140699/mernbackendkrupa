const User = require("../model/User");

exports.checkEmail = async function (email) {

    try {
        const checkEmail = await User.find({ email: email });
        return checkEmail;
      } catch (error) {
        throw error;
      }
}