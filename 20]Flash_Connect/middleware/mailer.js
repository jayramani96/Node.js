const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "jayramani100@gmail.com",
        pass: "", 
    },
});

module.exports.sendOtp = (to, otp) => {
    let mailOptions = {
        from : "jayramani100@gmail.com",
        to : to,
        subject : "OTP for your forget password request",
        text : `your otp is ${otp}`,
    }
}

transport.sendMail(mailOptions, (err) => {
    err ? console.log(err) : console.log("OTP sended successfully! ");
})