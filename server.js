// MongoDB option
if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
} 



const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
// Specify the homepage
const indexRouter = require('./routes/index')
// Specify the Author folder 
const authorRouter = require('./routes/authors')


app.set('view engine','ejs')
app.set('views',__dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit: '10mb', extended:false}))
// Render the index.html as '/'
app.use('/',indexRouter)

// Render the author page
app.use('/authors',authorRouter)

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

app.listen(process.env.PORT || 5000)