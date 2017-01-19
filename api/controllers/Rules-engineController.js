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

		return res.view('rules-engine/load_datatable', {
			xlsData: xlsDataRows,
			reportColumns: reportColNamesLetter,
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
			rule_weight_score: req.param('weight')
		};

		Rules-engine.create(ruleObj, function addNewRuleObj(err, ts_row) {
			if(err) return next(err);

			res.send('success');
		});
	}
};
