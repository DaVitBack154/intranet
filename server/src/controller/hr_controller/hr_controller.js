const hr_model = require('../../model/hr_model/hr_model')
const Mailer = require('../../Utils/Mailer')

module.exports.CreateProfile = async (req, res) => {
    let userid = req.session.userid
    let user_hr = req.session.hr_acc

    if (!req.session.isLogin) {
        // console.log(userid)
        return res.status(401).json({ status: false, message: 'unauthorize' })
    }
    if (user_hr != 'hr') {
        return res.status(403).json({ status: false, message: 'permission denine' })
    }

    let body = req.body


    let duplicate_id_card = await hr_model.GetProfileByIDCard(body.idcard_no);
    if (duplicate_id_card.length > 0) {
        return res.json({ status: false, message: "Duplicate ID-CARD" })
    }


    let hr_employees = await hr_model.CreateProfile(userid, body)
    if (hr_employees.length < 1) {
        return res.json({ status: false, message: 'Failed to create emplyee profile' })
    }


    // Mailer.sendResetPasswordToken('waruen.css@gmail.com', body)
    // Mailer.sedUser('nuttokota@gmail.com', body)
    return res.json({ status: true, message: 'Successful create emplyee profile' })
}
module.exports.UpdateProfile = async (req, res) => {
    // let userid = req.session.userid
    let user_hr = req.session.hr_acc

    if (!req.session.isLogin) {
        // console.log(userid)
        return res.status(401).json({ status: false, message: 'unauthorize' })
    }
    if (user_hr != 'hr') {
        return res.status(403).json({ status: false, message: 'permission denine' })
    }

    let { id } = req.params;
    let body = req.body
    let hr_employees = await hr_model.UpdateProfile(id, body)
    // if (hr_employees.length < 1) {
    //     return res.json({ status: false, message: 'Failed to update emplyee profile' })
    // }

    // return res.json({ status: true, message: 'Successful update emplyee profile' })
    if (hr_employees == false) {
        return res.json({ status: false, message: "UPDATE FAILED" });
    } else {
        console.log(body)
        if (body.status_hr == 'Postponed' || body.status_hr == 'Reject') {
            Mailer.sendExtCase('waruen.css@gmail.com', body)
            //send email

        }
        return res.json({ status: true, message: "UPDATE SUCCESS" });
    }
}
module.exports.GetProfile = async (req, res) => {
    let userid = req.session.userid
    let user_hr = req.session.hr_acc

    if (!req.session.isLogin) {
        return res.status(401).json({ status: false, message: 'unauthorize' })
    }
    if (user_hr != 'hr') {
        return res.status(403).json({ status: false, message: 'permission denine' })
    }

    let { id } = req.params;
    let hr_employees = await hr_model.GetProfile(userid, id)

    if (hr_employees.length < 1) {
        return res.json({ status: false, message: 'Failed to getemplyee profile' })
    }

    return res.json({ status: true, data: hr_employees })
}
module.exports.GetProfileID = async (req, res) => {
    // let userid = req.session.userid
    let user_hr = req.session.hr_acc

    if (!req.session.isLogin) {
        return res.status(401).json({ status: false, message: 'unauthorize' })
    }
    if (user_hr != 'hr') {
        return res.status(403).json({ status: false, message: 'permission denine' })
    }

    let { id } = req.params;
    let hr_employees = await hr_model.GetProfileID(id)

    if (hr_employees.length < 1) {
        return res.json({ status: false, message: 'Failed to getemplyee profile' })
    }

    return res.json({ status: true, data: hr_employees[0] })
}



module.exports.UpdateFullProfile = async (req, res) => {
    let { id } = req.params;
    // let userid = req.session.userid
    let user_hr = req.session.hr_acc

    if (!req.session.isLogin) {
        return res.status(401).json({ status: false, message: 'unauthorize' })
    }
    if (user_hr != 'hr') {
        return res.status(403).json({ status: false, message: 'permission denine' })
    }

    let body = req.body;
    let update = await hr_model.UpdateFullProfileID(id, body);
    if (update == false) {
        return res.json({ status: false, message: "UPDATE FAILED" });
    } else {
        return res.json({ status: true, message: "UPDATE SUCCESS" });
    }
}
module.exports.GetFullProfile = async (req, res) => {
    let userid = req.session.userid
    let user_hr = req.session.hr_acc

    if (!req.session.isLogin) {
        return res.status(401).json({ status: false, message: 'unauthorize' })
    }
    if (user_hr != 'hr') {
        return res.status(403).json({ status: false, message: 'permission denine' })
    }

    // let body = req.body
    let { id } = req.params;
    let hr_employees = await hr_model.GetFullProfile(id)

    if (hr_employees.length < 1) {
        return res.json({ status: false, message: 'Failed to getemplyee profile' })
    }


    return res.json({ status: true, data: hr_employees[0] })
}


module.exports.GetAdduser = async (req, res) => {
    let userid = req.session.userid
    let user_hr = req.session.hr_acc

    if (!req.session.isLogin) {
        return res.status(401).json({ status: false, message: 'unauthorize' })
    }
    if (user_hr != 'hr') {
        return res.status(403).json({ status: false, message: 'permission denine' })
    }

    // let body = req.body
    let { id } = req.params;
    let hr_employees = await hr_model.GetAdduser(id)

    if (hr_employees.length < 1) {
        return res.json({ status: false, message: 'Failed to getemplyee profile' })
    }


    return res.json({ status: true, data: hr_employees[0] })
}
module.exports.UpdateAdduser = async (req, res) => {
    let { id } = req.params;
    // let userid = req.session.userid
    let user_hr = req.session.hr_acc

    if (!req.session.isLogin) {
        return res.status(401).json({ status: false, message: 'unauthorize' })
    }
    if (user_hr != 'hr') {
        return res.status(403).json({ status: false, message: 'permission denine' })
    }

    let body = req.body;
    let update = await hr_model.UpdateAdduserID(id, body);
    if (update == false) {
        return res.json({ status: false, message: "UPDATE FAILED" });
    } else {
        return res.json({ status: true, message: "UPDATE SUCCESS" });
    }
}



module.exports.UpdateAppit = async (req, res) => {
    let { id } = req.params;
    let user_hr = req.session.hr_acc

    if (!req.session.isLogin) {
        return res.status(401).json({ status: false, message: 'unauthorize' })
    }
    if (user_hr != 'hr') {
        return res.status(403).json({ status: false, message: 'permission denine' })
    }

    let body = req.body;
    let hr_employees = await hr_model.GetProfileID(id)
    let status_hr = hr_employees[0].status_hr

    let status_it = body.status_it
    let status_contract = hr_employees[0].status_contract
    if (status_it == 'Approve' && status_contract == 'Approve') {
        status_hr = 'Confirm'
    } else {
        status_hr = 'Pending'
    }
    let update = await hr_model.UpdateAppit(id, body, status_hr);

    if (update == false) {
        return res.json({ status: false, message: "UPDATE FAILED" });
    } else {
        return res.json({ status: true, message: "UPDATE SUCCESS" });
    }
}
module.exports.UpdateAppct = async (req, res) => {
    let { id } = req.params;
    let user_hr = req.session.hr_acc

    if (!req.session.isLogin) {
        return res.status(401).json({ status: false, message: 'unauthorize' })
    }
    if (user_hr != 'hr') {
        return res.status(403).json({ status: false, message: 'permission denine' })
    }

    let body = req.body;
    let hr_employees = await hr_model.GetProfileID(id)
    let status_hr = hr_employees[0].status_hr

    let status_contract = body.status_contract
    let status_it = hr_employees[0].status_it
    if (status_contract == 'Approve' && status_it == 'Approve') {
        status_hr = 'Confirm'
    } else {
        status_hr = 'Pending'
    }
    let update = await hr_model.UpdateAppct(id, body, status_hr);

    if (update == false) {
        return res.json({ status: false, message: "UPDATE FAILED" });
    } else {
        return res.json({ status: true, message: "UPDATE SUCCESS" });
    }
}

module.exports.UpdateHead_hr = async (req, res) => {
    let { id } = req.params;
    let user_hr = req.session.hr_acc

    if (!req.session.isLogin) {
        return res.status(401).json({ status: false, message: 'unauthorize' })
    }
    if (user_hr != 'hr') {
        return res.status(403).json({ status: false, message: 'permission denine' })
    }

    let body = req.body;
    let update = await hr_model.UpdateHead_hr(id, body);
    if (update == false) {
        return res.json({ status: false, message: "UPDATE FAILED" });
    } else {
        console.log(body)
        if (body.status_head == 'Approve') {
            Mailer.sendApp_IT('IT@chase.co.th', body)
            Mailer.sendApp_Hr_ct('Thunwarat.P@chase.co.th', body)
            Mailer.sendApp_hr_img('Chayapol.B@chase.co.th', body)
            //send email

        }
        return res.json({ status: true, message: "UPDATE SUCCESS" });
    }
}
