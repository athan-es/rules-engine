/**
 * HomeController
 *
 */

module.exports = {
	homepage:  function(req, res, next) {
		if (req.isAuthenticated()) {
			if(req.user.role == "admin") {
				Timesheet.find({ts_status: {"!": ""}}).exec( function(err, timesheets) {
					if(err) return 'error';
					if(!timesheets) return 'nothing';
					
					res.view('home/admin_dashboard', {
						curUser: req.user,
						submittedTimesheets: timesheets
					});
				});					
			}	
			else {		
				User.findOne(req.user.id).populateAll().exec( function(err, user) {
					if(err) return next(err);
					if(!user) return next();

					res.view('home/dashboard', {
						curUser: user
					});
				});
			}
	    }
	    else{
	        res.redirect('/login');
	    }	
	}
};
