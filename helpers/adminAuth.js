
module.exports  = {
    ensureAuthenticated:function(req, res, next){
    if(req.user.isAdmin){
      return next();
    }
  res.redirect('/');
    }
  }

 