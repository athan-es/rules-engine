jQuery(document).ready(function($) { 
    $( "#actManageRules" ).click(function() {
		$(".clBox_top").load('raw?view=timesheet/add_row_form');
	});
});