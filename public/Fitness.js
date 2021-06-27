let Home = document.getElementById('Home');
let Brain = document.getElementById('Brain');
let Body = document.getElementById('Body');
let Contact = document.getElementById('Contact');
let Feedback = document.getElementById('Feedback');
let Header = document.getElementsByClassName('header');
let Home1 = document.getElementsByClassName('Home');
let Brain1 = document.getElementsByClassName('Brain');
let Body1 = document.getElementsByClassName('Body');
let body = document.getElementsByTagName('body');
let Contact1 = document.getElementsByClassName('Contact');
let marquee = document.getElementById('msg');
let section = document.getElementsByClassName('section');

// Reseting height for header after mouseout from navigation menu.

function Adjust(i) {
    document.getElementById('Yoga').style.display = 'none';
    document.getElementById('Food').style.display = 'none';
    document.getElementById('Nutrient').style.display = 'none';
    document.getElementById('Excercise').style.display = 'none';
    document.getElementById('BMI').style.display = 'none';
    document.getElementById('Fitness').style.display = 'none';
    document.getElementById('Flexibility').style.display = 'none';
    document.getElementById('sfeedback').children[0].style.display = 'none';
    document.getElementById('slogin').children[0].style.display = 'none';
    document.getElementById('ssignup').children[0].style.display = 'none';
    marquee.style.display = 'block';
    document.getElementsByClassName('section')[0].style.display = 'flex';
    document.getElementsByTagName('body')[0].style.backgroundImage = 'linear-gradient(orange, rgb(27, 170, 236), cornsilk, lightpink, rgb(47, 233, 30))';
    if (i != 'sfeedback') {
        document.getElementsByClassName(i)[0].style.display = 'block';
    }
}


function resheight() {
    Body1[0].style.display = 'none';
    Brain1[0].style.display = 'none';
    Contact1[0].style.display = 'none';
    Home1[0].style.display = 'none';
}

// Second page changing for Body

function Bodyclick(c, i) {
    Body1[0].style.display = 'none';
    Home1[0].style.display = 'none';
    document.getElementById(c).children[i].style.display = 'grid';
    if (c == 'sbody' && i == 0) {
        document.getElementsByTagName('body')[0].style.backgroundImage = "url('nature1.jpg')";
    }
    if (c == 'sbody' && i == 1) {
        document.getElementsByTagName('body')[0].style.backgroundImage = "url('bodybuild3.jpg')";
    }
    if (c == 'sbody' && (i == 2) || i==3) {
        document.getElementsByTagName('body')[0].style.backgroundImage = "url('food_items1.jpg')";
    }

    marquee.style.display = 'none';
    document.getElementsByClassName('section')[0].style.display = 'none';

    if (outerWidth<=700){
        document.getElementsByClassName('unlist')[0].style.display='none';
        document.getElementsByClassName('join')[0].style.display='flex';
        document.getElementsByClassName('header')[0].style.height='90px';
        document.getElementById('navbar').style.flexDirection='row';
    }
}    

//Controlling the height value for calculation

function calculateheight(i) {
    let height2 = document.getElementById('bmical2');
    let height3 = document.getElementById('bmical3');
    if (i == 1) {
        height3.style.display = 'block';
        height2.style.display = 'none';
    }
    if (i == 2) {
        height2.style.display = 'block';
        height3.style.display = 'none';
    }

}

function calculatebmi() {
    let height2 = document.getElementById('bmical2');
    let height3 = document.getElementById('bmical3');
    let weigth = document.getElementById('weight').value;
    let cm = document.getElementById('Height3').value;
    let foot = document.getElementById('Height1').value;
    let inch = Number(document.getElementById('Height2').value);
    let valuebmi = 0;
    if (height3.style.display == 'block') {
        valuebmi = (weigth * 10000) / (cm * cm);
    }
    if (height2.style.display == 'block') {
        valuebmi = (weigth * 10000) / (((foot * 12 + inch) * 2.54) * ((foot * 12 + inch) * 2.54));
    }
    if (valuebmi > 0 && valuebmi != Infinity) {
        document.getElementById('Height4').innerText = 'BMI: ' + valuebmi;
    }
    else {
        document.getElementById('Height4').innerText = 'Enter correct Value';
    }

}


// Controlling navbar icon

function navicon() {
    if (document.getElementsByClassName('unlist')[0].style.display=='block'){
        document.getElementsByClassName('unlist')[0].style.display='none';
        document.getElementById('navbar').style.flexDirection='row';
        document.getElementsByClassName('join')[0].style.display='flex';
    }
    else{
        document.getElementsByClassName('unlist')[0].style.display='block';
        document.getElementsByClassName('header')[0].style.height='400px';
        document.getElementById('navbar').style.flexDirection='column';
        document.getElementsByClassName('join')[0].style.display='none';
    }
}

//clear error and set error from the validation of form

function clearerror(){
    let clerror=document.getElementsByClassName('ferror');
    for(item of clerror){
        item.innerHTML='';
    }
}

function seterror(value,error){
    console.log(document.getElementById(value))
    document.getElementById(value).getElementsByClassName('ferror')[0].innerText=error;
}


//validate the form

function validate(){
    clearerror();
    let returnval=true;
    let formdata=document.forms['validatesignup'];
    let password=document.forms['validatesignup']['spassword'].value;
    let cpassword=document.forms['validatesignup']['scpassword'].value;
    if(formdata['suserid'].value.length<5){
        seterror('suserid','*Userid is too small');
        returnval=false;
    }
    if(formdata['semail'].value.length>40){
        seterror('semail','*Email is too long');
        returnval=false;
    }
    if(password!=cpassword){
        seterror('scpassword','*Password doesnot matched');
        returnval=false;    
    }
    else{
        if(password.length<8){
            seterror('spassword','*Password is too small');
            returnval=false;
        }
        if(cpassword.length<8){
            seterror('scpassword','*Password is too small');
            returnval=false;
        }
    }
    return returnval;
}

