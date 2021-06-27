const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const Bodybuilder = new mongoose.Schema({
    Userid: {
        type: String,
        unique: true
    },
    Emailid: {
        type: String,
        unique: true
    },
    Password: {
        type: String
    },
    tokens:[{
        token:{
            type:String
        }
    }]
})

// generation token and save in database
Bodybuilder.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, process.env.secretkey);
        this.tokens= this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (e) {
        res.status(400).send('Somethings went wrong')
    }
}


// here we will hash the password using pre concept of middleware

Bodybuilder.pre('save', async function (next) {

    if (this.isModified('Password')) {
        this.Password = await bcrypt.hash(this.Password, 10);
    }
    next();
})

const Register = new mongoose.model('Register', Bodybuilder);   //Creating collection using above schema

module.exports = Register;
