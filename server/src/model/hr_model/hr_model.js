const query = require('../_database')
const mssql = require('mssql')


module.exports.CreateProfile = async (create_user_name, body) => {
    let parameters = [
        { name: "name_th", sqltype: mssql.VarChar, value: body.name_th },
        { name: "name_en", sqltype: mssql.VarChar, value: body.name_en },
        { name: "nick_name", sqltype: mssql.VarChar, value: body.nick_name },
        { name: "start_date_work", sqltype: mssql.VarChar, value: body.start_date_work },
        { name: "sign_date_work", sqltype: mssql.VarChar, value: body.sign_date_work },
        { name: "position", sqltype: mssql.VarChar, value: body.position },
        { name: "department", sqltype: mssql.VarChar, value: body.department },
        { name: "address", sqltype: mssql.VarChar, value: body.address },
        { name: "idcard_no", sqltype: mssql.VarChar, value: body.idcard_no },
        { name: "phone", sqltype: mssql.VarChar, value: body.phone },
        { name: "date_card_start", sqltype: mssql.VarChar, value: body.date_card_start },
        { name: "date_card_exp", sqltype: mssql.VarChar, value: body.date_card_exp },
        { name: "action_user", sqltype: mssql.VarChar, value: body.action_user },
        { name: "create_user_name", sqltype: mssql.Int, value: create_user_name },
        { name: "maihet", sqltype: mssql.VarChar, value: body.maihet },
        { name: "img_simple", sqltype: mssql.VarChar, value: body.img_simple },

        // { name: "status_it", sqltype: mssql.VarChar, value: body.status_it },
        { name: "sign_it", sqltype: mssql.VarChar, value: body.sign_it },
        // { name: "status_contract", sqltype: mssql.VarChar, value: body.status_contract },
        { name: "sign_contract", sqltype: mssql.VarChar, value: body.sign_contract },
        { name: "sign_head", sqltype: mssql.VarChar, value: body.sign_head },


    ]
    let sql = `
        INSERT INTO tb_hr (name_th, name_en, nick_name, start_date_work, sign_date_work, position, department, address, idcard_no, 
        phone, date_card_start, date_card_exp, action_user, create_user_name, img_simple, maihet, sign_it, sign_contract, 
        sign_head, status_hr, status_it, status_contract, status_head) 
        OUTPUT Inserted.id
        VALUES (@name_th, @name_en, @nick_name, @start_date_work, @sign_date_work,  @position, @department, @address, 
        @idcard_no, @phone, @date_card_start, @date_card_exp, @action_user, @create_user_name, @img_simple, @maihet, 
        @sign_it, @sign_contract, @sign_head, 'Pending', 'Pending', 'Pending', 'Pending')
    `

    let result = await query(sql, parameters)
    return result
}


module.exports.UpdateProfile = async (id, body) => {
    let parameters = [
        { name: "name_th", sqltype: mssql.VarChar, value: body.name_th },
        { name: "name_en", sqltype: mssql.VarChar, value: body.name_en },
        { name: "nick_name", sqltype: mssql.VarChar, value: body.nick_name },
        { name: "start_date_work", sqltype: mssql.VarChar, value: body.start_date_work },
        { name: "sign_date_work", sqltype: mssql.VarChar, value: body.sign_date_work },
        { name: "position", sqltype: mssql.VarChar, value: body.position },
        { name: "department", sqltype: mssql.VarChar, value: body.department },
        { name: "address", sqltype: mssql.VarChar, value: body.address },
        { name: "idcard_no", sqltype: mssql.VarChar, value: body.idcard_no },
        { name: "phone", sqltype: mssql.VarChar, value: body.phone },
        { name: "date_card_start", sqltype: mssql.VarChar, value: body.date_card_start },
        { name: "date_card_exp", sqltype: mssql.VarChar, value: body.date_card_exp },
        { name: "action_user", sqltype: mssql.VarChar, value: body.action_user },
        { name: "id", sqltype: mssql.Int, value: id },
        { name: "maihet", sqltype: mssql.VarChar, value: maihet },
        { name: "img_simple", sqltype: mssql.VarChar, value: body.img_simple }
    ]

    let sql = `
        UPDATE tb_hr 
        SET name_th = @name_th
            ,name_en = @name_en
            ,nick_name = @nick_name
            ,start_date_work = @start_date_work
            ,sign_date_work = @sign_date_work
            ,position = @position
            ,department = @department
            ,address = @address
            ,idcard_no = @idcard_no
            ,phone = @phone
            ,date_card_start = @date_card_start
            ,date_card_exp = @date_card_exp
            ,action_user = @action_user
            ,img_simple = @img_simple
            ,maihet = @maihet
            OUTPUT Inserted.id
            WHERE id = @id
    `

    let result = await query(sql, parameters)
    return result
}
//ดีงข้อมูลทั้งหมด
module.exports.GetProfile = async (id) => {
    let parameters = [
        { name: "id", sqltype: mssql.Int, value: id },
    ]
    let sql = `
        SELECT * FROM tb_hr ORDER BY id DESC
    `
    let result = await query(sql, parameters)
    return result
}
//ดึงข้อมูลจาก from
module.exports.GetProfileID = async (id) => {
    let parameters = [
        { name: "id", sqltype: mssql.Int, value: id },
    ]
    let sql = `
    SELECT h.id, h.name_th, h.name_en, h.nick_name, FORMAT(h.start_date_work, 'yyyy-MM-dd') as start_date_work,
    h.sign_date_work, h.position, h.department, h.address, h.idcard_no, h.phone, h.date_card_start, h.date_card_exp,
    h.action_user, u.TUserName, maihet, img_simple, status_it, sign_it, status_contract, sign_contract, status_head, sign_head
    FROM tb_hr h
    Left join tb_users u On u.id = h.create_user_name
    WHERE h.id = @id
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
       h.position, h.department, h.branch, h.phone, h.status_hr
       FROM tb_hr h
	   WHERE id = @id
    `
    let result = await query(sql, parameters)
    return result
}


module.exports.GetAdduser = async (id) => {
    let parameters = [
        { name: "id", sqltype: mssql.Int, value: id },
    ]
    let sql = `
    SELECT h.id, h.name_th, h.name_en, h.product, user_id,
       ext_no, action_user,agent_adduser
       FROM tb_hr h
	   WHERE id = @id
    `
    let result = await query(sql, parameters)
    return result
}
module.exports.UpdateAdduserID = async (id, body) => {
    let parameters = [
        { name: "name_th", sqltype: mssql.VarChar, value: body.name_th },
        { name: "product", sqltype: mssql.VarChar, value: body.product },
        { name: "user_id", sqltype: mssql.VarChar, value: body.user_id },
        { name: "name_en", sqltype: mssql.VarChar, value: body.name_en },
        { name: "ext_no", sqltype: mssql.VarChar, value: body.ext_no },
        { name: "action_user", sqltype: mssql.VarChar, value: body.action_user },
        { name: "agent_adduser", sqltype: mssql.VarChar, value: body.agent_adduser },
        { name: "id", sqltype: mssql.Int, value: id },
    ];

    let sql = `
        UPDATE tb_hr
        SET 
        name_th = @name_th,
        product = @product,
        user_id = @user_id,
        name_en = @name_en,
        ext_no = @ext_no,
        action_user = @action_user,
        agent_adduser = @agent_adduser
        OUTPUT INSERTED.*
        WHERE id = @id
        `;

    let update = await query(sql, parameters);
    return update;
}

// update ข้อมูลการ approve ของแต่ระ แผนก
module.exports.UpdateAppit = async (id, body, status_hr) => {
    let parameters = [
        { name: "status_it", sqltype: mssql.VarChar, value: body.status_it },
        { name: "sign_it", sqltype: mssql.VarChar, value: body.sign_it },
        { name: "status_hr", sqltype: mssql.VarChar, value: status_hr },
        { name: "id", sqltype: mssql.Int, value: id },

    ];

    let sql = `
        UPDATE tb_hr
        SET 
        status_it = @status_it,
        sign_it = @sign_it,
        status_hr = @status_hr
        OUTPUT INSERTED.*
        WHERE id = @id
        `;
    let update = await query(sql, parameters);
    return update;
}

module.exports.UpdateAppct = async (id, body) => {
    let parameters = [
        { name: "status_contract", sqltype: mssql.VarChar, value: body.status_contract },
        { name: "sign_contract", sqltype: mssql.VarChar, value: body.sign_contract },
        { name: "status_hr", sqltype: mssql.VarChar, value: status_hr },
        { name: "id", sqltype: mssql.Int, value: id },
    ];

    let sql = `
        UPDATE tb_hr
        SET 
        status_contract = @status_contract,
        sign_contract = @sign_contract,
        status_hr = @status_hr
        OUTPUT INSERTED.*
        WHERE id = @id
        `;
    let update = await query(sql, parameters);
    return update;
}

module.exports.UpdateHead_hr = async (id, body) => {
    let parameters = [
        { name: "status_head", sqltype: mssql.VarChar, value: body.status_contract },
        { name: "sign_head", sqltype: mssql.VarChar, value: body.sign_contract },
        // { name: "status_hr", sqltype: mssql.VarChar, value: status_hr },
        { name: "id", sqltype: mssql.Int, value: id },
    ];

    let sql = `
        UPDATE tb_hr
        SET 
        status_head = @status_head,
        sign_head = @sign_head
        OUTPUT INSERTED.*
        WHERE id = @id
        `;
    let update = await query(sql, parameters);
    return update;
}




