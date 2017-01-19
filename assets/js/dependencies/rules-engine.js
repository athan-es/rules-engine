jQuery(document).ready(function($) { 	

	/* modal actions */
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
			$("#modalBox").addClass("modalType-rulesEngine");
		})
	});

	$("#modalBox.modalType-rulesEngine").on('click', "#submitModal", function(){
		if($("#modalBox #mdhandler").text() == 'addNewRule') {
			$('#modalBox form').ajaxSubmit({
	            url: 'http://localhost:1337/'+$('#modalBox form').attr("action"),
	            error: function(xhr, textStatus, errorThrown) {
	                $(".formMsgCont").html("<div class='alert alert-danger'>Error updating timesheet</div>");
	                return false;
	            },
	            complete : function (response, statusText, xhr, $form) {
	                if(response.responseText == 'success'){
                        $(".formMsgCont").html("<div class='alert alert-success'>Timesheet has been saved</div>");
                        $("#modalBox .modal-body").empty();
                        $("#modalBox #submitModal").hide();
                        $("#modalBox .modal-footer").addClass("success");
                        return true;
	                }
	                else {
	                    $(".formMsgCont").html("<div class='alert alert-danger'>Error updating timesheet</div>");
	                    return false;
	                }
	            }
	        });
		}			
	});

	/* buttons action */
	$( "#actManageRules" ).click(function() {
		$(".clBox_top").load('raw?view=rules-engine/manage_rules');
	});

	$("button#loadDatacontent").click(function() {
		$(".dataTableContent").load('rules-engine/load_datatable');		
	});

	/*forms*/
	$(document).on('change', "#selRuleType", function() {

		var subFormUrl = "";
		$(this).closest("form").find(".optionForms").empty();
		$(this).closest("form").find(".fieldEval").hide();

		if(this.value == 'sentence' || this.value == 'keywords') {
			subFormUrl = "raw?view=rules-engine/rules_text_form";
		}
		else if(this.value == 'numerical') {
			subFormUrl = "raw?view=rules-engine/rules_numeric_form";
		}
		else {
			alert("Please select a supported rule type"); 
			return false;
		}
		$(this).closest("form").find(".fieldEval").show();
		$(this).closest("form").find(".optionForms").load(subFormUrl);	
	})	
});