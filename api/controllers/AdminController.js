/**
 * AdminController
 *
 */

module.exports = {
    /* Views manager */
    admin_panel: function(req, res) {
		res.view('admin/dashboard');
	},
	users_manager: function(req, res) {
		User.find().exec(function (err, users) {
			if(err) {
				return res.serverError(err);
			}

			res.view('admin/users_management', {
				userList: users,
				layout: 'layouts/admin_layout'
			});
		});		
	},
	groups_manager: function(req, res) {
		acl_roles.find().exec(function (err, roles) {
			if(err) {
				return res.serverError(err);
			}

			res.view('admin/groups_management', {
				roleList: roles,
				layout: 'layouts/admin_layout'
			});
		});		
	}


    /* Actions manager */
    
};