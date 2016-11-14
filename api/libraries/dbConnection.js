/*
Create separate module to maintain a database object connection to be re-used 
Source: http://stackoverflow.com/questions/18005379/use-global-variable-to-share-db-between-module
*/


var MongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://"+sails.config.connections.MyMongoDB.host + ":" +
      sails.config.connections.MyMongoDB.port + "/" + sails.config.connections.MyMongoDB.database;
var db = null;

module.exports = function(cb){
  if(db){
    cb(db);
    return;
  }

  MongoClient.connect(dbUrl, function(err, conn) {
    if(err){
      console.log(err.message);
      throw new Error(err);
    } else {
      db = conn; 
      cb(db);
      return;
    }
  });
};