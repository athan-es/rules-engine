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

			$("#modalBox .modal-dialog").prop("id","modalType-rulesEngine");
		})
	});

	$("#modalBox").on('click', "#modalType-rulesEngine #submitModal", function(){
		if($("#modalBox #mdhandler").text() == 'addNewRule') {
			$('#modalBox form').ajaxSubmit({
	            url: 'http://localhost:1337/'+$('#modalBox form').attr("action"),
				context: $(this),
	            error: function(xhr, textStatus, errorThrown) {
	                $(".formMsgCont").html("<div class='alert alert-danger'>Error updating timesheet</div>");
	                return false;
	            },
	            complete : function (response, statusText, xhr, $form) {
	                if(response.responseText == 'success'){
						var rcat = $(this).closest("#modalBox").find("select[name='rtRuleCategory'] :selected").val(); 
                        $(".formMsgCont").html("<div class='alert alert-success'>Rule has been saved!</div>");
                        $("#modalBox .modal-body").empty();
                        $("#modalBox #submitModal").hide();
                        $("#modalBox .modal-footer").addClass("success");

						$("#manageRulesCard .clCard_body").load('rules_engine/getCategoryRules?rcat='+rcat);
                        return true;
	                }
	                else {
	                    $(".formMsgCont").html("<div class='alert alert-danger'>An error has occured while saving rule</div>");
	                    return false;
	                }
	            }
	        });
		}			
	});

	/* buttons action */
	$( "#actManageRules" ).click(function() {
		$(".clBox_top").load('raw?view=rules_engine/manage_rules');
	});

	$("button#loadDatacontent").click(function() {
		$("#mainRulesEngine .dataTableContent").load('rules_engine/load_datatable');		
	});

	$(document).on('change', "select#selRuleCat", function() {
		if(this.value != 'none') {
			$("#manageRulesCard .clCard_body").load('rules_engine/getCategoryRules?rcat='+this.value);		
		}
	});

	$(document).on('click', ".clCard_main .closeBox", function(){
		$(this).closest(".clCard_main").slideToggle();
	});

	$(document).on('click', "#manageRulesCard .removeRule", function(){
		$(this).closest(".ruleRow").addClass("selected");
		var r = confirm("Are you sure you want to delete this rule?");
		if (r == true) {
			var ruleId = $(this).closest(".ruleRow").attr("id").split("_");			
			$.ajax({
				type: "POST",
				context: $(this),
				url: 'rules_engine/deleteRule?id='+ruleId[1],
				complete : function (response, statusText, xhr) {
					if(response.responseText == 'success'){
						context: $(this).closest(".ruleRow").remove();		
					}
					else {
						alert("Cannot delete selected rule");
					}
				}
			});
		} else {
			$(this).closest(".ruleRow").removeClass("selected");
			return false;
		}		
	});


	/*forms*/
	$(document).on('change', "#selRuleType", function() {
		var subFormUrl = "";
		$(this).closest("form").find(".optionForms").empty();
		$(this).closest("form").find(".fieldEval").hide();

		if(this.value == 'sentence' || this.value == 'keywords') {
			subFormUrl = "raw?view=rules_engine/rules_text_form";
		}
		else if(this.value == 'numerical') {
			subFormUrl = "raw?view=rules_engine/rules_numeric_form";
		}
		else {
			alert("Please select a supported rule type"); 
			return false;
		}
		$(this).closest("form").find(".fieldEval").show();
		$(this).closest("form").find(".optionForms").load(subFormUrl);	
	});

	$(document).on('change', "#rtypeText select", function() {
		if(this.value == "containAny") {
			$(this).closest("form").find(".rtAnyThreshold").show();
		}
		else {
			$(this).closest("form").find(".rtAnyThreshold").hide();
		}	
	});	
});