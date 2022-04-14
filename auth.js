const jwt = require('jsonwebtoken');

function authVerify (req,res,next){
    try{
        console.log("verify token");
        if(!token){
            return res.status(401).json({"status": "failure", "message": "unauthorised access"})
        }
        const decodse = jwt.verif(token, process.env.secretKey_test_jwt)
        console.log(decode)
        next()
    } catch(error) {
        console.log(error.message)
        return res.status(500).json({status: "failure", message: error.message})
    }
}

module.export = {
    authVerify: authVerify
}
