const express =  require('express');
require('dotenv').config(); 
const cors = require("cors");
const AuthRouter = require('./routes/auth.js');
const connectionDB = require('./db/db.js');


const app = express();

app.use(express.json());
app.use(cors());
  
connectionDB
app.use('/api/auth',AuthRouter);




app.listen(process.env.PORT , ()=>{
    console.log(`server running in port : ${process.env.PORT }`)
})