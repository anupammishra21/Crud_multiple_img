const mongoose = require('mongoose')
const schemae = mongoose.Schema

const crudSchema = schemae({
    name:{type:String},
    gender:{type:String},
    email:{type:String},
    address:{type:String},
    hobby:[{type:String}],
    citizen:{type:String},
    image:[{type:String}],
    isDeleted:{type:Boolean,enum:[true,false], default:false}
},{
    timestamps: true,
    versionKey: false
})


module.exports = mongoose.model('multiinput',crudSchema)