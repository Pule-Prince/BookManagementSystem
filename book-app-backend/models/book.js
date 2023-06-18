const mongoose = require('mongoose');

//On the 23 video has 'userSchema'
const bookSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title:{
        type:String,
        required:true,
        required:true,
    },
    author: {
        type:String,
        isbn:Number,
        price: {
            type:Number,
            required:true,
        },
    }
});

module.exports = mongoose.model('Book', bookSchema);