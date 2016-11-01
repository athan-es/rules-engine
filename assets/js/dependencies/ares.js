jQuery(document).ready(function($) { 

	$(document).on('click', "#addTsRow", function(){
		var viewUrl = 'raw?view=timesheet/add_row_form';
		$("#modalBox .formMsgCont").empty();

		$('#modalBox .modal-body').load(viewUrl, "", function() {
            $("#modalBox .modal-header h3").text("Add a new timesheet entry");
            $("#modalBox #mdhandler").text("addNewTimesheetRow");
            $("#modalBox .modal-footer").removeClass("success");
            $("#modalBox #submitModal").show();
            $("#modalBox").modal();
        })
	});

	$(document).on('click', "#submitTimesheet, #approveTimesheet", function(){
		var tsRowIds = '';
		$(".tsRow").each(function( index ) {
			tsRowIds = tsRowIds.concat($(this).data('tsid')) + ','; 
		});
		if(tsRowIds == '') {
			alert('You do not have any time entries to submit');
		}
		tsRowIds = tsRowIds.replace(/,$/,"");

		if($(this).attr("id") == "submitTimesheet") {
			submitTsUrl = 'http://localhost:1337/timesheet/submitTimesheet?rowid='+tsRowIds;
		}
		else {
			submitTsUrl = 'http://localhost:1337/admin/approveTimesheet?rowid='+tsRowIds;
		}

		$.ajax({
			type: "PUT",
			url: submitTsUrl,
			context: $(this),
            complete : function (response, statusText, xhr, $form) {
                if(response.responseText == 'success'){
					if($(this).attr("id") == "submitTimesheet") {
						outMessage = 'Timesheet has been submitted to the Administrator';
					}
					else {
						outMessage = 'Timesheet has been approved';
					}

                	var notification = document.querySelector('.mdl-js-snackbar');
					notification.MaterialSnackbar.showSnackbar({
						message: outMessage
					});
                    return true;
                }
                else {
                    var notification = document.querySelector('.mdl-js-snackbar');
					notification.MaterialSnackbar.showSnackbar({
						message: 'Error: could not complete your request. Please try again'
					});
                    return false;
                }
            }
		});
	});

	$("main").on('click', ".tsRow", function(){
		$(this).find(".tsRowActions").toggle();	
	});

	$("main").on('click', ".tsRowActions button, #returnTimesheet", function(event){
		event.stopPropagation();

		var buttonAction = $(this).data("btnact");
		var tsRowId = $(this).closest("tr.tsRow").data("tsid");
		var actionUrl = "";
		if(buttonAction == "tsEdit" || buttonAction == "tsFlag" || $(this).attr("id") == "returnTimesheet") {
			if(buttonAction == "tsEdit") {
				actionUrl = "http://localhost:1337/timesheet/edit_row_form?rowid="+tsRowId;
				modalTitle = "Edit a timesheet entry";
				modalAction = "editTimesheetRow";
			}
			else if(buttonAction == "tsFlag") {
				actionUrl = "http://localhost:1337/admin/get_flag_form?tsid="+tsRowId;
				modalTitle = "Add comments for the flag";
				modalAction = "flagTimesheetRow";
			}
			else if($(this).attr("id") == "returnTimesheet") {
				actionUrl = "http://localhost:1337/admin/get_return_form";
				modalTitle = "Add comments with returned timesheet";
				modalAction = "returnTimesheetRow";
			}

			$("#modalBox .formMsgCont").empty();
			$('#modalBox .modal-body').load(actionUrl, "", function() {
				$("#modalBox .modal-header h3").text(modalTitle);
				$("#modalBox #mdhandler").text(modalAction);
				$("#modalBox .modal-footer").removeClass("success");
				$("#modalBox #submitModal").show();
				$("#modalBox").modal();
			})
		}
		else {
			if(buttonAction == "tsDelete") {
				actionUrl = "http://localhost:1337/timesheet/deleteRow?rowid="+tsRowId;
			}
			else if(buttonAction == "tsApprove") {
				actionUrl = "http://localhost:1337/admin/approveRow?rowid="+tsRowId;
			}		
		
			$.ajax({
				type: "PUT",
				url: actionUrl,
				context: $(this),
				complete : function (response, statusText, xhr, $form) {
					if(response.responseText == 'success'){
						var buttonAction = $(this).data("btnact");
						var successMessage = '';
						if(buttonAction == "tsDelete") {
							successMessage = 'Timesheet row has been deleted';
							$(this).closest("tr.tsRow").remove();
						}
						else if(buttonAction == "tsApprove") {
							successMessage = 'Timesheet row has been approved';
							$(this).closest("tr.tsRow").addClass("tsStat_approved");
						}

						var notification = document.querySelector('.mdl-js-snackbar');
						notification.MaterialSnackbar.showSnackbar({
							message: successMessage
						});

						return true;
					}
					else {
						var notification = document.querySelector('.mdl-js-snackbar');
						notification.MaterialSnackbar.showSnackbar({
							message: 'Error: could not perform action'
						});
						return false;
					}
				}
			});
		}		
	});
	
	$("#modalBox").on('click', "#submitModal", function(){
		//if($("#modalBox #mdhandler").text() == 'addNewTimesheetRow' || $("#modalBox #mdhandler").text() == "editTimesheetRow") {
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
		//}
	});

	/*timesheet review*/

		
});