const jwt = require('jsonwebtoken');

// admin authentication middleware
const authAdmin = async(req, res, next) => {
    try {
        const { admin_token } = req.headers;
        if(!token) {
            return res.status(400).json({ success: false, message: 'User not authorized'});
        }
        const decoded_token = jwt.verify(admin_token, process.env.JWT_SECRET_KEY);
        if(decoded_token !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(400).json({ success: false, message: 'User not authorized'});
        }
        next();
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
}

module.exports = { authAdmin };