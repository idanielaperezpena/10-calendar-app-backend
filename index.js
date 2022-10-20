const express = require('express')
require('dotenv').config()
const cors = require('cors')
const { dbConnection } = require('./database/config')

//server
const app = express()

//Database
dbConnection()

//CORS
app.use(cors())

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