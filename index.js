const express = require('express')
require('dotenv').config()

//server
const app = express()

//public folder
app.use(express.static('public'))

//endPoints
// app.get('/', (req, res) => {
//     res.json({
//         ok: true
//     })
// })

//listen
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})