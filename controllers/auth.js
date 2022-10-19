const { response } = require('express')
const { validationResult } = require('express-validator')


const newUser = (req, res = response) => {

    res.status(201).json({
        ok: true,
        message: 'register',
        user: req.body
    })
}

const userLogin = (req, res = response) => {

    res.status(200).json({
        ok: true,
        message: 'login',
        user: req.body
    })
}

const tokenRenew = (req, res = response) => {
    res.json({
        ok: true,
        message: 'token renew'

    })
}


module.exports = {
    newUser,
    userLogin,
    tokenRenew,
}
