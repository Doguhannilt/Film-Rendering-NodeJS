// MongoDB option
if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
} 



const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

// Specify the homepage
const indexRouter = require('./routes/index')

app.set('view engine','ejs')
app.set('views',__dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

// Render the index.html as '/'
app.use('/',indexRouter)

//MongoDB initiliaze and connection
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error',error =>{
    console.error(error)
})
db.once('open',() =>{
    console.error('Connected')
})

app.listen(process.env.PORT || 3000)