const hr_model = require('../../model/hr_model/hr_model')

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

module.exports.MinputProfile = async (req, res) => {
    let userid = req.session.userid
    let user_hr = req.session.hr_acc

    if (!req.session.isLogin) {
        return res.status(401).json({ status: false, message: 'unauthorize' })
    }
    if (user_hr != 'hr') {
        return res.status(403).json({ status: false, message: 'permission denine' })
    }

    let body = req.body
    let hr_employees = await hr_model.MinputProfile(userid, body)

    if (hr_employees.lenght < 1) {
        return res.json({ status: false, message: 'Failed to getemplyee profile' })
    }

    return res.json({ status: true, data: hr_employees })
}