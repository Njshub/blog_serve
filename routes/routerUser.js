const express = require('express')
const router =  express.Router()
const userController = require('../controllers/userController')
// 查询所有用户列表
// 注册
router.post('/register',userController.adminregister)
// 登录
router.post('/login', userController.userlogin)
// 查询所有
router.get('/userList', userController.getUserList)
// 删除
router.delete('/users/:id', userController.deleteUserById);
// 修改
router.put('/users/:id', userController.updateUserById);
// 导入路由
module.exports = router
