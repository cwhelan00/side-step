$(function(){
	$('#account-settings-body').hide();
	$('#goals-body').hide();

	//forms should be hidden at page load
	$('#edit-username').hide();
	$('#edit-password').hide();
	$('#edit-name').hide();
	$('#edit-email').hide();
	$('#edit-calories').hide();
	$('#edit-sleep').hide();
	$('#edit-water').hide();
	$('#edit-weight').hide();

	//warning should be hidden at page load
	$('#username-warning-update').hide();
	$('#password-warning-update').hide();
	$('#confirm-warning-update').hide();
	$('#first-warning-update').hide();
	$('#last-warning-update').hide();
	$('#email-warning-update').hide();
	$('#calories-warning-update').hide();
	$('#water-warning-update').hide();
	$('#sleep-warning-update').hide();
	$('#weight-warning-update').hide();

	var account_settings_down = false;
	var goals_down = false;

	$('#account-settings-heading').click(function(){
		if(!account_settings_down){
			$('#account-settings-body').slideDown();
			$('#account-settings-arrow').attr('class', 'glyphicon glyphicon-chevron-down pull-right');
			account_settings_down = true;
		}else{
			$('#edit-username').hide();
			$('#edit-password').hide();
			$('#edit-name').hide();
			$('#edit-email').hide();
			$('#first-warning-update').hide();
			$('#last-warning-update').hide();
			$('#username-warning-update').hide();
			$('#password-warning-update').hide();
			$('#confirm-warning-update').hide();
			$('#email-warning-update').hide();
			$('#account-settings-body').slideUp();
			$('#account-settings-arrow').attr('class', 'glyphicon glyphicon-chevron-right pull-right');
			account_settings_down = false;
		}
	});

	//form warnings and submitions
	$('#button-update-username').click(function(){
		var username = $('#username-new').val();
		if(username === ""){
			$('#username-warning-update').slideDown();
		}else{
			$('#form-update-username').submit();
		}
	});

	$('#button-update-password').click(function(){
		var password = $('#password-new').val();
		var confirm = $('#confirm-new').val();
		if(password === ""){
			$('#password-warning-update').slideDown();
		}else if(password !== confirm){
			$('#password-warning-update').slideUp();
			$('#confirm-warning-update').slideDown();
		}else{
			$('#form-update-password').submit();
		}
	});

	$('#button-update-name').click(function(){
		var first = $('#first-new').val();
		var last = $('#last-new').val();

		var flag = false;

		if(first === ""){
			$('#first-warning-update').slideDown();
			flag = true;
		}else{
			$('#first-warning-update').slideUp();
		}
		if(last === ""){
			$('#last-warning-update').slideDown();
			flag = true;
		}else{
			$('#last-warning-update').slideUp();
		}
		if(!flag){
			$('#form-update-name').submit();
		}
	});

	$('#button-update-email').click(function(){
		var email = $('#email-new').val();
		if(email === ""){
			$('#email-warning-update').slideDown();
		}else{
			$('#form-update-email').submit();
		}
	});

	$('#button-update-calories').click(function(){
		var calories = $('#calories-new').val();
		if(calories === ""){
			$('#calories-warning-update').slideDown();
		}else{
			$('#form-update-calories').submit();
		}
	});

	$('#button-update-water').click(function(){
		var water = $('#water-new').val();
		if(water === ""){
			$('#water-warning-update').slideDown();
		}else{
			$('#form-update-water').submit();
		}
	});

	$('#button-update-sleep').click(function(){
		var sleep = $('#sleep-new').val();
		if(sleep === ""){
			$('#sleep-warning-update').slideDown();
		}else{
			$('#form-update-sleep').submit();
		}
	});

	$('#button-update-weight').click(function(){
		var weight = $('#weight-new').val();
		if(weight === ""){
			$('#weight-warning-update').slideDown();
		}else{
			$('#form-update-weight').submit();
		}
	});


	//edit toggling
	$('#open-edit-username').click(function(){
		$('#username-warning-update').hide();
		$('#edit-username').slideToggle();
	});

	$('#open-edit-password').click(function(){
		$('#password-warning-update').hide();
		$('#confirm-warning-update').hide();
		$('#edit-password').slideToggle();
	});

	$('#open-edit-name').click(function(){
		$('#first-warning-update').hide();
		$('#last-warning-update').hide();
		$('#edit-name').slideToggle();
	});

	$('#open-edit-email').click(function(){
		$('#email-warning-update').hide();	
		$('#edit-email').slideToggle();
	});

	$('#goals-heading').click(function(){
		if(!goals_down){
			$('#goals-body').slideDown();
			$('#goals-arrow').attr('class', 'glyphicon glyphicon-chevron-down pull-right');
			goals_down = true;
		}else{
			$('#edit-calories').hide();
			$('#edit-water').hide();
			$('#edit-sleep').hide();
			$('#edit-weight').hide();
			$('#calories-warning-update').hide();
			$('#water-warning-update').hide();
			$('#sleep-warning-update').hide();
			$('#weight-warning-update').hide();
			$('#goals-body').slideUp();
			$('#goals-arrow').attr('class', 'glyphicon glyphicon-chevron-right pull-right');
			goals_down = false;
		}
	});

	//goals edit toggle
	$('#open-edit-calories').click(function(){
		$('#calories-warning-update').hide();
		$('#edit-calories').slideToggle();
	});

	$('#open-edit-sleep').click(function(){
		$('#password-warning-update').hide();
		$('#edit-sleep').slideToggle();
	});

	$('#open-edit-water').click(function(){
		$('#water-warning-update').hide();
		$('#edit-water').slideToggle();
	});

	$('#open-edit-weight').click(function(){
		$('#weight-warning-update').hide();	
		$('#edit-weight').slideToggle();
	});

});