const query = require('../_database')
const mssql = require('mssql')


module.exports.CreateProfile = async (create_user_name, body) => {
    let parameters = [
        { name: "name_th", sqltype: mssql.VarChar, value: body.name_th },
        { name: "name_en", sqltype: mssql.VarChar, value: body.name_en },
        { name: "nick_name", sqltype: mssql.VarChar, value: body.nick_name },
        { name: "position", sqltype: mssql.VarChar, value: body.position },
        { name: "department", sqltype: mssql.VarChar, value: body.department },
        { name: "note", sqltype: mssql.VarChar, value: body.note },
        { name: "create_user_name", sqltype: mssql.Int, value: create_user_name },
        { name: "start_date_work", sqltype: mssql.VarChar, value: body.start_date_work },

    ]
    let sql = `
        INSERT INTO tb_hr (name_th, name_en, nick_name, position, department, note, create_user_name, status_hr, start_date_work) 
        OUTPUT Inserted.id
        VALUES (@name_th, @name_en, @nick_name, @position, @department, @note, @create_user_name, 'Pending', @start_date_work)
    `

    let result = await query(sql, parameters)
    return result
}

module.exports.GetProfile = async () => {
    let parameters = [

    ]
    let sql = `
        SELECT h.id, h.name_th, h.name_en, FORMAT(h.start_date_work, 'yyyy-MM-dd') as start_date_work, 
        h.position, h.department, h.note, h.branch,
        h.nick_name, u.TUserName, status_hr,
        h.idcard_no, h.bird_day, h.social_security, h.phone,
        h.name_hospital, h.acc_no

        FROM tb_hr h
        Left join tb_users u On u.id = h.create_user_name
    `
    let result = await query(sql, parameters)
    return result
}

module.exports.UpdateFullProfileID = async (id, body) => {
    let parameters = [
        { name: "employee_no", sqltype: mssql.VarChar, value: body.employee_no },
        { name: "name_th", sqltype: mssql.VarChar, value: body.name_th },
        { name: "name_en", sqltype: mssql.VarChar, value: body.name_en },
        { name: "nick_name", sqltype: mssql.VarChar, value: body.nick_name },
        { name: "idcard_no", sqltype: mssql.VarChar, value: body.idcard_no },
        { name: "bird_day", sqltype: mssql.VarChar, value: body.bird_day },
        { name: "social_security", sqltype: mssql.VarChar, value: body.social_security },
        { name: "name_hospital", sqltype: mssql.VarChar, value: body.name_hospital },
        { name: "acc_no", sqltype: mssql.VarChar, value: body.acc_no },
        { name: "start_date_work", sqltype: mssql.VarChar, value: body.start_date_work },
        { name: "position", sqltype: mssql.VarChar, value: body.position },
        { name: "department", sqltype: mssql.VarChar, value: body.department },
        { name: "branch", sqltype: mssql.VarChar, value: body.branch },
        { name: "phone", sqltype: mssql.VarChar, value: body.phone },
        // { name: "status_hr", sqltype: mssql.VarChar, value: 'confirm' },
        { name: "id", sqltype: mssql.Int, value: id },
    ];

    let sql = `
        UPDATE tb_hr
        SET employee_no = @employee_no,
        name_th = @name_th,
        name_en = @name_en,
        nick_name = @nick_name,
        idcard_no = @idcard_no,
        bird_day = @bird_day,
        social_security = @social_security,
        name_hospital = @name_hospital,
        acc_no = @acc_no,
        start_date_work = @start_date_work,
        position = @position,
        department = @department,
        branch = @branch,
        phone = @phone,
        status_hr = 'Confirm'
        OUTPUT INSERTED.*

        WHERE id = @id
        `;

    let update = await query(sql, parameters);
    return update;
}

module.exports.GetFullProfile = async (id) => {
    let parameters = [
        { name: "id", sqltype: mssql.Int, value: id },
    ]
    let sql = `
    SELECT h.id, h.employee_no, h.name_th, h.name_en, h.nick_name, h.idcard_no,
       h.bird_day,h.social_security,h.name_hospital,h.acc_no,h.start_date_work,
       h.position, h.department,h.branch,h.phone,h.status_hr
       FROM tb_hr h
	   WHERE id = @id
    `
    let result = await query(sql, parameters)
    return result
}

