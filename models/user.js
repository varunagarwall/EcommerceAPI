const mongoose= require('mongoose');
const timestamps = require('mongoose-timestamp');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema ({
    firstname:{
        type:String,
        // required: 'Please enter your name',
    },
    lastname:{
        type:String,
        // required:true,
    },
    email:{
        type:String,
        // required:true,
        unique:true
    }, 
    password: {
        type: String,
        // required:true

    },
    mobile:{
        type:String,
        required:true
    },
    cart:{
        type:Array,
        default:[]
    },
    wishlist: [{type: mongoose.Schema.Types.ObjectId,ref: 'Wishlist'}],
     address: [{type: mongoose.Schema.Types.ObjectId,ref: 'Address'}],

    // avatar:{
    //     type:String,
    // }
},
{ timestamps: true });

// let storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.join(__dirname,'..',AVATAR_PATH));
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
//   })

 

// static function
// userSchema.statics.uploadedAvatar = multer({storage:  storage}).single('avatar');
// userSchema.statics.avatarPath = AVATAR_PATH;
userSchema.pre("save", async function (next){

console.log(`the password  is ${this.password}`)
this.password= await bcrypt.hash(this.password,10);
console.log(`the password  is ${this.password}`)


next();
})
const User= mongoose.model('User',userSchema);
module.exports=User;