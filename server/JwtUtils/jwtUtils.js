const CRYPTO = require('crypto');
const SecrectKey_AccesToken = CRYPTO.randomBytes(32).toString('hex');
const SecrectKey_RefleshToken = CRYPTO.randomBytes(32).toString('hex');
const jwt = require('jsonwebtoken');



const GenarateToken = (user)=>{
    const Payload = {
        id: user._id
    }
    const Token = jwt.sign(Payload, SecrectKey_AccesToken, {expiresIn: '1m'})
    const RefleshToken = jwt.sign(Payload, SecrectKey_RefleshToken, {expiresIn: '7d'})
    return {Token , RefleshToken}; 
}


const verifyToken = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).send({ message: 'Access denied. No token provided.' });
    }

    try {
        const decode = jwt.verify(token, SecrectKey_AccesToken);
        req.user = decode;
        console.log("Decoded token:", decode); // Log decoded token payload
        next();
    } catch (err) {
        console.error("JWT Verification Error:", err.message);
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        return res.status(404).json({ message: 'Invalid token' });
    }
};



const RefleshToken = async (req, res) => {
    try {
        const refreshToken = req.header("RefleshToken"); // Retrieve refresh token from the headers
        if (!refreshToken) {
            return res.status(401).json({ message: 'Access denied. No RefleshToken provided.' });
        }

        jwt.verify(refreshToken, SecrectKey_RefleshToken, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Access denied. Invalid RefleshToken.' });
            }

            // Generate a new access token
            const payload = { id: decoded.id };
            const newAccessToken = jwt.sign(payload, SecrectKey_AccesToken, { expiresIn: '1h' });

            return res.status(200).json({
                AccessToken: newAccessToken,
                message: 'Access token refreshed successfully.',
            });
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
};







module.exports = {GenarateToken , verifyToken , RefleshToken}