/**
 * Customer.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	name: {
  		type: 'string',
  		required: true
  	},
  	email: {
  		type: 'string',
  		email: true
  	},
  	state: {
  		type: 'string'
  	},
    //customer can own many stocks -> 1-to-many relationship
    stocks: {
      collection: 'stock',  //tells us what model to use
      via: 'owner'          //tells us what attribute of stock will connect us back to "customer"
    }
  }
};

