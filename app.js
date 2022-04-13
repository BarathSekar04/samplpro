const express = require('express');
const moment = require('moment');

const app = express();
const port = process.env.PORT || 7000;

app.get("/healthCheck", async(req,res)=>{
    console.log("it works");
    res.send({status: 'Success'})
})

mongoose.connect(process.env.dbUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(dat=>{
    console.log("Database connected")
}).catch(err=>{
    console.log(err.message)
    process.exit(1)
})

qpp.use(express.json());
app.use(' ')
app.listen(port, ()=>{
    console.log("Server started... at 3000 port")
    console.log('http://127.0.0.1:${port}')
})