const otpmailer = require("../mailers/otp_mailers");

exports.getotp = (req, res) => {
  let code = Math.floor(Math.random() * 900000) + 99999;
  req.body.otp=code
  otpmailer.otp(req.body);
  return res.status(200).json({
    email: req.body.email,
    otp: code,
  });
};
