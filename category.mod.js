const mongoose = require('mongoose');
const crypto = require('crypto');
const { stringify } = require('querystring');

const productSchema = new mongoose.Schema({
    uuid:{type: String, required: false},
    categoryName: {typr: String, required: true, trim: true},
    categoryDescr: {type: String, required: false, trim: true},
    useruuid: {type: stringify, required: true}
},
{
    timestamps: true
});

//UUID generation
categorySchema.pre('save', function(next){
    this.uuid = 'CATE-'+crypto.pseudoRandomBytes(6).toString('hex').toupperCase()
    console.log(this.uuid);
    next();
});

module.exports=mongoose.model('category', categorySchema, 'category');