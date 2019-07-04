const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const cors = require('cors');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const moment = require('moment');

//const mongoose = require('mongoose');

//const cookieParser = require('cookie-parser');
const app = express();

//Handlebars Middleware
app.engine('handlebars', exphbs({
  defaultLayout:'main'
 }));
 app.set('view engine', 'handlebars');

 //connect mongo
const db = require('./config2/mongo')

// Map global promises
mongoose.Promise = global.Promise;
//connect mongo
mongoose.connect(db.mongoURI, {
  useNewUrlParser:true
})
.then(()=>console.log('mongodb connected'))
.catch(err => console.log(err));

//load contestantsName model
const Contestants = require('./model/cotestantsNames');

 //load  user model
const user = require('./model/user');

 // Passport Config
 require('./config/passport')(passport);

//routes/polls 
const vote = require ('./routes/vote');

//load index route
const index = require ('./routes/index');

//load admin route
const admin = require ('./routes/admin');

//load contestants route
const contestants= require('./routes/contestants');

// let transporter = nodemailer.createTransport({
//   // host : 'https://shrouded-escarpment-78977.herokuapp.com',
//   service : 'gmail',
//   secure : false,
//   port : 25,
//   auth:{
//     user : 'nwagbarag@gmail.com',
//     pass : 'george03'
//   },
//   tls :{
// rejectUnauthorized : false
//   }
// })

// let HelperOptions = {
// from : '"SugVote" <nwagbarag@gmail.com',
// to: 'nwagbarag@gmail.com',
// subject : 'nodemailer',
// text : 'hello world',
// };

// transporter.sendMail(HelperOptions, (error, info) => {
// if(error) {
//   console.log(error);
// }
// // console.log('mesage sent : %s', info.messageId);
// // console.log ('preview URL: %s', nodemailer.getTestMessageUrl(info));
// console.log(info)
// })




 //Body Parser Middleware
 app.use(bodyParser.urlencoded({ extended: false }))
 app.use(bodyParser.json());

 //MEthod Override Middelware
 app.use(methodOverride('_method'));

 //express session middleware
 app.use(session({
   secret: 'secret',
  resave: true,
     saveUninitialized:true
   }));

   // Passport Middleware
 app.use(passport.initialize());
 app.use(passport.session());

   //flash middleware
app.use(flash());

//Global variables
app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
})
 //Enable cors
 app.use(cors());

    //use routes/polls file
    app.use('/vote', vote);
    
    //use index route
    app.use('/', index);
      
    //use admin route
app.use('/admin', admin);

//use contestants route
app.use('/contestants', contestants);

// Set static folder
 app.use(express.static(path.join(__dirname, 'public')));
 
const port = process.env.PORT || 3000;
app.listen(port, () => {
     console.log(`Server started on port ${port}`)
});




















// // Load Models
// require('./models/User');
// require('./models/Story');

// // Passport Config
// require('./config/passport')(passport);

// // Load Routes
// const index = require('./routes/index');
// const auth = require('./routes/auth');
// const stories = require('./routes/stories');

// // Load Keys
// const keys = require('./config/keys');

// // Handlebars Helpers
// const {
//   truncate,
//   stripTags,
//   formatDate,
//   select,
//   editIcon
// } = require('./helpers/hbs');

// // Map global promises
// mongoose.Promise = global.Promise;
// // Mongoose Connect
// mongoose.connect(keys.mongoURI, {
//   useNewUrlParser:true
// })
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));

// const app = express();

 //Body Parser Middleware
 //app.use(bodyParser.urlencoded({ extended: false }))
 //app.use(bodyParser.json());

// // MEthod Override Middelware
// app.use(methodOverride('_method'));

// // Handlebars Middleware
// app.engine('handlebars', exphbs({
//   helpers: {
//     truncate: truncate,
//     stripTags: stripTags,
//     formatDate:formatDate,
//     select:select,
//     editIcon: editIcon
//   },
//   defaultLayout:'main'
// }));
// app.set('view engine', 'handlebars');

// app.use(cookieParser());
// app.use(session({
//   secret: 'secret',
//   resave: false,
//   saveUninitialized: false
// }));

// // Passport Middleware
// app.use(passport.initialize());
// app.use(passport.session());

// // Set global vars
// app.use((req, res, next) => {
//   res.locals.user = req.user || null;
//   next();
// });

// // Set static folder
// app.use(express.static(path.join(__dirname, 'public')));

// // Use Routes
// app.use('/', index);
// app.use('/auth', auth);
// app.use('/stories', stories);

// const port = process.env.PORT || 5000;

// app.listen(port, () => {
//   console.log(`Server started on port ${port}`)
 