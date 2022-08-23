const nodemailer = require('nodemailer')

const sendResetPasswordToken = async (to, body) => {
    var mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'noutnamin@gmail.com',
            pass: 'zrmkubxtupoyisyg'
        }
    })

    let options = {
        from: 'waruen.css@gmail.com',
        to: to,
        subject: 'พนังานเริ่มงานใหม่',
        html: `
            <!doctype html>
            <html lang="en-US">
            <head>
                <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
                <meta name="description" content="Reset Password Email Template.">
                <style type="text/css">
                    a:hover {text-decoration: underline !important;}
                </style>
            </head>
            <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
                <!--100% body table-->
                <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                    style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                    <tr>
                        <td>
                            <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                                align="center" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="height:80px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="height:20px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>
                                        <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                            style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                            <tr>
                                                <td style="height:40px;">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style="padding:0 35px;">
                                                    <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">OnlyTask Project</h1>
                                                    <span
                                                        style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                                    <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                        คุณได้ส่งคำขอเพื่อรีเซ็ตรหัสผ่านของคุณเมื่อไม่นานมานี้ <br/>โปรดคลิกที่สิงก์
                                                    ด้นล่างเพื่อดำเนินการต่อ <br/> <span style="color: red; font-weight: bold;">หากคุณไม่ได้ร้องขอโปรดอย่าดำเนินการใดๆ</span>
                                                    </p>
                                                    <a href="${process.env.CLIENT_URL}/reset-password?token=${token}" title="logo" target="_blank"
                                                        style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">รีเซ็ตรหัสผ่าน
                                                        </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="height:40px;">&nbsp;</td>
                                                
                                        </table>
                                    </td>
                                <tr>
                                    <td style="height:20px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="text-align:center;">
                                        <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>www.onlytask.in.th</strong></p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:80px;">&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                <!--/100% body table-->
            </body>

            </html>
        `
    }
    try {
        let result = await mailTransporter.sendMail(options)
        console.log('Successful sended token reset password to ' + to)
        return result ? true : false
    } catch (err) {
        console.log('Failed to send token reset password, ' + err.message)
        return false
    }
}

const sedUser = async (to, toletm) => {

}

const sedUser1 = async (to, toletm) => {

}
module.exports = {
    sendResetPasswordToken,
    sedUser,
    sedUser1
}

// การใชเ body ${body.ตัวแปร}