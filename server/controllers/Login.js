const UserModel = require('../db/models/user.js')
const bcrypt = require('bcrypt');
const {GenarateToken} = require('../JwtUtils/jwtUtils.js');



const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        
        const User = await UserModel.findOne({ email });
        if (!User) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        
        const Check = await bcrypt.compare(password, User.password);
        if (!Check) {
            return res.status(400).json({ message: 'Invalid password' });
        }

       
        const {Token , RefleshToken} = GenarateToken(User); 
        
        return res.status(200).json({
            status: 200,
            message: 'Login Successful',
            token: Token,
            refleshToken: RefleshToken,
            user: {
                id: User._id,
                email: User.email,
                fullname: User.fullname 
            }
        });
    } catch (err) {
        console.error(err);
        // Internal Server Error
        return res.status(500).json({ message: 'An error occurred. Please try again later.' });
    }
};


module.exports = Login
