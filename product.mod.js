const mongoose = require('mongoose');
const crypto = require('crypto');

const productSchema = new mongoose.Schema({
    uuid: {type: String, required: false},
    productName:{type: String, require: true, trim: true},
    quantity:{type: Number, require: true},
    price:{type: String, require: true},
    brand:{type:String, require:true},
    flavour:{type: String, require: false},
    biscategory:{type: String, require: true},
    incridients:{type: String, require: false},
    expireDate:{type: String, require: true, trim: true},
    productImage:{type: String, require: true},
    active:{type: Boolean, require: false, defaukt: true},
},
{
    timestamp: true
}
})