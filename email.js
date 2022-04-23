const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: "Gmail",
     port: 465,
    auth:{
        Username: "pinkyAngelQueen@gmail.com",
        Password: "pinky@123"
    },
    secure:true,
   
});

async function mailSending(mailData){
    try{
        transporter.sendMail(mailData,(err,data)=>{  
            if(err){ 
                console.log("err",err.message)
             }else{
                console.log("Mail sent successfully")
                return true
             }
        })
    }catch(error){
        console.log(error.message)
        process.exit[1];
    }
}
module.exports = {mailSending: mailSending}