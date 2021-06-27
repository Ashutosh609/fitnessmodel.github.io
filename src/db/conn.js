const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/fitnessdb',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true}).then(()=>{
        console.log('Successful')
    }).catch(()=>{
        console.log('unsuccessful')
    })