const dotenv = require('dotenv');
dotenv.config({ path: '../config.env' });                                     //When you want to make some key private

const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const cookieparser = require('cookie-parser');                  // to parse means divide the cookie

// const hbs = require('hbs');                                   //when partials will be used
require('./db/conn');
const Register = require('./models/register');                   //when schema and model is inserted
// const { METHODS } = require('http');

const app = express();
const port = process.env.PORT || 5000;

const stat_path = path.join(__dirname, '../public');
app.use(express.static(stat_path));

const temp = path.join(__dirname, '../Templates/views');
app.set('views', temp);
app.set('view engine', 'hbs');

app.use(express.json());                                        //tells to use/accept json file 
app.use(express.urlencoded({ extended: false }));               //takes the data from the body of the page
app.use(cookieparser());


// const partials=path.join(__dirname,'../Templates/partials'); //when partials will be used
// hbs.registerPartials(partials);                              //when partials will be used

//First page when url is hitted

app.get('/', (req, res) => {
    try {
        const token = req.cookies.fit;
        const verifyuser = jwt.verify(token, process.env.secretkey);
        res.status(201).redirect('/userlogined')
    }
    catch (e) {
        res.render('index');
    }
})

app.post('/feedback', (req, res) => {
    res.render('feedback', {
        message: "Thanks for your Feedback"
    })
})

// Signup Activity

app.post('/signup', async (req, res) => {
    try {
        // console.log(req.body.suserid)
        // console.log(req.body.semail)
        // console.log(req.body.spassword)

        const registerbodybuilder = new Register({

            Userid: req.body.suserid,
            Emailid: req.body.semail,
            Password: req.body.spassword

        })
        // Hashing of password using middle ware means in between two process

        const registered = await registerbodybuilder.save();

        res.status(201).render('feedback', {
            message:"Successfully Registered"});
    } catch (error) {
        res.status(400).render('feedback', {
            message: "UserID or EmailID has been already registered"
        })
    }
})

//Login and Logout activity

app.post('/', async (req, res) => {
    try {
        const userid = req.body.luserid;
        const password = req.body.lpassword;

        const infouserid = await Register.findOne({ Userid: userid });
        const ismatch = await bcrypt.compare(password, infouserid.Password);

        const token = await infouserid.generateAuthToken();

        // res.cookie('fit', token);

        res.cookie('fit', token, {
            expires: new Date(Date.now() + 31536000),
            httpOnly: true
        });


        if (ismatch) {
            res.status(201).redirect('userlogined');
        }
        else {
            res.status(400).render('feedback', {
                message: "Invalid Login Credentials"
            })
        }

    } catch (e) {
        res.status(400).render('feedback', {
            message: "Invalid Login Credentials"
        })
    }
})

app.get('/userlogined', async (req, res) => {
    try {
        const token = req.cookies.fit;
        const verifyuser = jwt.verify(token, process.env.secretkey);
        const user = await Register.findOne({ _id: verifyuser._id });
        res.status(201).render('indexlog', {
            username: user.Userid
        })
    } catch (e) {
        res.status(400).render('feedback', {
            message: "Please login again"
        })
    }
})

app.get('/logout', async (req, res) => {
    try {
        const token = req.cookies.fit;
        // console.log(token)
        const verifyuser = jwt.verify(token, process.env.secretkey);
        const user = await Register.findOne({ _id: verifyuser._id });
        res.clearCookie('fit');


        // console.log(user);
        // req.user = user;
        user.tokens = user.tokens.filter((currentcookie) => {
            // console.log(currentcookie)
            return currentcookie.token != token
        })

        // console.log(user);
        await user.save();

        res.status(201).redirect('/')
    } catch (e) {
        res.status(201).render('feedback', {
            message: "Something went wrong"
        })
    }
})

app.listen(port, () => {
    console.log(port)
})
