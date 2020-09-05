const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        mongoose.connect(process.env.DB_CNN, {useNewUrlParser: true, useUnifiedTopology: true});

        console.log('DB initialized');

    } catch (error) {
        console.log(error);
        throw new Error('Error en la conexion a la bae de datos');
    }
}

module.exports = {
    dbConnection
}