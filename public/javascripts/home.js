$(function(){

	$('.frame').hide();
	$('.overlay').hide();

	$('#nav-home').attr('class', 'active')

	$('#button-open-register').click(function(){
  		$('.overlay').fadeIn();
  		$('#frame-register').fadeIn();
  		
  		$('#username-warning').hide();
		$('#first-warning').hide();
		$('#last-warning').hide();
		$('#password-warning').hide();
		$('#confirm-warning').hide();
		$('#email-warning').hide();
	});

	$('.overlay').click(function(){
		$('.overlay').fadeOut();
		$('.frame').fadeOut();
	});

	$('#button-register').click(function(event){

		var username = $('#username').val();
		var first = $('#first').val();
		var last = $('#last').val();
		var password = $('#password').val();
		var confirm = $('#confirm').val();
		var email = $('#email').val();
		var flag = false;

		if(username === ""){
			$('#username-warning').slideDown();
			flag = true;
		}else{
			$('#username-warning').slideUp();
		}

		if(first === ""){
			$('#first-warning').slideDown();
			flag = true;
		}else{
			$('#first-warning').slideUp();
		}

		if(last === ""){
			$('#last-warning').slideDown();
			flag = true;
		}else{
			$('#last-warning').slideUp();
		}

		if(password === ""){
			$('#password-warning').slideDown();
			flag = true;
		}else{
			$('#password-warning').slideUp();
		}

		if(password !== confirm){
			$('#confirm-warning').slideDown();
			flag = true;
		}else{
			$('#confirm-warning').slideUp();
		}

		if(email === ""){
			$('#email-warning').slideDown();
			flag = true;
		}else{
			$('#email-warning').slideUp();
		}

		if(flag){
			event.preventDefault();
		}

	});

});