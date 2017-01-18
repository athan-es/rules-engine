/**
 * HomeController
 *
 */

module.exports = {
	default:  function(req, res, next) {
		if(typeof require !== 'undefined') 
			XLSX = require('xlsx');

		var workbook = XLSX.readFile('./assets/documents/Testing_Data.xlsx');
		var first_sheet_name = workbook.SheetNames[0];	
		var worksheet = workbook.Sheets[first_sheet_name];	
		
		var xlsDataRows = new Array();
		var limit = 0;
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
			
			if(limit < 45) {
				console.log(curRowNum + " => " + curColLetter +"==>"  + xlsDataRows[curRowNum][curColLetter]); 
				limit++;
			}						
		}

		var reportColNamesLetter = {"inv_start_date": "F","Matter Name": "D","units": "I","itemDesc": "N","rate": "O","tkName": "P","total_amount": "S","Adjustment Type": "T","Adjustment Reason": "U" };


		return res.view('rules-engine/default', {
			xlsData: xlsDataRows,
			reportColumns: reportColNamesLetter
		});
	}
};
