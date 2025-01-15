const UserModel = require('../db/models/user.js')





const GetUser = async (req, res) => {
    try {
        const userId = req.user.id;

        
        const User = await UserModel.findById(userId);
        if (!User) {
            return res.status(400).json({ message: 'User Not Found' });
        }

        return res.status(200).json({
            status: 200,
            message: 'User Fetched Successful',
            data: User
        });
    } catch (err) {
        console.error(err);
        // Internal Server Error
        return res.status(500).json({ message: 'An error occurred. Please try again later.' });
    }
};


module.exports = GetUser;