const express = require('express')
const app = express()
const mongoose  = require('mongoose')
const PORT = process.env.PORT || 9000


require('dotenv').config();


mongoose.connect(process.env.MOGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true

})
mongoose.connection.on('connected',()=>{
    console.log("yay mongo connected")
})
mongoose.connection.on('error',(err)=>{
    console.log("Error error no auto pilot",err)
})





require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))











app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})
