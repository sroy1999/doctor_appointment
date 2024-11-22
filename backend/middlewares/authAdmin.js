const jwt = require('jsonwebtoken');

// admin authentication middleware
const authAdmin = async(req, res, next) => {
    try {
        const { atoken } = req.headers;
        if(!atoken) {
            return res.status(400).json({ success: false, message: 'User not authorized'});
        }
        const decoded_token = jwt.verify(atoken, process.env.JWT_SECRET_KEY);
        if(decoded_token !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(400).json({ success: false, message: 'User not authorized'});
        }
        next();
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
}

module.exports = { authAdmin };