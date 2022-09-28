const query = require("./_database");
const mssql = require("mssql");

module.exports.getRepairFinItList = async (id) => {
  let parameters = [{ name: "id", sqltype: mssql.Int, value: id }];
  let sql = `
  SELECT rt.id, rt.ticket_no, FORMAT (rt.create_date, 'yyyy-MM-dd HH:mm:ss') as create_date, u.TUserName, u.ExtNo, rt.ip
  ,rt.description,ua.TUserName as admin_name, remark, img_repair, fin_approve, fp.TUserName as fin_name, fin_number
  , FORMAT (rt.fin_date, 'yyyy-MM-dd HH:mm:ss') as fin_date, img_fin, rt.type_id, rt.fin_recipient
  FROM repair_list rt
  Left join tb_users u On u.id = rt.user_id
  Left join tb_users ua On ua.id = rt.admin_id
  left join tb_users fp On fp.id = rt.fin_id
  Left join tb_department d On d.id = rt.dep_id
  Left join tb_status s ON s.id =rt.status_id
  Left join tb_type t ON t.id=rt.type_id
  Left join tb_branch b ON b.id = rt.branch_id
  WHERE rt.type_id = 1
  AND rt.expence_id in (6)
    `;

  if (id) {
    sql += ` AND rt.id = @id`;
  }

  sql += ` ORDER BY rt.id DESC `;
  let user = await query(sql, parameters);
  return user;
};

module.exports.getRepairFinBuildingList = async (id) => {
  let parameters = [{ name: "id", sqltype: mssql.Int, value: id }];
  let sql = `
  SELECT rt.id, rt.ticket_no, FORMAT (rt.create_date, 'yyyy-MM-dd HH:mm:ss') as create_date, u.TUserName, u.ExtNo, rt.ip
  ,rt.description,ua.TUserName as admin_name, remark, img_repair, fin_approve, fp.TUserName as fin_name, fin_number
  , FORMAT (rt.fin_date, 'yyyy-MM-dd HH:mm:ss') as fin_date, img_fin, rt.type_id, rt.fin_recipient
  FROM repair_list rt
  Left join tb_users u On u.id = rt.user_id
  Left join tb_users ua On ua.id = rt.admin_id
  left join tb_users fp On fp.id = rt.fin_id
  Left join tb_department d On d.id = rt.dep_id
  Left join tb_status s ON s.id =rt.status_id
  Left join tb_type t ON t.id=rt.type_id
  Left join tb_branch b ON b.id = rt.branch_id
  WHERE rt.type_id = 2
  AND rt.expence_id in (6)
    `;

  if (id) {
    sql += ` AND rt.id = @id`;
  }

  sql += ` ORDER BY rt.id DESC `;
  let user = await query(sql, parameters);
  return user;
};

module.exports.getRepairFinDetail = async (id) => {
  let parameters = [{ name: "id", sqltype: mssql.Int, value: id }];
  let sql = `
  SELECT rt.id, rt.ticket_no, FORMAT (rt.create_date, 'yyyy-MM-dd HH:mm:ss') as create_date, u.TUserName, u.ExtNo, rt.ip
  ,rt.description,ua.TUserName as admin_name, remark, img_repair, fin_approve, fp.TUserName as fin_name, fin_number
  , FORMAT (rt.fin_date, 'yyyy-MM-dd HH:mm:ss') as fin_date, img_fin, rt.type_id, rt.fin_recipient
  FROM repair_list rt
  Left join tb_users u On u.id = rt.user_id
  Left join tb_users ua On ua.id = rt.admin_id
  left join tb_users fp On fp.id = rt.fin_id
  Left join tb_department d On d.id = rt.dep_id
  Left join tb_status s ON s.id =rt.status_id
  Left join tb_type t ON t.id=rt.type_id
  Left join tb_branch b ON b.id = rt.branch_id
  WHERE rt.expence_id in (6)
    `;

  if (id) {
    sql += ` AND rt.id = @id`;
  }

  sql += ` ORDER BY rt.id DESC `;

  let user = await query(sql, parameters);
  return user;
};

module.exports.updateRepairFin = async (userid, id, body) => {
  let parameters = [
    { name: "fin_id", sqltype: mssql.Char, value: userid },
    { name: "fin_approve", sqltype: mssql.Int, value: body?.fin_approve },
    { name: "fin_number", sqltype: mssql.VarChar, value: body?.fin_number },
    {
      name: "fin_recipient",
      sqltype: mssql.VarChar,
      value: body?.fin_recipient,
    },
    { name: "fin_date", sqltype: mssql.VarChar, value: body?.fin_date },
    { name: "img_fin", sqltype: mssql.VarChar, value: body?.img_fin },
    { name: "id", sqltype: mssql.Int, value: id },
  ];

  let sql = `
        UPDATE repair_list
        SET fin_id = @fin_id,
            fin_approve = @fin_approve,
            fin_number = @fin_number,
            fin_date = @fin_date,
            img_fin = @img_fin,
            fin_recipient = @fin_recipient
        OUTPUT INSERTED.*
        WHERE Id = @Id
    `;

  let update = await query(sql, parameters);
  return update;
};
