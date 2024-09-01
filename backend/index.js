require('dotenv').config()
let connectToMongo = require('./utils/db');
const express = require('express');
const chalk = require('chalk');
const PORT = process.env.PORT || 5000 ;
const cors = require('cors');
const cookieParser = require('cookie-parser');


//middlewares:
let app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
let corsOption = {
  origin:"http://localhost:3000",
  credentials:true,
}
app.use(cors(corsOption));
app.use(cookieParser());



app.listen(PORT,(error)=>{
  connectToMongo();
    if(error){
      console.log(chalk.red.inverse(error));
    }else{
        console.log(chalk.green.inverse(`Listening at PORT ${PORT}`));
    }
});