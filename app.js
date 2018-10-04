// Requiring modules
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const config = require('konphyg')('./config/')('all.'+process.env.NODE_ENV);
const path = require('path');
const multer = require('multer');

// Initializing the app 
const app = express();

// Initializing customized Router
const Router = require('./routes/routes');

// Setting up the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Initilizing body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Initializing Routes
Router.mountAPI(app);

// Static file hosting
app.use(express.static(path.join(__dirname, '/public')));

// APP SERVER
app.listen(config.APP.port, () => {
    console.log(`Server started on port ${config.APP.port}`);
});