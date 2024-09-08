const express = require('express')
const router = express.Router()
const articleController =require('../controllers/ArticleController')
// 插入文章
// 查询所有文章
router.get("/articleList",articleController.getArticles)
// 添加
router.post('/insterarticle', articleController.insteraRticle)

module.exports = router