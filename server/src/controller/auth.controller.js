const axios = require('axios').default;
const Validator = require("validatorjs");

const authModel = require("../model/auth.model");
const userModel = require("../model/user.model");

module.exports.login = async (req, res) => {
  let { EUserName, UserPassword } = req.body;

  let userFromSQL2008

  try {
    userFromSQL2008 = await axios.post('http://localhost:5000/auth/login', { EUserName, UserPassword })
  } catch (error) {
    console.log(error)
  }

  if (!userFromSQL2008 || !userFromSQL2008.data || !userFromSQL2008.data.status) {
    return res.json({ status: false, message: "user or password is invalid" });
  }
  const user = userFromSQL2008.data.data;
  await userModel.syncProfileWithOriginDatabase(user.id, user)

  req.session.isLogin = true;
  req.session.userid = user.id;
  req.session.role_id = user.role;
  req.session.hr_acc = user.hr_acc;

  return res.json({ status: true, message: "login successfully", data: { role: user.role } });
};

module.exports.logout = async (req, res) => {
  req.session.destroy();
  return res.json({ status: true, message: "logout successfully" });
};

module.exports.register = async (req, res) => {
  let body = req.body;

  let rules = {
    TUserName: "required",
    EUserName: "required",
    email: "required",
    EPassword: "required",
    ExtNo: "required",
    Position: "required",
  };

  let validation = new Validator(body, rules);
  if (validation.fails())
    return res.status(412).json({
      status: false,
      message:
        validation.errors.errors[Object.keys(validation.errors.errors)[0]][0],
    });

  let users = await authModel.getUserByUsername(body.EUsername);
  if (users.length > 0) {
    return res.json({ status: false, message: "exists user" });
  }

  let result = await authModel.createUser(body);
  if (!result)
    return res.json({ status: false, message: "failed to register" });
  return res.json({ status: true, message: "register successfully" });
};
