const express = require("express");
const Login = require('../controllers/Login.js')
const Register = require('../controllers/Register.js')
const GetUser = require("../controllers/GetUser.js")
const {verifyToken , RefleshToken} = require("../JwtUtils/jwtUtils.js")

const rouetr = express.Router();



rouetr.post('/Login',Login);
rouetr.post('/Register',Register);
rouetr.get('/getUser',verifyToken, GetUser);
rouetr.post("/refleshToken",RefleshToken)

module.exports = rouetr;