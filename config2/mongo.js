const mongoose = require('mongoose');
if (process.env.NODE_ENV ==='production'){
  module.exports = {mongoURI : 'mongodb://pascal:pascal03@ds139934.mlab.com:39934/voteapp'}
}
else{
  module.exports = {mongoURI :'mongodb://localhost/votepool-dev'}
}

// mongoose.connect('mongodb://localhost/votepool-dev',{
//   useNewUrlParser:true
// })
// .then(()=>console.log('mongodb connected'))
// .catch(err => console.log(err));


// mongoose.connect('mongodb://pascal:pascal03@ds139934.mlab.com:39934/voteapp',{
//   useNewUrlParser:true
// })
// .then(()=>console.log('mongodb connected'))
// .catch(err => console.log(err));





