const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
require('dotenv').config()
const port = process.env.PORT || 8000;

constproductRouter = require('./routes/product.route');
const userRouter = require('./routes/user.route');

const app = express();
app.use(cors());

app.get("/healthCheck", async(req,res)=>{
    console.log("it works");
    res.send({status: 'Success'})
})

//mongodb collection
mongoose.connect(process.env.dbUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(dat=>{
    console.log("Database connected")
}).catch(err=>{
    console.log(err.message)
    process.exit(1)
})

app.use(express.json());
app.use(' ')
app.listen(port, ()=>{
    console.log("Server started... at 3000 port")
    console.log('http://127.0.0.1:${port}')
})