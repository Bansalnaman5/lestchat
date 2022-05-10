const { transporter } = require("../config/nodemailer");
const nodemailer = require("../config/nodemailer");

exports.otp=(authdata) => {
  let htmlString = nodemailer.renderTemplate(
    { authdata: authdata },
    "/auth/otp.ejs"
  );
  nodemailer.transporter.sendMail(
    {
      from: "Lets Chat",
      to: authdata.email,
      subject: "Otp for verifying " + authdata.email,
      html: htmlString,
    },
    (err, info) => {
      if (err) {
        console.log("error in mailing hehe!! ",err);
        return;
      }
      console.log("otp sent successfully");
      transporter.close()
    }
  );
};
