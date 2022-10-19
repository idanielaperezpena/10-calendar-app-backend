// Users Routes
// host+/api/auth

const express = require('express')
const { check } = require('express-validator')
const router = express.Router()
const { userLogin, newUser, tokenRenew } = require('../controllers/auth')
const { validateFields } = require('../middlewares/validate-fields')



//new user
router.post('/new',
    [//middlewares
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
        validateFields
    ], newUser)

router.post('/',
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
        validateFields
    ], userLogin)

//renew token
router.get('/renew', tokenRenew)





module.exports = router