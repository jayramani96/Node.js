const mongoose = require("mongoose");

const schema = mongoose.Schema({
    bookImage: {
        type : String,
        require : true
    },
    bookTitle: {
        type : String,
        require : true
    },
    bookAuthor: {
        type : String,
        require : true
    },
    publishDate: {
        type : String,
        require : true
    },
    bookPrice: {
        type : String,
        require : true
    },
    soldCopies: {
        type : String,
        require : true
    }
})

const firstSchema = mongoose.model("FirstDataBase",schema);

module.exports = firstSchema;