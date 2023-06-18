const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type:String,
        requires:true,
        unique:true,
        match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    },
    password: {
        tyoe:String,
        required:true
    },
    name:String,
    user_type:String,
});

module.exports = mongoose.model('User', userSchema);