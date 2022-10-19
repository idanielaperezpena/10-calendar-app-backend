const { response } = require('express')


const newUser = (req, res = response) => {
    res.json({
        ok: true,
        message: 'register'
    })
}

const userLogin = (req, res = response) => {
    res.json({
        ok: true,
        message: 'login'

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
