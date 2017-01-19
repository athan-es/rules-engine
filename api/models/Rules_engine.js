module.exports = {

  attributes: {
  	rule_title: {
  		type: 'string',
  		required: true
  	},
  	rule_description: {
  		type: 'string'
  	},
    data_column: {
  		type: 'string'
  	},
    rule_match_type: {
  		type: 'string'
  	},
    rule_category: {
  		type: 'string'
  	},
    rule_condition: {
  		type: 'string',
        enum: ['containAny', 'containAll', 'wordsCount', 'numEqual', 'numGreater', 'numLesser', 'numNotEqual', 'inRange'],
        defaultsTo: ''
  	},
    rule_value: {
  		type: 'string'
  	},
    rule_threshold: {
  		type: 'integer',
        defaultsTo: 0
  	},
    rule_weight_score: {
  		type: 'float',
        defaultsTo: 0.0
  	}
  }

};