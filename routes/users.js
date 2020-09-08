/*
path: /api/users
*/

const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-token');
const { getUsers } = require('../controllers/users');
const router = Router();

router.get('/',validateJWT , getUsers);



module.exports = router;