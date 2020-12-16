const mongoose = require('mongoose');

//Map global promises 
mongoose.Promise = global.Promise;
//Mongoose save
mongoose.connect('mongodb+srv://paulnegz:sKullcandiEs8991!@cluster0.6p1ed.mongodb.net/transport',{
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
}).then( () =>console.log('MongoDB Connected!'))
  .catch( err =>console.log(err) );