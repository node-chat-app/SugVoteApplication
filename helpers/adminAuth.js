module.exports = {
  ensureAuthenticated:function(req, res, next){
  if (req.isAuthenticated() && req.user.isAdmin){
    return next();
}
res.redirect('/');
  }
}
