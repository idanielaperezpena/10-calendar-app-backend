const { response } = require('express')
const bcrypt = require('bcryptjs')
const { generateJWT } = require('../helpers/jwt')
const User = require('../models/User')

const newUser = async (req, res = response) => {
    const { email, password } = req.body
    try {
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

        const token = await generateJWT(user.id, user.name)
        res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            message: 'Contact the system administrator',

        })
    }


}

const userLogin = async (req, res = response) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                ok: false,
                message: 'User not found',
            })
        }

        //check passwords
        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                message: 'Invalid password',
            })
        }

        //JWT
        const token = await generateJWT(user.id, user.name)
        res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            message: 'Contact the system administrator',

        })
    }

}

const tokenRenew = async (req, res = response) => {
    
    const { uid, name } = req
    const token = await generateJWT(uid, name)

    res.status(200).json({
        ok: true,
        token

    })
}


module.exports = {
    newUser,
    userLogin,
    tokenRenew,
}
