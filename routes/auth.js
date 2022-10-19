// Users Routes
// host+/api/auth

const express = require('express')
const { userLogin, newUser, tokenRenew } = require('../controllers/auth')
const router = express.Router()


//new user
router.post('/new', newUser)

router.post('/', userLogin)

//renew token
router.get('/renew', tokenRenew)





module.exports = router