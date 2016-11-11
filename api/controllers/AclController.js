var acl = require('acl');

acl = new acl(new acl.memoryBackend());

module.exports = {
    //Create role implicitly by giving them permissions
    assignActionsToRole: function(req, res, next) {
        var roleName = req.query.roleName;
        var resourceType = req.query.resourceType;       
        var permActions = req.query.actions;

        console.log(req.query);

        acl.allow('manager', 'customer', 'view');     

        console.log(acl);
        res.send("done?")
	},
    test: function(req, res, next) {
        res.send("this is a test");
    }
};