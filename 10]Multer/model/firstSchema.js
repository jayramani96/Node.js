const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    }
})

const firstSchema = mongoose.model ("First Database", schema);

module.exports = firstSchema;