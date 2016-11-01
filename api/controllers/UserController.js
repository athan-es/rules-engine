/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	get_loggedIn_user : function(req,res){
        console.log(req.user);
        res.json(req.user);
    }
};

