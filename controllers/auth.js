const { response } = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

const newUser = async (req, res = response) => {
    const { email, password } = req.body

    let user = await User.findOne({ email })
    if (user) {
        return res.status(400).json({
            ok: false,
            message: 'This email has already been used',
        })
    }
    user = new User(req.body)
    //encrypt password
    const salt = bcrypt.genSaltSync()
    user.password = bcrypt.hashSync(password, salt)
    
    await user.save()

    res.status(201).json({
        ok: true,
        message: 'register',
        uid: user.id,
        name: user.name
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
