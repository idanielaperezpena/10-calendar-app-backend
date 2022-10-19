const express = require('express')
const { dbConnection } = require('./database/config')
require('dotenv').config()

//server
const app = express()

//Database
dbConnection()

//public folder
app.use(express.static('public'))

//Parse body
app.use(express.json())

//endPoints
app.use('/api/auth', require('./routes/auth'))


//listen
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})