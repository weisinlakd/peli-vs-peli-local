// ===================
// ENTORNO
// ===================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';




// ===================
// SERVER
// ===================

process.env.SERVER = process.env.SERVER || 'http://localhost:3000';




// ===================
// PUERTO
// ===================

process.env.PORT = process.env.PORT || 3000




// ===================
// DB
// ===================

let host;
let port;
let user;
let password;


if (process.env.NODE_ENV === 'dev'){
    host = 'localhost';
    port = 3306;
    user = 'root';
    password = 'obcc-40b';
    
}else {
    host = process.env.MYSQL_URI; //ex mongodb_uri
    port = process.env.PORT_MYSQL;
    user = process.env.USER_MYSQL;
    password = process.env.PASSWORD_MYSQL;
}

process.env.HOST = host;
process.env.PORT_SQL = port;
process.env.USER = user;
process.env.PASSWORD = password;



