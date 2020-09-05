const { Router } = require('express');
const { login, signup, refreshToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-token');

const router = Router();

router.post('/login', [
    check('email', 'El correo es obligatorio').not().isEmpty(),
    check('password', 'La contraaseña es obligatoria').not().isEmpty(),
    validateFields
], login);


router.post('/signup', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').not().isEmpty(),
    check('password', 'La contraaseña es obligatoria').not().isEmpty(),
    validateFields
],signup);


router.get('/refresh',validateJWT,refreshToken);



module.exports = router;