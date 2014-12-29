$(function(){
	$('#response-warning').hide();
	$('#button-add-response').click(function(){
		var response = $('#response').val();
		if(response === ""){
			$('#response-warning').slideDown();
		}else{
			$('#form-response').submit();
		}
	});
	$('#button-mock-login').click(function(){
		$('#link-open-login').click();
	});
});