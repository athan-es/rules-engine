/*
*   AclController:
        + assignActionsToRole  -> acl.allow(user, model, controller_actions)  //set permissions
        + addUserToRole
        + addParentsToRole
        + isAllowed  --> probably should go in /policies/isAllowed.js     
*/

//Using the memory backend 
var node_acl = require('acl');

/*MongoClient.connect(dbInstance, function(error, db) {
   //check for errors...
   if(error) {
       console.log("Error connecting to the Mongo database");
   }

   var mongoBackend = new node_acl.mongodbBackend(db, 'acl_');
   var acl = new node_acl( mongoBackend );
})*/

module.exports = {
    //Create role implicitly by giving them permissions
    assignActionsToRole: function(req, res, next) {
        var roleName = req.query.roleName;
        var resourceType = req.query.resourceType;       
        var permActions = req.query.actions;

        var dbConnection = require('../libraries/dbConnection.js');
        dbConnection(function(db){
            var mongoBackend = new node_acl.mongodbBackend(db, 'acl_');
            var acl = new node_acl( mongoBackend );

            acl.allow([
                {
                    roles:['guest','member'],
                    allows:[
                        {resources:'blogs', permissions:'get'},
                        {resources:['forums','news'], permissions:['get','put','delete']}
                    ]
                },
                {
                    roles:['gold','silver'],
                    allows:[
                        {resources:'cash', permissions:['sell','exchange']},
                        {resources:['account','deposit'], permissions:['put','delete']}
                    ]
                }
            ])

            acl.allow('gold', ['blogs','cash','deposit'], ['delete','exchange']);
            acl.allow('admin', ['blogs','forums'], '*');

            console.log("ACL ===> " + acl);
            res.send("done?")
        });        
	},
    addUserToRole: function(req, res, next) {
        var roleName = req.query.roleName || '';
        var userId = req.query.uid || 0;       

        /*if(userId == 0 || roleName == '') {
            res.send(500, "failed");
        }

        acl.addUserRoles(userId, roleName);*/

        var dbConnection = require('../libraries/dbConnection.js');
        dbConnection(function(db){
            var mongoBackend = new node_acl.mongodbBackend(db, 'acl_');
            var acl = new node_acl( mongoBackend );
            acl.addUserRoles(1, 'guest');
            acl.addUserRoles(3, 'guest');
            acl.addUserRoles(5, 'guest');
            acl.addUserRoles(7, 'guest');

            acl.addUserRoles(10, 'silver');
            acl.addUserRoles(20, 'silver');
            acl.addUserRoles(30, 'silver');

            acl.addUserRoles(100, 'gold');           
            acl.addUserRoles(200, 'gold');
            acl.addUserRoles(300, 'gold');
            acl.addUserRoles(300, 'silver');

            acl.addUserRoles('5826c57bb955baa81d7532c1', 'silver');
            acl.addUserRoles('5826c57bb955baa81d7532c1', 'guest');
            acl.addUserRoles('5826c57bb955baa81d7532c1', 'gold');
            acl.addUserRoles('5826c57bb955baa81d7532c1', 'admin');

            res.send(200, "success");
        });  
    },
    addParentsToRole:  function(req, res, next) {
        var dbConnection = require('../libraries/dbConnection.js');
        dbConnection(function(db){
            var mongoBackend = new node_acl.mongodbBackend(db, 'acl_');
            var acl = new node_acl( mongoBackend );

            acl.addRoleParents('medals', ['silver','gold']);
            acl.addRoleParents('user type', ['guest','member']);
            acl.addRoleParents('error', ['type1','type2']);
            res.send(200, "success");
        });  
    },
    isUserAllowed:  function(req, res, next) {
       acl.isAllowed('joed', 'blogs', 'view', function(err, res){
            if(res){
                console.log("User joed is allowed to view blogs")
            }
       });
       acl.isAllowed('admin', 'blogs', 'view', function(err, res){
            if(res){
                console.log("User admin is allowed to view blogs")
            }
       });
       acl.isAllowed('100', 'cash', 'exchange', function(err, res){
            if(res){
                console.log("User 100 is allowed to exchange cash")
            }
       });
        res.send(200);
    },
    userAllowedActions:  function(req, res, next) {
        //Use this action to return all actions that the user has access to for the resources and models or folders and files 
        acl.allowedPermissions('admin', ['blogs','forums'], function(err, permissions){
            console.log(permissions)
        })    
    },
    test: function(req, res, next) {
        res.send(200, "this is a test");
    }
};