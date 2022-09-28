const query = require('./_database')
const mssql = require('mssql')

module.exports.getProfileByID = async (id) => {
    console.log(id)
    let parameters = [
        { name: "id", sqltype: mssql.Char, value: id },
    ]
    let user = await query(`
        SELECT EUserName, TUserName, Position, ExtNo, role, hr_acc
        FROM tb_users 
        WHERE id=@id
    `, parameters)
    return user;
}

module.exports.updateProfile = async (id, body) => {
    let sql = `
    UPDATE tb_users 
    SET 
        first_name=@first_name
        , last_name=@last_name
        , email=@email
        , phone=@phone 
    OUTPUT Inserted.id
    WHERE id=@id
    `

    let parameters = [
        { name: "id", sqltype: mssql.Int, value: id },
        { name: "first_name", sqltype: mssql.VarChar, value: body.first_name },
        { name: "last_name", sqltype: mssql.VarChar, value: body.last_name },
        { name: "email", sqltype: mssql.VarChar, value: body.email },
        { name: "phone", sqltype: mssql.VarChar, value: body.phone },

    ]
    let user = await query(sql, parameters)
    return user
}

module.exports.getEmployeeByID = async (type_dep) => {

    let parameters = [
        { name: "type_dep", sqltype: mssql.Int, value: type_dep },
    ]
    let user = await query(`
        SELECT id, TUserName, Position, ExtNo, image, nickname, sort
        FROM tb_users
        WHERE type_dep = @type_dep
		ORDER BY sort ASC
    `, parameters)
    return user;
}

module.exports.syncProfileWithOriginDatabase = async (id, profile) => {

    const { TUserName, EUserName, UserPassword, Position, ExtNo, role, hr_acc } = profile;
    let updateSQL = `
        IF EXISTS (SELECT id FROM tb_users WHERE id = @id)
        BEGIN
            UPDATE tb_users 
            SET 
                TUserName=@TUserName
                , EUserName=@EUserName
                , UserPassword=@UserPassword
                , Position=@Position 
                , ExtNo=@ExtNo 
                , role=@role 
                , hr_acc=@hr_acc 
            OUTPUT Inserted.id
            WHERE id=@id
        END
        ELSE
        BEGIN
            INSERT INTO tb_users (id, TUserName, EUserName, ExtNo, Position, UserPassword, role, hr_acc)
            OUTPUT Inserted.id
            VALUES (@id, @TUsername, @EUsername, @Extno, @Position, @UserPassword, @role, @hr_acc)
        END
    `

    let parameters = [
        { name: "id", sqltype: mssql.Char, value: id },
        { name: "TUserName", sqltype: mssql.VarChar, value: TUserName },
        { name: "EUserName", sqltype: mssql.VarChar, value: EUserName },
        { name: "UserPassword", sqltype: mssql.VarChar, value: UserPassword },
        { name: "Position", sqltype: mssql.VarChar, value: Position },
        { name: "ExtNo", sqltype: mssql.VarChar, value: ExtNo },
        { name: "role", sqltype: mssql.Int, value: role },
        { name: "hr_acc", sqltype: mssql.VarChar, value: hr_acc },
    ]

    let user = await query(updateSQL, parameters)

    return user
}