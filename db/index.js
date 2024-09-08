const mysql = require('mysql2');
// 创建数据库连接
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'blog_node',
}).promise();

module.exports = db