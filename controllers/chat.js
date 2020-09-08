const Chat = require('../models/chat');
const Message = require('../models/message');

const getAllChat = async (req, res) => {
    const offset = Number(req.query.offset);
    var chats = await Chat.find({
        $or: [{ from: req.uid , messages: { $not: { $size: 0 } } }, { to: req.uid }]
    })
        .sort('-updatedAt')
        .skip(offset)
        .limit(25)
        //.populate('messages');


        chats = chats.sort((prev,next) => {
            if(next.updatedAt > prev.updatedAt){
                return 1;
            }

            if(next.updatedAt < prev.updatedAt){
                return -1;
            }

            return 0;
        });

       

    return res.status(200).json({ chats });
}

const getPrivateChat = async (req, res) => {
    const chat = req.params.chat;

    const offset = Number(req.query.offset);

    const messages = await Message.find({ chat : chat})
        .skip(offset)
        .limit(15)
        .sort({ createdAt: 'desc' });

    return res.status(200).json({
        messages
    });

}

const saveMessage = async (payload) => {

    try {
        const message = new Message(payload);
        await message.save();
        await Chat.findOne({ _id: message.chat}, async (error,chat) => {
            if(error){
                console.log(error);
                return false;
            }
            chat.messages.push(message);
            await chat.save();
            return true;

        });
        
    } catch (error) {
        console.log(error);
        return false;
    }
}

const readAllMessages = async (payload) => {
    try {
        await Message.updateMany({ chat: payload.chat, to: payload.to }, { $set: { readed: true } }, { multi: true });
    } catch (error) {
        console.log(error);
    }
}

const createChat = async (req,res) => {
    try {
        const chat = new Chat(req.body);
        await chat.save();
        return res.status(201).json({chat});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error});
        ;
    }
}


const createMessage = async (req,res) => {
    const { chat } = req.params;

    try {
        const message = new Message(req.body);
        message.chat = chat;
        await message.save();

        await Chat.findOne({ _id: message.chat}, async (error,chat) => {
            if(error){
                console.log("Error!!!!!!!!!!");
                return res.status(500).json({error});
            }
            chat.messages.push(message);
            await chat.save();

        });
        
        return res.status(201).json({message});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error});
        
    }
}






module.exports = {
    getAllChat,
    getPrivateChat,
    saveMessage,
    readAllMessages,
    createChat,
    createMessage
}