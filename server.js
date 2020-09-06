const express = require('express');
const path = require('path');
require('dotenv').config();

require('./database/config').dbConnection();
 


const app = express();

app.use(express.json());

const server = require('http').createServer(app);

module.exports.io = require('socket.io')(server);


require('./sockets/sockets');

const public_path = path.resolve(__dirname,'public');
app.use(express.static(public_path));


app.use('/api/auth',require('./routes/auth'));
app.use('/api/users',require('./routes/users'));
app.use('/api/messages',require('./routes/messages'));

server.listen( process.env.PORT , (err) => {
    if(err) throw new Error(err);

    console.log(`Server running on port: ${process.env.PORT }`);
});