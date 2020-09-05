const jwt = require('jsonwebtoken');


const validateJWT = (req,res,next) => {

    const token = req.header('Authorization');

    if ( !token ) {
        return res.status(401).json({
            error: 'No hay token en la petición'
        });
    }

    try {

        const { uid } = jwt.verify( token, process.env.JWT_KEY );
        req.uid = uid;
        
        next();

    } catch (error) {
        return res.status(401).json({
            error: 'Token no válido'
        })
    }

}



module.exports = {
    validateJWT
}