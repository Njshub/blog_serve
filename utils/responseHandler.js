// responseHandler.js
exports.success = (res, data = {}, message = '操作成功') => {
    res.status(200).json({
        code: 200,
        message,
        data
    });
};
exports.error = (res, error = {}, message = '服务器错误', statusCode = 500) => {
    res.status(statusCode).json({
        code: statusCode,
        message,
        error
    });
};



