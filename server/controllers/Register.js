const UserModel = require('../db/models/user.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')







const Register = async(req,res)=>{
    try{
        const {fullname, email, password} = req.body;
        const Existeuser = await UserModel.findOne({email})
        if(Existeuser){
            return res.status(400).json({message: 'this email already ex'})
        }else{
           

        // Hash password with salt rounds
               const Hashpassword = await bcrypt.hash(password, 10);

        // Create and save the new user
                const user = new UserModel({
                        fullname,
                        email,
                        password: Hashpassword
                 });

                      await user.save();
                      res.status(201).json({ message: 'User created successfully', body: user });
        }

    }catch(err){
        console.log(err)
    }
}

module.exports = Register

