
const authGoogleAuthenticateController = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
        if (!token) {
            return res.status(401).json({ status: 'ACCESS TOKEN MISSING' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userEmail = decoded.email;
        req.useremail = userEmail;
        next();
    } catch (error) {
        return res.status(500).json({ status: "TOKEN ERROR" });
    }
};

module.exports = authGoogleAuthenticateController;