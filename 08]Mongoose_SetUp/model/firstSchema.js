const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name: {
        type : String,
        require : true
    },
    city: {
        type : String,
        require : true
    }
})

const firstSchema = mongoose.model("FirstDataBase",schema);

module.exports = firstSchema;