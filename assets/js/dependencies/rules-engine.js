jQuery(document).ready(function($) { 
	$( "#actManageRules" ).click(function() {
		$(".clBox_top").load('raw?view=rules-engine/manage_rules');
	});

	$(document).on('click', ".openModal", function(){
		var mUrl = $(this).data("murl"); 
		var mTitle = $(this).data("mtitle");
		var mHandler = $(this).data("mhandler"); 
		$("#modalBox .formMsgCont").empty();

		$('#modalBox .modal-body').load(mUrl, "", function() {
				$("#modalBox .modal-header h3").text(mTitle);
				$("#modalBox #mdhandler").text(mHandler);
				$("#modalBox .modal-footer").removeClass("success");
				$("#modalBox #submitModal").show();
				$("#modalBox").modal();
			})
	});

	$("#actAddRules").click(function() {
		$(".clBox_top").load('raw?view=rules-engine/manage_rules');		
	});
});