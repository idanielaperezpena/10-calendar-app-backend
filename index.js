const express = require('express')

//server
const app = express()

//listen
app.listen(4000, () => {
    console.log(`Servidor corriendo en puerto ${4000}`)
})