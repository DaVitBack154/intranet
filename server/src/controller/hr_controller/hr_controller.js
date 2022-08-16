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
    let hr_employees = await hr_model.CreateProfile(userid, body)
    if (hr_employees.lenght < 1) {
        return res.json({ status: false, message: 'Failed to create emplyee profile' })
    }

    Mailer.sendAfterCreateProfile('waruen.css@gmail.com', body)
    return res.json({ status: true, message: 'Successful create emplyee profile' })
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

    let body = req.body
    let hr_employees = await hr_model.GetProfile(userid, body)

    if (hr_employees.lenght < 1) {
        return res.json({ status: false, message: 'Failed to getemplyee profile' })
    }

    return res.json({ status: true, data: hr_employees })
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

    if (hr_employees.lenght < 1) {
        return res.json({ status: false, message: 'Failed to getemplyee profile' })
    }


    return res.json({ status: true, data: hr_employees[0] })
}