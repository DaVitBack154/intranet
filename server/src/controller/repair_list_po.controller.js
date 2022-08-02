const repair_list_poModel = require("../model/repair_list_po.model");

module.exports.getRepairPoItList = async (req, res) => {
  // let userid = 9
  let { id } = req.params;
  let userRoleId = req.session.role_id;

  if (!req.session.isLogin) {
    return res.status(401).json({ status: false, message: "unauthorize" });
  }

  if (userRoleId !== 5) {
    return res
      .status(403)
      .json({ status: false, message: "Permission denied" });
  }

  let details = await repair_list_poModel.getRepairPoItList(id);
  if (details.length < 1) {
    return res.json({ status: false, message: "Not found information" });
  }

  return res.json({ status: true, data: details });
};
module.exports.getRepairPoBuildingList = async (req, res) => {
  // let userid = 9
  let { id } = req.params;
  let userRoleId = req.session.role_id;

  if (!req.session.isLogin) {
    return res.status(401).json({ status: false, message: "unauthorize" });
  }

  if (userRoleId !== 5) {
    return res
      .status(403)
      .json({ status: false, message: "Permission denied" });
  }

  let details = await repair_list_poModel.getRepairPoBuildingList(id);
  if (details.length < 1) {
    return res.json({ status: false, message: "Not found information" });
  }

  return res.json({ status: true, data: details });
};
module.exports.getRepairPoDetail = async (req, res) => {
  let { id } = req.params;
  let userRoleId = req.session.role_id;

  if (!req.session.isLogin) {
    return res.status(401).json({ status: false, message: "unauthorize" });
  }

  if (userRoleId !== 5) {
    return res
      .status(403)
      .json({ status: false, message: "Permission denied" });
  }

  let details = await repair_list_poModel.getRepairPoDetail(id);
  if (details.length < 1) {
    return res.json({ status: false, message: "Not found information" });
  }

  return res.json({ status: true, data: details });
};

module.exports.updateRepairPoList = async (req, res) => {
  let { id } = req.params;
  let userid = req.session.userid;
  if (!req.session.isLogin) {
    return res.status(401).json({ status: false, message: "unauthorize" });
  }
  if (req.session.role_id !== 5) {
    return res
      .status(403)
      .json({ status: false, message: "permission denied" });
  }
  let body = req.body;

  let update = await repair_list_poModel.updateRepairPo(userid, id, body);
  if (update == false) {
    return res.json({ status: false, message: "UPDATE FAILED" });
  } else {
    // updateData = update[0];
    // updateData.close_date = body.close_date;
    // await repair_listModel.createRepairLogs(updateData);
    return res.json({ status: true, message: "UPDATE SUCCESS" });
  }
};
