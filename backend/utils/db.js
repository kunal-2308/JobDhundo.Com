require('dotenv').config()
const mongoose = require('mongoose');
const chalk = require('chalk');

let connectToMongo = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(chalk.green.inverse(`Successfully Connected To Database`));
    } catch (error) {
        console.log(chalk.red.inverse(error));
    }
}
module.exports = connectToMongo;