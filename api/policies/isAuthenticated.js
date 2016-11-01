/*
  From tutorial for passport-SailsJS:
  http://iliketomatoes.com/implement-passport-js-authentication-with-sails-js-0-10-2/
*/

module.exports = function isAuthenticated(req, res, next) {
   	if (req.isAuthenticated()) {
        return next();
    }
    else{
        return res.redirect('/login');
    }
};