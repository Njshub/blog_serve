// 引入MySQL
const db = require('../db/index')
const responseHandler = require('../utils/responseHandler')
const bcrypt = require('bcrypt');
const { generateToken, verifyToken } = require('../config/jwttoken')
exports.userList = (req, res) => {
}
// 注册
exports.adminregister = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return responseHandler.error(res, {}, '用户名和密码是必填项', 400);
    }
    try {
        const existingUsers = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (existingUsers.length > 0) {
            return responseHandler.error(res, {}, '用户已存在', 409);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
        const token = generateToken({ userId: result.insertId, username });
        return responseHandler.success(res, { userId: result.insertId,token}, '注册成功', 201);

    } catch (error) {
        console.error('注册错误:', error);
        const errorMessage = error.code === 'ER_DUP_ENTRY' ? '用户名已存在' : '服务器错误，请稍后重试';
        return responseHandler.error(res, {}, errorMessage, 500);
    }
};
exports.userlogin = async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ message: '用户名和密码是必填项' });
    }
    try {
        const [result] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (!result || result.length === 0) {
            return res.status(404).json({ message: '用户不存在' });
        }
        const user = result[0]; // 获取用户数据
        // 验证密码
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: '密码错误' });
        }
        // 生成 JWT
        const token = generateToken({ userId: user.id, username });
        return res.status(200).json({ message: '登录成功！', token });
    } catch (error) {
        console.error('登录错误:', error);
        return res.status(500).json({ message: '服务器出现问题', error });
    }
};
// 查询所有
exports.getUserList = (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (error, results) => {
        if (error) {
            return responseHandler.error(res, error, '服务器错误', 500);
        }
        return responseHandler.success(res, results, '查询成功');
    });
};
// 删除
exports.deleteUserById = (req, res) => {
    const { id } = req.params;
    if (!id) {
        return responseHandler.error(res, {}, '用户 ID 是必填项', 400)
    }
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [id], (error, result) => {
        if (error) {
            return responseHandler.error(res, {}, '服务器错误', 500)
        }
        if (result.affectedRows === 0) {
            return responseHandler.error(res, {}, '用户不存在', 404)
        }
        return responseHandler.success(res, {}, '删除成功', 200)
    });
};
// 修改
exports.updateUserById = async (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;
    if (!id || !username || !password) {
        return responseHandler.error(res, {}, 'ID、用户名和密码是必填项')
    }
    try {
        const sql = 'UPDATE users SET username = ?, password = ? WHERE id = ?';
        const result = await db.query(sql, [username, password, id]);
        if (result.affectedRows === 0) {
            return responseHandler.error(res, {}, '用户未找到', 404)
        }
        return responseHandler.success(res, { updatedUser: { id, username, password } }, '用户更新成功');
    } catch (error) {
        console.error('数据库错误:', error);
        return responseHandler.error(res, error, '数据库操作失败');
    }
};
