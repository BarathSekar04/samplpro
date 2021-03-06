const router = require('express').Router();
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const userSchema = require("../models/user.model");

//signup process
router.post('/userfirstsignup', async(req,res)=>{
    try {
        const UserName = req.body.UserName;
        const Mailid= req.body.Mailid;
        const MobileNo = req.body.MobileNo;
       if(UserName){
            let pattern=/[0-9]/g;
        if(pattern.test(UserName)!=true)
        {
            return res.json({status:"failure", message:"username must contion atleast one number"})
        }
        
       }else{
        return res.status(400).json({status: "failure", message: 'Must enter the username'})
      }
      if(UserName){
        
            let usernameDetail = await userSchema.findOne({'UserName': UserName}).exec()
            if(usernameDetail){
                return res.json({status: "failure", message: 'username already exist'})
            }
        }
        if(Mailid){
            let useremailDetail = await userSchema.findOne({'Mailid': Mailid}).exec()
            if(useremailDetail){
                return res.json({status: "failure", message: 'email already exist'})
            }
        }else{
            return res.status(400).json({status: "failure", message: 'Must enter the email id'})
        }
        if(MobileNo){
            let usermobileNumberDetail = await userSchema.findOne({'MobileNo': MobileNo}).exec()
            if(usermobileNumberDetail){
                return res.json({status: "failure", message: 'mobileNumber already exist'})
            }
        }else{
            return res.status(400).json({status: "failure", message: 'Must enter the mobileNumber'})
        }

        let userdetail = new userSchema(req.body)
        let password=req.body.password;
        console.log("before hashing and salting:"+ userdetail.password);
        let salt = await bcrypt.genSalt(10);
        userdetail.password = bcrypt.hashSync(password, salt);
        let result = await userdetail.save();
        console.log("after hashing:"+ userdetail.password);

        return res.status(200).json({status: "success", message: "user details are added successfully", data: result})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({status: "failure", message: error.message})
    }
});

//login 
router.post('/userlogin' , async(req,res)=>{
   try {
        let  Username = req.body.Username;
        let password = req.body.password;
        let userdetails;       
        let userdetails1 = await userSchema.findOne({Username: Username}).select('-password -_id').exec()
        if(Username){
            userdetails = await userSchema.findOne({Username: Username }).exec()
            if(!userdetails){
                return res.status(400).json({status: "failure", message: "please signup first"});
            }
        }else{
            return res.status(400).json({status: "failure", message: "Please enter the username"})
        }
        if(userdetails){ 
            let usedetails = await userSchema.findOne({username: username}).select('password- id').exec()
            let isMatch = await bcrypt.compare(password, userdetails.password)
            let userdetails, firstloginStatus
            if(isMatch){
              return res.status(200).json({status: "success", message: "Login successfully", data: userDetails})
            }else{
                return res.status(200).json({status: "failure", message: "your Login failed"})
            }
        }
       
   } catch (error) {
       console.log(error.message);
       return res.status(500).json({status:"failure", message:error.message})    
   }
})

//logout process
router.post('/userlogout', async(req,res)=>{
      try {
          await userSchema.findOneAndUpdate({uuid: req.params.uuid}, {lastedVisited: time,loginStatus: false})
          return res.status(200).json({status: "success", message: "Logout successfull"})
      } catch (error) {
        console.log(error.message)
        return res.status(500).json({status: "failure", message: error.message})
    }
      }
)

//reset & forget password
router.post('/userresetpasssword', async(req,res)=>{
    try {
        let UserName= req.body.UserName;
        let newpassword=req.body.newpassword;
        let choice={new:true};
        let userdetail2;
        if(UserName){
        userdetail2 = await userSchema.findOne({UserName: UserName}).exec()
           if(!userdetail2){
            return res.status(400).json({Status: "failure", message:"signup first"})
        }
         }else{
            return res.status(400).json({status:"failure", message:"you must enter the username"})
    }
          if(userdetail2){ 
           console.log(userdetail2);
           console.log(newpassword);
           console.log("password before hashing:"+newpassword);
           let Salt= await bcrypt.genSalt(10);
           newpassword=bcrypt.hashSync(newpassword,Salt);
           console.log("after hashing:"+newpassword);
           const change =await userSchema.findOneAndUpdate({uuid: userdetail2.uuid},{password:newpassword}, choice).exec();
           return res.status(200).json({status:"success",message:"password changed successfully", result:change})
         }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({status:"failure", message:error.message})    
    }
          
})

//mailSending
router.post("/mailSending",async(req,res)=>{
    try{
        const toMail = req.body.toMail;
        const subject = req.body.subject;
        const text = req.body.text;
        const compose = {
            from :"gamergopi26@gmail.com",
            to : toMail,
            subject : subject,
            text : text
        }
        await mailSending.mailSending(mailData).then(data)
        return res.status(200).json({status:'success',message:"mail sent successfully"})
    //    }else{
    //        return res.status(400).json({status:'Failure',message:'mail not sent'})
    //    }
    }catch(error){
        console.log(error.message);
        return res.status(500).json({status:'failure',message:error.message})
    }
})

module.exports = router;