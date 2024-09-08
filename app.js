const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/index')
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(bodyParser.json())
app.use(cors());
// 路由引入用户模块
const routerUser = require('./routes/routerUser')
const routerArticle = require('./routes/routerArticle')
app.use('/admin', routerUser)
app.use('/admin',routerArticle)
// 启动服务器
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
