const mongoose = require('mongoose');
const dotenv= require('dotenv');
dotenv.config({path: './config.env'});


const DB = process.env.DATABASE;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log('Successful')
}).catch(() => {
    console.log('unsuccessful')
})