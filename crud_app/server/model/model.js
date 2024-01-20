const mongoose = require('mongoose')

var Schema = new mongoose.Schema({
    name : {
        type : String,
        required :true
    },
    email : {
        type:String,
        required:true,
        unique:true
    },
    gender:String
})

const Userdb = mongoose.model('userdb',Schema)
module.exports = Userdb