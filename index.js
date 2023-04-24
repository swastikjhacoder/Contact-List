const express = require('express');
const path = require('path');
const { title } = require('process');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

var contactList = [
    {
        name: 'Swastik',
        phone: '9674910207'
    },
    {
        name: 'Suvechha',
        phone: '9674910208'
    },
    {
        name: 'Swapan',
        phone: '9339296529'
    },
    {
        name: 'Riti',
        phone: '9830930158'
    }
]

app.get('/', function(req, res){
    Contact.find({}, function(err, contacts){
        if(err){
            console.log('Error in fetching contacts fromthe database');
            return;
        }
        return res.render('index',{
            title: "My Contact List",
            contact_list: contacts
        });
    });
});

app.post('/create-contact', function(req,res){
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });
    // contactList.push(req.body);

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }), function(err, newContact){
        if(err){console.log('error in creating a contact!');
        return;}

        console.log('********', newContact);
        return res.redirect('back');
    }
    
});

app.listen(port, function(err){
    if(err){
        console.log('Error in running the server',err);
        return;
    }
    console.log('Yup! My express server is running at port: ',port);
});

app.get('/delete-contact/', function(req, res){
    console.log(req.query);
    let phone = req.query.phone

    let contactindex = contactList.findIndex(contact => contact.phone == phone);

    if(contactindex != -1){
        contactList.splice(contactindex, 1);
    }

    return res.redirect('back');
});