const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'yourSecretKey';
// 生成 JWT 令牌
function generateToken(payload, expiresIn = '1h') {
    return jwt.sign(payload, secretKey, { expiresIn });
}

// 验证 JWT 令牌
function verifyToken(token) {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
}

module.exports = {
    generateToken,
    verifyToken
};
