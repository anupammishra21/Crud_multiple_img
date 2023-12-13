const express = require('express')
const app = express()
require('dotenv').config()
const path = require('path')
const bodyParser= require('body-parser')
_= require('underscore')

app.set('view engine','ejs')
app.set('views','views')

app.use(express.static(path.join(__dirname,'public')))

app.use(bodyParser.urlencoded({
    extended:true
}))

const routes = require('./routes/crud.routes')
app.use(routes)

require(path.join(__dirname,'/config/database'))()


app.listen(process.env.PORT,()=>{
    console.log(`server is running at @ http://127.0.0.1:${process.env.PORT}`);
})