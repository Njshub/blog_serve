// config/database.js
const { Sequelize } = require('sequelize');

// 初始化 Sequelize 实例，连接到 MySQL 数据库
const sequelize = new Sequelize('blog_node', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql',
  logging: true, // 输入日记
});
module.exports = sequelize;
