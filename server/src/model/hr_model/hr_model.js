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


    ]
    let sql = `
        INSERT INTO tb_hr (name_th, name_en, create_date, nick_name, position, department, note, create_user_name, status_hr) 
        OUTPUT Inserted.id
        VALUES (@name_th, @name_en, GETDATE(), @nick_name, @position, @department, @note, @create_user_name, 'Pending')
    `

    let result = await query(sql, parameters)
    return result
}

module.exports.GetProfile = async () => {
    let parameters = [
        
    ]
    let sql = `
        SELECT h.id, h.name_th, h.name_en, FORMAT(h.create_date, 'yyyy-MM-dd HH:mm:ss') as create_date, 
        h.position, h.department, h.note,
        h.nick_name, u.TUserName, status_hr
        FROM tb_hr h
        Left join tb_users u On u.id = h.create_user_name
    `
    let result = await query(sql, parameters)
    return result
}

