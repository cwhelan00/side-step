$(function(){

	$('#title-warning').hide();
	$('#body-warning').hide();

	$('#button-create-post').click(function(event){

		$('#title-warning').slideUp();
		$('#body-warning').slideUp();

		var flag = false;

		var title = $('#title').val();
		if(title === ""){
			$('#title-warning').slideDown();
			flag = true;
		}

		var body = $('#body').val();
		if(body === ""){
			$('#body-warning').slideDown();
			flag = true;
		}

		if(flag){
			event.preventDefault();
			return;
		}

	});
});