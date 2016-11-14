module.exports = function isAuthenticated(req, res, next) {
   	if (req.user.role == "admin") {
        return next();
    }
    else{
        req.flash('message','You do not have permission to view this page');
        res.redirect('/');
    }
};