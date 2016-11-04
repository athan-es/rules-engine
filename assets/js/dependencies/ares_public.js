jQuery(document).ready(function($) { 
  $( "#loginFormBtn, #signupSubmitFormBtn" ).click(function() {
		$(".loginBox form").submit();
	});
});