const { io } = require('../server');
const { checkJwt } = require('../helpers/jwt');
const { connectedUser, disconnectedUser  } = require('../controllers/socket');
const { saveMessage, readAllMessages } = require('../controllers/chat');


io.on('connection', client => {
    const [authenticated, uid ] = checkJwt(client.handshake.headers['authorization']);
    
    if(!authenticated) { 
        return client.disconnect();
    }

    client.broadcast.emit('user-connected',{uid});

    connectedUser(uid);
    client.join(uid);

    client.on('private-message', async (payload) => {
        await saveMessage(payload);
        io.to(payload.to).emit('private-message', payload);
    });

    client.on('read-all-messages', async (payload) => {
        await readAllMessages(payload);
    });
    
    client.on('disconnect',() => {
        client.broadcast.emit('user-disconnected',{uid});
        disconnectedUser(uid);
        
    });

 
    
});