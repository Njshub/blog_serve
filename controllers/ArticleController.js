const db= require('../db/index')
const responseHandler = require('../utils/responseHandler')
// 查询所有文章
exports.getArticles = async (req, res) => {
    const sql = 'SELECT * FROM articles ORDER BY created_at DESC';
    try {
        const [results] = await db.query(sql);
        return responseHandler.success(res, results, '获取文章列表成功', 200);
    } catch (error) {
        return responseHandler.error(res, {}, '服务器错误', 500);
    }
};

