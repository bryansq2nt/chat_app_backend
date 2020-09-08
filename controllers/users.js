
const User = require('../models/user');

const getUsers = async (req,res) =>{

    const offset = Number(req.query.offset);
    var users = await User
    .find({_id: { $ne: req.uid}})
    .sort('-online')
    .skip(offset)
    .limit(25);

    return res.status(200).json({users});
}




module.exports = {
    getUsers
}