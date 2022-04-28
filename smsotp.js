const {totp} = require('otplib')

function otpSend(){
    const secrect = process.env.secrectOTPKey
    const token = totp.generate(secrect)
    console.log(token)
}

const otpGenerator = require('otp-generator');
const { OTP_LENGTH, OTP_CONFIG } = require('../constants/constants');
module.exports.generateOTP = () => {
  const OTP = otpGenerator.generate(OTP_LENGTH, OTP_CONFIG);
  return OTP;
};


otpSend()

module.exports = {
    otpSend: otpSend
}