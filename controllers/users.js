
const User = require('../models/user');

const getOnlineUsers = async (req,res) =>{

    const offset = Number(req.query.offset);
    const users = await User
    .find({_id: { $ne: req.uid}})
    .sort('-online')
    .skip(offset)
    .limit(25);

    return res.status(200).json({users});
}




module.exports = {
    getOnlineUsers
}