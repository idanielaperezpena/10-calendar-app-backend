const { response } = require('express')
const { validationResult } = require('express-validator')


const newUser = (req, res = response) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    res.status(201).json({
        ok: true,
        message: 'register',
        user: req.body
    })
}

const userLogin = (req, res = response) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

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
