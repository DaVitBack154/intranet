const nodemailer = require('nodemailer')
const moment = require('moment')

//ไอริส่งคนแรก
const sendFirst_Emp = async (to, body) => {
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
        subject: 'พนักงานเริ่มงานใหม่',
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
                                        <table width="95%" border="1" align="center" cellpadding="0" cellspacing="0"
                                            style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                         
                                            <tr>
                                            <th>Full-name</th>
                                            <th>Position</th>
                                            <th>Department</th>
                                            <th>Start-work</th>
                                            <th>Status</th>
                                            </tr>

                                            <tr>
                                            <td>${body.name_th}</td>
                                            <td>${body.position}</td>
                                            <td>${body.department}</td>
                                            <td>${body.start_date_work}</td>
                                            <td>${body.status_hr}</td>
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
        console.log('Successful sended mail ' + to)
        return result ? true : false
    } catch (err) {
        console.log('Failed to send token reset password, ' + err.message)
        return false
    }
}


//ถึงทุกแผนก
const sendApp_IT = async (to, body) => {
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

    const formatDate = moment(body.start_date_work).format('YYYY-MM-DD')

    let options = {
        from: 'IT@chase.co.th',
        to: to,
        subject: 'พนักงานเริ่มงานใหม่/IT',
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
                                        <table width="95%" border="1" align="center" cellpadding="0" cellspacing="0"
                                            style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                           
                                            <tr>
                                            <th>Full-name</th>
                                            <th>Position</th>
                                            <th>Department</th>
                                            <th>Start-work</th>
                                            </tr>
                                            <tr>
                                            <td>${body.name_th}</td>
                                            <td>${body.position}</td>
                                            <td>${body.department}</td>
                                            <td>${formatDate}</td>
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
        console.log('Successful sended mail ' + to)
        return result ? true : false
    } catch (err) {
        console.log('Failed to send token reset password, ' + err.message)
        return false
    }
}
const sendApp_Hr_ct = async (to, body) => {
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

    const formatDate = moment(body.start_date_work).format('YYYY-MM-DD')

    let options = {
        from: 'Thunwarat.P@chase.co.th',
        to: to,
        subject: 'พนักงานเริ่มงานใหม่/HR',
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
                                        <table width="95%" border="1" align="center" cellpadding="0" cellspacing="0"
                                            style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                           
                                            <tr>
                                            <th>Full-name(th)</th>
                                            <th>Full-name(en)</th>
                                            <th>Address</th>
                                            <th>Position</th>
                                            <th>Department</th>
                                            <th>Start-work</th>
                                            </tr>

                                            <tr>
                                            <td>${body.name_th}</td>
                                            <td>${body.name_en}</td>
                                            <td>${body.address}</td>
                                            <td>${body.position}</td>
                                            <td>${body.department}</td>
                                            <td>${formatDate}</td>
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
        console.log('Successful sended mail ' + to)
        return result ? true : false
    } catch (err) {
        console.log('Failed to send mail, ' + err.message)
        return false
    }
}
const sendApp_hr_img = async (to, body) => {
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

    const formatDate = moment(body.start_date_work).format('YYYY-MM-DD')
    // console.log(body.img_simple)
    // const img_s = body.img_simple


    let options = {
        from: 'Chayapol.B@chase.co.th',
        to: to,
        subject: 'พนักงานเริ่มงานใหม่/HR/image',
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
                                        <table width="95%" border="1" align="center" cellpadding="0" cellspacing="0"
                                            style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                            
                                            <tr>
                                            <th>Full-name</th>
                                            <th>Position</th>
                                            <th>Department</th>
                                            <th>Start-work</th>
                                            <th>Image</th>
                                            
                                            </tr>
                                            <tr>
                                            <td>${body.name_th}</td>
                                            <td>${body.position}</td>
                                            <td>${body.department}</td>
                                            <td>${formatDate}</td>
                                            <td>
                                            <a href="${process.env.NODE_APP_SERVER_ENDPOINT}/public/image/repair/${body.img_simple}" target="__blank">
                                                Image
                                            </a>
                                            </td>
                                            
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
        console.log('Successful sended mail ' + to)
        return result ? true : false
    } catch (err) {
        console.log('Failed to send mail, ' + err.message)
        return false
    }
}


//พบปัญหาการใช้งาน
const sendExtCase_Haed = async (to, body) => {
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

    const formatDate = moment(body.start_date_work).format('YYYY-MM-DD')

    let options = {
        from: 'waruen.css@gmail.com',
        to: to,
        subject: 'พบปัญหาพนักงานใหม่',
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
                                        <table width="95%" border="1" align="center" cellpadding="0" cellspacing="0"
                                            style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">

                                            <tr>
                                            <th>Full-name</th>
                                            <th>Position</th>
                                            <th>Department</th>
                                            <th>Status</th>
                                            <th>Start-work</th>
                                            <th>Note-Head</th>
                                            </tr>
                                            <tr>
                                            <td>${body.name_th}</td>
                                            <td>${body.position}</td>
                                            <td>${body.department}</td>
                                            <td>${body.status_hr}</td>
                                            <td>${formatDate}</td>
                                            <td>${body.maihet_head}</td>
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
        console.log('Successful sended mail ' + to)
        return result ? true : false
    } catch (err) {
        console.log('Failed to send token reset password, ' + err.message)
        return false
    }
}
//พบปัญหาการใช้งานของ ไอริ
const sendExtCase_iri = async (to, body) => {
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

    const formatDate = moment(body.start_date_work).format('YYYY-MM-DD')

    let options = {
        from: 'waruen.css@gmail.com',
        to: to,
        subject: 'พบปัญหาพนักงานใหม่',
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
                                        <table width="95%" border="1" align="center" cellpadding="0" cellspacing="0"
                                            style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">

                                            <tr>
                                            <th>Full-name</th>
                                            <th>Position</th>
                                            <th>Department</th>
                                            <th>Start-work</th>
                                            <th>Note</th>
                                            </tr>
                                            <tr>
                                            <td>${body.name_th}</td>
                                            <td>${body.position}</td>
                                            <td>${body.department}</td>
                                            <td>${formatDate}</td>
                                            <td>${body.maihet}</td>
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
        console.log('Successful sended mail ' + to)
        return result ? true : false
    } catch (err) {
        console.log('Failed to send token reset password, ' + err.message)
        return false
    }
}


const sendPo = async (to, body) => {
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
        subject: 'การซ่อมที่มีค่าใช้จ่าย',
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
                                        <table width="95%" border="1" align="center" cellpadding="0" cellspacing="0"
                                            style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                         
                                            <tr>
                                            <th>เลขที่แจ้งซ่อม</th>
                                            <th>วันที่แจ้งซ่อม</th>
                                            <th>ผู้แจ้งซ่อม</th>
                                            <th>ปัญหาที่เกิดขึ้น</th>
                                            <th>ผู้ตรวจรับงาน</th>
                                            </tr>

                                            <tr>
                                            <td>${body.ticket_no}</td>
                                            <td>${body.create_date}</td>
                                            <td>${body.TUserName}</td>
                                            <td>${body.description}</td>
                                            <td>${body.admin_name}</td>
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
        console.log('Successful sended mail ' + to)
        return result ? true : false
    } catch (err) {
        console.log('Failed to send token reset password, ' + err.message)
        return false
    }
}



module.exports = {
    sendApp_IT,
    sendApp_Hr_ct,
    sendApp_hr_img,
    sendExtCase_iri,
    sendFirst_Emp,
    sendExtCase_Haed,
    sendPo

}

// การใชเ body ${body.ตัวแปร}