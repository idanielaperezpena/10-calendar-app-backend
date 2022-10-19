const express = require('express')
require('dotenv').config()

//server
const app = express()

//public folder
app.use(express.static('public'))

//endPoints
app.use('/api/auth', require('./routes/auth'))


//listen
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})