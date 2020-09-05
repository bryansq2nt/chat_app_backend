const { validationResult } = require("express-validator")
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const login = async (req,res) => {
    const { email, password } = req.body;

    try {
        
        const userDB = await User.findOne({ email });
        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        const validPassword = bcrypt.compareSync( password, userDB.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'La contraseña no es valida'
            });
        }


        const token = await generateJWT( userDB.id );
        
        return res.status(200).json({
            user: userDB,
            token
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
           error
        })
    }
}


const signup = async (req,res) => {
    var user = new User(req.body);
    var salt = bcrypt.genSaltSync(10);

    var crypted_pass = bcrypt.hashSync(user.password,salt);
    user.password = crypted_pass;

    try {
        const emailExists = await User.findOne({email: user.email});
        if(emailExists) return res.status(400).json({msg:"El correo ya esta registrado"});
        await user.save();
        return res.status(200).json({
            user
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({error});
    }

}

const refreshToken = async( req, res = response) => {

    const uid = req.uid;

    const token = await generateJWT( uid );

    const user = await User.findById( uid );

    res.status(200).json({
        user,
        token
    });

}


module.exports = {
    login,
    signup,
    refreshToken
}