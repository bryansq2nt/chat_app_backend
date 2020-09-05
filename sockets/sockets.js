const { io } = require('../server');


io.on('connection', client => {
   
    client.on('disconnect',() => {
        console.log('Cliente desconectado');
    });

 
    
});