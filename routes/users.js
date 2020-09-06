/*
path: /api/users
*/

const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-token');
const { getOnlineUsers } = require('../controllers/users');
const router = Router();

router.get('/onlineUsers',validateJWT , getOnlineUsers);



module.exports = router;