/*
path: /api/messages
*/

const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-token');
const { getChat } = require('../controllers/messages');
const router = Router();

router.get('/:from',validateJWT , getChat);



module.exports = router;