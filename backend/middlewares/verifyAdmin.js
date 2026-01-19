const verifyAdmin = (req, res, next) => {
    if (!req.user || req.user.scope !== 'admin') {
        return res.status(403).json({ error: "Pristup odbijen, samo administratori" });
    }
    next();
};

module.exports = verifyAdmin;
