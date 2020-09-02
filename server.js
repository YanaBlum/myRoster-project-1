const express = require('express')
const app = express()
const path = require('path')


const api = require('./api')

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))


app.use('/api', api)



const port = 3001
app.listen(port, function(){
    console.log(`Server is runing on port ${port}`)
})