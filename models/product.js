const mongoose= require('mongoose');
const timestamps = require('mongoose-timestamp');

const productSchema = new mongoose.Schema ({
    title:{
        type:String,
        // required:true,
        // trim:true
    },
    slug:{
        type:String,
        // required:true,
    },
    descrition:{
        type:String,
        // required:true,
        // unique:true
    }, 
    price: {
        type: Number,
        // required:true
    },
    quantity:{ 
        type: Number,
        // required:true
    },
    category: {
        type:String,    
    },
     address:{
        type:String,    
     },
    colour:{
        type:String,   
    },
    brand:{
        type:String, 
    },
    images:{
         type:Array,
    },
    rating:[
        {
        star:Number,
        postedby: [
            {type: mongoose.Schema.Types.ObjectId,
              ref: 'User'}
        ],
    }]

},
{ timestamps: true });



const Product= mongoose.model('Product',productSchema);
module.exports=Product;