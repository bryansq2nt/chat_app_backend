const Message = require('../models/message');

const getChat = async (req,res) => {
    const myId = req.uid;
    const fromId = req.params.from;

    const offset = Number(req.query.offset);

    const messages = await Message.find({
        $or: [{ to: myId, from: fromId}, {to: fromId, from: myId}]
    })
    .skip(offset)
    .limit(30)
    .sort({createdAt: 'desc'});

    console.log(messages);
    return res.status(200).json({
        messages
    });

}


module.exports = {
    getChat
}