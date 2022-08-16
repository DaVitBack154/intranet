const nodemailer = require('nodemailer')

const sendAfterCreateProfile = async (to, body) => {
    var mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'onlytaskproject@gmail.com',
            pass: 'hnmbrdhacbtgjlew'
        }
    })

    let options = {
        from: 'onlytaskproject@gmail.com',
        to: to,
        subject: 'แจ้งพนักงานเริ่มงาน',
        html: `
            <!doctype html>
            <html lang="en-US">
            <head>
                <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
                <meta name="description" content="">
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
                                                <th style="background-color: #04AA6D; color: white;">Name-th</th>
                                                <th style="background-color: #04AA6D; color: white;">Name-en</th>
                                                <th style="background-color: #04AA6D; color: white;">Position</th>
                                                <th style="background-color: #04AA6D; color: white;">Start-Date</th>
                                            </tr>
                                            <tr>
                                                <td style="border: 1px solid;">${body.name_th}</td>
                                                <td style="border: 1px solid;">${body.name_en}</td>
                                                <td style="border: 1px solid;">${body.position}</td>
                                                <td style="border: 1px solid;">${body.start_date_work}</td>
                                            </tr>
                                           

                                            <tr>
                                                <td style="height:40px;">&nbsp;</td>
                                            </tr>
                                        </table>
                                    </td>
                                <tr>
                                    <td style="height:20px;">&nbsp;</td>
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
        console.info('Successful send message ' + to)
        return result ? true : false
    } catch (err) {
        console.error('Failed to send token reset password, ' + err.message)
        return false
    }
}

module.exports = {
    sendAfterCreateProfile
}
