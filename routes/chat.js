/*
path: /api/chat
*/

const { Router } = require('express');

const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

const { validateJWT } = require('../middlewares/validate-token');

const { getAllChat, getPrivateChat, createChat, createMessage } = require('../controllers/chat');

const router = Router();

router.get('/', validateJWT, getAllChat);
router.get('/:chat', validateJWT, getPrivateChat);

router.post('/:chat', [
    check('chat', 'Chat is required').not().isEmpty(),
    check('from', 'From is required').not().isEmpty(),
    check('to', 'To is required').not().isEmpty(),
    check('message', 'Message is required').not().isEmpty(),
    validateFields
], validateJWT, createMessage);


router.post('/', [
    check('from', 'From is required').not().isEmpty(),
    check('to', 'To is required').not().isEmpty(),
    validateFields
], validateJWT, createChat);



module.exports = router;