const express = require('express')
const router = express.Router()


router.get('/',(req,res)=>{
    console.log("Home Page is started")
})

module.exports = router