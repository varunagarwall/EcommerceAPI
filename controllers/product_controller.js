const Product = require('../models/product');
const jwt = require('jsonwebtoken');
const slugify = require('slugify');


module.exports.createproduct  = async function (req, res) {
    try {
        if(req.body.title){
            req.body.slug= slugify(req.body.title);
        }
        let product =  Product.create(req.body);
        return res.status(200).json({
            message: "product created",
            data :product
        })
    }
    catch (error) {
        console.log('******', error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

module.exports.getproduct     = async function (req, res) {
try {
    const product =await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({
            message: "product Not Found"
        });
    };
    return res.json(200, {
        message: "product Found",
        data: product
    });
} catch (error) {
    console.log('******', error);

    return res.status(500).json({
        message: "Internal Server Error"
    });
}

}

module.exports.allproduct     = async function (req, res) {
    try {
        // let  product = await Product.find(req.query);
    
        //    let  product = await Product.find({
    //     brand: req.query.brand,
    //     category:req.query.category
        
    // });
    
        //  let  product = await Product.where('category').equals(req.query.category);
// Filtering
const queryobj = {...req.query};
console.log(queryobj)
const excludefileds = ["page","sort","limit","fields"];
excludefileds.forEach(el => delete queryobj[el]);
console.log(queryobj,req.query);
let queryStr = JSON.stringify(queryobj);
queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

let query = Product.find(JSON.parse(queryStr));

// Sorting 
if(req.query.sort){
    const sortby = req.query.sort.split(",").join(" ");
    query = query.sort(sortby);

}else{
    query = query.sort('-createdAt');
}
// limiting the fields
if(req.query.fields){
    const fields = req.query.fields.split(",").join(" ");
    query = query.select(fields);

}else{
    query = query.select('-__v');
}


//pagination

const page = req.query.page;
const limit= req.query.limit;
const skip = (page -1) * limit;
query = query.skip(skip).limit(limit)
if(req.query.page){
    const numproduct = await Product.countDocuments();
    console.log(numproduct)  
      if(skip >= numproduct) throw new Error('error');
}

console.log(page, limit, skip)
// console.log(JSON.parse(queryStr));
const product = await query;
//  let query = await Product.find(queryobj);
 res.json(product);
        // return res.status(200).json ({
        //     message: "products Found",
        //     data:query
        // })

      
    } catch (error) {
        console.log('******', error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

module.exports.deleteaProduct = async function (req, res) {
    try {
        let product = await Product.findByIdAndDelete(req.params.id);

        return res.json({
            message: "product Deleted Successfully"
        });


    } catch (error) {
        console.log('******', err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

module.exports.updateaProduct = async function (req, res) {
    let id = req.params

    try {
        console.log(req.params)
        if(req.body.title){
            req.body.slug= slugify(req.body.title);
        }
        let product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true})

        console.log(product)
        return res.json({
            message: "User Updated Successfully",
            data: product
        });
    } catch (error) {
        console.log('******', error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

