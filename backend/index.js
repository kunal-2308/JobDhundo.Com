require('dotenv').config()
let connectToMongo = require('./utils/db');
const express = require('express');
const chalk = require('chalk');
const PORT = process.env.PORT || 5000 ;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRoutes');
const companyRouter = require('./routes/companyRoutes');
const jobRouter = require('./routes/jobRoutes');
const applicationRouter = require('./routes/applicationRoutes');

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



//api's:
//Example Routes : "localhost:8000/api/v1/user/register" ---> Register
app.use("/api/v1/user",userRouter);
app.use("/api/v1/company",companyRouter);
app.use("/api/v1/job",jobRouter);
app.use("/api/v1/application",applicationRouter);



app.listen(PORT,(error)=>{
  connectToMongo();
    if(error){
      console.log(chalk.red.inverse(error));
    }else{
        console.log(chalk.green.inverse(`Listening at PORT ${PORT}`));
    }
});