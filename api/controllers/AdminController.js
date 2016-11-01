/**
 * AdminController
 *
 */

module.exports = {
    /* show views */
    get_flag_form: function(req, res, next) {
		Timesheet.findOne(req.query.tsid).populateAll().exec( function(err, timesheetRow) {
			if(err) next(err);
			if(!timesheetRow) return next();

			res.view("timesheet/admin_flag_row_form", {
				tsRow: timesheetRow,
				layout:false
			});

		});
	},
    /* incomplete */
    get_return_form: function(req, res, next) {

			res.view("timesheet/admin_return_ts_form", {
				layout:false
			});
	},

    /* actions manager */
    approveRow: function(req, res, next) {
        Timesheet.update(req.query.rowid, {ts_status: "approved"}).exec( function(err) {
            if(err) {
                return res.send("failed");
            }
            else {
                return res.send("success");
            }            
        });		
	},
    flagRow: function(req, res, next) {
        Timesheet.update(req.param('tsid'), {ts_status: "flagged", ts_comment: req.param('comment')}).exec( function(err) {    
            if(err) {
                return res.send("failed");
            }
            else {
                return res.send("success");
            }            
        });		
	},
    approveTimesheet: function(req, res, next) {
		var hasError = 0;
		var rowIdArray = req.query.rowid.split(",").map(function (val) { 
			Timesheet.update({id: val}, {ts_status: "approved"}).exec( function(err, timesheet) {
				if(err){
					console.log(err);
					hasError += 1;
				}

				console.log("done" + timesheet);
			});
		});

		if(hasError > 0) {
			return res.send("failed");
		}
		else {
			return res.send("success");
		}
	}
};