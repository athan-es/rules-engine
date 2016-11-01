/**
 * Timesheet.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	title: {
  		type: 'string',
  		required: true
  	},
  	description: {
  		type: 'string'
  	},
  	type: {
  		type: 'string'
  	},
  	hours: {
  		type: 'integer',
  		required: true,
  		defaultsTo: 0
  	},
  	amount: {
  		type: 'float',
  		required: true,
  		defaultsTo: 0.0
  	},
    ts_status: {
      type: 'string',
      enum: ['submitted', 'pending', 'approved', 'flagged', 'denied'],
      defaultsTo: ''
    },
    ts_comment: {
      type: 'string',
      defaultsTo: ''
    },
    user: {
      model: 'user',
      required: true
    }
  }
};

