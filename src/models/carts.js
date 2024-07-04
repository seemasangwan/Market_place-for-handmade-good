const mongoose=require('mongoose');
const Customer = require('./customers');
const cartItemschema=mongoose.Schema({
    product:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    quantity:{type:Number,
        default:1
    }
});
const cartschema=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,
        ref:'Customer',
        required:true
    }
});

const Cart=mongoose.model('Cart',cartschema);
module.exports=Cart;

