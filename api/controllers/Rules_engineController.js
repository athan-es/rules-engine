/**
 * HomeController
 *
 */

module.exports = {
	/* Views manager */


	/* Actions manager */
	load_datatable:  function(req, res, next) {
		if(typeof require !== 'undefined') 
			XLSX = require('xlsx');

		var workbook = XLSX.readFile('./assets/documents/Testing_Data.xlsx');
		var first_sheet_name = workbook.SheetNames[0];	
		var worksheet = workbook.Sheets[first_sheet_name];	
		
		var xlsDataRows = new Array();
		var curRowNum = 0;
		for (cell in worksheet) {
			if(cell[0] === '!') continue;

			curRowNum = parseInt(cell.replace(/[A-Za-z$-]/g, ""));
			curColLetter = cell.replace(curRowNum, "");
			if(typeof xlsDataRows[curRowNum] === 'undefined') {
				xlsDataRows[curRowNum] = [];		
			}
			else {	
				xlsDataRows[curRowNum][curColLetter] = JSON.stringify(worksheet[cell].v);
			}
			
			if(curRowNum > 10) {
				break;
			}						
		}

		var reportColNamesLetter = {
			"inv_start_date": "F",
			"Matter Name": "D",
			"units": "I",
			"itemDesc": "N",
			"rate": "O",
			"tkName": "P",
			"total_amount": "S",
			"Adjustment Type": "T",
			"Adjustment Reason": "U" 
		};

		res.view('rules_engine/content_data/load_datatable', {
			xlsData: xlsDataRows,
			reportColumns: reportColNamesLetter,
			threshold:  (typeof req.query.threshold != 'undefined'? req.query.threshold : 0 ),
			rcat: (typeof req.query.rcat!= 'undefined'? req.query.rcat : '' ),
			ruleopt:(typeof req.query.ruleopt != 'undefined'?  req.query.ruleopt : '' ),
			layout:false
		});
	},

	addNewRule: function(req, res, next) {
		var ruleObj = {
			rule_title: req.param('rTitle'),					
			rule_match_type: req.param('selRuleType'),
			data_column: req.param('selRuleColumn'),
			rule_condition: req.param('rtTextCondition'),
			rule_value: req.param('rttext_value'),
			rule_category: req.param('rtRuleCategory'),
			rule_threshold: req.param('any_threshold_amount'),
			rule_weight_score: req.param('weight')
		};

		Rules_engine.create(ruleObj, function addNewRuleObj(err, ts_row) {
			if(err) {
				res.send('error');
				return next(err);
			}

			res.send('success');
		});
	},

	getCategoryRules:  function(req, res, next) {
		Rules_engine.find({rule_category: req.query.rcat}).exec( function(err, categoryRules) {
			if(err) return next(err);
			if(!categoryRules) return next();

			res.view('rules_engine/content_data/category_rules_table', {
				catRules: categoryRules,
				format: (typeof req.query.format != 'undefined'? req.query.format : 'table' ),
				layout:false
			});
		});
	},

	deleteRule: function(req, res, next) {
		Rules_engine.destroy(req.query.id).exec( function(err) {
			if(err){
				res.send('failed: '+ err);
			}

			res.send('success');
		});
	}	
};
