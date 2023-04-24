//require the library
const mongoose = require('mongoose');
//connect to the database
mongoose.connect('mongodb://localhost/contacts_list_db');
//acquire the connection (to check if it is successful)
const db = mongoose.connection;
//while error occured connecting to the database
db.on('error', console.error.bind(console, 'error connecting to db'));
//when successfully connected
db.once('open', function(){
    console.log('Successfully connected to the database');
});