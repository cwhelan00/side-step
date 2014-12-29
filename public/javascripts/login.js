$(function(){
	$('.frame').hide();
	$('.overlay').hide();

	$('#link-open-login').click(function(event){
		event.preventDefault();

		$('.overlay').fadeIn();
  		$('#frame-login').fadeIn();

  		$('#username-warning-login').hide();
  		$('#password-warning-login').hide();
  		$('#login-warning').hide();
	});

	$('.overlay').click(function(){
		$('.overlay').fadeOut();
		$('.frame').fadeOut();
	});

	$('#button-login').click(function(){

		var username = $('#username-login').val();
		var password = $('#password-login').val();

		var flag = false;

		if(username === ""){
			$('#username-warning-login').slideDown();
			flag = true;
		}else{
			$('#username-warning-login').slideUp();
		}

		if(password === ""){
			$('#password-warning-login').slideDown();
			flag = true;
		}else{
			$('#password-warning-login').slideUp();
		}

		if(flag){
			return;
		}

		var query = {
			"username": username,
			"password": password
		};

		$.get($('#form-login').attr('action'), query, function(data){
			if(!data){
				$('#login-warning').slideDown();
			}else{
				$('#form-login').submit();
			}
		});
	});
});