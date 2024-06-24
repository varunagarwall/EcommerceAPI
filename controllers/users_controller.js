const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


module.exports.createuser = async function (req, res) {
    try {
        // if (req.body.password != req.body.confirm_password) {
        //     return res.redirect('back');
        // }
        console.log(req.body);

        
        let user = await User.create(req.body);

        const register = await user.save();

        res.status(201).json({
            success: true,
            message: 'user created successfully',
            data: user,
        });

        //  User.findOne({ email: req.body.email }, function (err, user) {
        //         if (err) { console.log('error in finding user in signing up'); return }

        //         if (!user) {
        //             User.create(req.body, function (err, user) {
        //                 if (err) { console.log('error in creating user while signing up'); return }

        //                 return res.status(200).json({
        //                     success: true,
        //                     message: 'Doctor registered successfully',
        //                     data :user,
        //                 })
        //             })
        //         } else {
        //             return res.redirect('back');
        //         }

        //     });
    }
    catch (error) {
        console.log('******', error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

module.exports.loginUser = async function (req, res) {
    try {
        console.log(req.body)
        const password = req.body.password;
        let user = await User.findOne({ email: req.body.email });

        const ismatch = await bcrypt.compare(password,user.password);

        if (ismatch) {
            return res.status(200).json({
                message: "Signed In Successfully",
                data: {
                    token: jwt.sign(user.toJSON(), 'codeial', { expiresIn: '100000' })
                }
            })
           
        }

        return res.status(200).json( {
            message: "Invalid Email or Password"

        });
        
    }
    catch (err) {
        console.log('******', err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }

}

module.exports.getaUser = async function (req, res) {
    try {
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }
        return res.json(200, {
            message: "User Found",
            data: user
        });
    }
    catch (error) {
        console.log('******', error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

module.exports.getallUsers = async function (req, res) {
    try {
        let user = await User.find();
        return res.json(user);

    } catch (error) {
        console.log('******', error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}


module.exports.deleteaUser = async function (req, res) {
    try {
        let user = await User.findByIdAndDelete(req.params.id);

        return res.json({
            message: "User Deleted Successfully"
        });


    } catch (error) {
        console.log('******', err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

module.exports.updateaUser = async function (req, res) {
    try {
        let user = await User.findByIdAndUpdate(req.params.id, {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            mobile: req.body.mobile,
            email: req.body.email
        });
        return res.json({
            message: "User Updated Successfully",
            data: user
        });
    } catch (error) {
        console.log('******', error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}


// module.exports.destroySession = async function (req, res) {
//     try {
//         req.logout(req.user, err => {
//             if (err) return next(err);
//         });

//     } catch (error) {
//         console.log('******', error);
//         return res.status(500).json({
//             message: "Internal Server Error"
//         });
//     }
// }