const mongoose = require('mongoose');

const authUserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    image: {
        type: String
    }
});

const authUser = mongoose.model('social-login', authUserSchema);

module.exports = authUser;