const mongoose = require('mongoose');
const crypto = require('crypto');
const { stringify } = require('querystring');

const productSchema = new mongoose.Schema({
    uuid:{ type: String, required: false},
    email:{type: String, required: true, trim: true, unique: true},
    firstName:{type: String, required: true},
    lastName:{type: stringify, required: true},
    userName:{type: String, required: true, trim: true, unique: true},
    Password:{type: stringify, required: true},
    CountryCode:{type: String, required: true},
    mobileNumber:{type: String, required: true},
    DOB:{type: String, required: true},
    address:{type: Array, required: false},
    City:{type: String, required: false},
    state:{type: stringify, required: false},
    country:{type: String, required: false},
    pincode:{type: String, required: false},
    CurrentLoc:{type: Object, required: false},
    gender:{type: String, enum: ['male','female','transgender'], required: true},
    profileimage:{type: String, required: false},
    verifiedUser:{type: Boolean, required: false, default: false},
    lastVisited:{type: String, required: false},
    loginstatus:{type: Boolean, required: false, default: false},
    firstLoginstatus:{type: Boolean, required: false, default: false},
},{
    timestamps: true
});

userSchema.pre('save', function(next){
    this.uuid = "USER." + crypto.pseudoRandomBytes(6).toString('hex').toUpperCase()
        next()
});