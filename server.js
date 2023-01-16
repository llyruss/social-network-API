const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const routes = require('./routes')


const app = express()
const PORT = process.env.PORT || 3000


const mongodbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/'

mongoose.connect(
    mongodbURI + 'socialDB', 
    {

    }
)



app.use(express.urlencoded({extended: true} ));
app.use(express.json());
app.use(routes)

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})