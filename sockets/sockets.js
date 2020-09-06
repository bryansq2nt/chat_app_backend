const { io } = require('../server');
const { checkJwt } = require('../helpers/jwt');
const { connectedUser, disconnectedUser, saveMessage } = require('../controllers/socket');


io.on('connection', client => {
    const [authenticated, uid ] = checkJwt(client.handshake.headers['authorization']);
    
    if(!authenticated) { 
        return client.disconnect();
    }

    connectedUser(uid);
    client.join(uid);

    client.on('private-message', async (payload) => {
        await saveMessage(payload);
        io.to(payload.to).emit('private-message', payload);
    });
    
    client.on('disconnect',() => {
        disconnectedUser(uid);
    });

 
    
});