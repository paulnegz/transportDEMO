const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

//DB config
require('./public/config/db')

const app = express();
const demo = require('./routes/demo')

//Set publiic folder
app.use(express.static(path.join(__dirname, 'public')));

//body parser middleware frrom documention
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//router to demo
app.use('/demo', demo);

//enable CORS
app.use(cors());
const port = 3000;

// app.listen(port, ()=>console.log('Server started on port ${port}'));
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Server Has Started!");
 });