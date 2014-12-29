$(function(){

	var breakfast_down = false;
	var lunch_down = false;
	var dinner_down = false;
	var snack_down = false;

	$('#breakfast-body').hide();
	$('#lunch-body').hide();
	$('#dinner-body').hide();
	$('#snack-body').hide();

	$('#breakfast-heading').click(function(){
		if(breakfast_down){
			$('#breakfast-body').slideUp();
			$('#breakfast-arrow').attr('class', 'glyphicon glyphicon-chevron-right pull-right');
			breakfast_down = false;
		}else{
			$('#breakfast-body').slideDown();
			$('#breakfast-arrow').attr('class', 'glyphicon glyphicon-chevron-down pull-right');
			breakfast_down = true;
		}
	});

	$('#lunch-heading').click(function(){
		if(lunch_down){
			$('#lunch-body').slideUp();
			$('#lunch-arrow').attr('class', 'glyphicon glyphicon-chevron-right pull-right');
			lunch_down = false;
		}else{
			$('#lunch-body').slideDown();
			$('#lunch-arrow').attr('class', 'glyphicon glyphicon-chevron-down pull-right');
			lunch_down = true;
		}
	});

	$('#dinner-heading').click(function(){
		if(dinner_down){
			$('#dinner-body').slideUp();
			$('#dinner-arrow').attr('class', 'glyphicon glyphicon-chevron-right pull-right');
			dinner_down = false;
		}else{
			$('#dinner-body').slideDown();
			$('#dinner-arrow').attr('class', 'glyphicon glyphicon-chevron-down pull-right');
			dinner_down = true;
		}
	});

	$('#snack-heading').click(function(){
		if(snack_down){
			$('#snack-body').slideUp();
			$('#snack-arrow').attr('class', 'glyphicon glyphicon-chevron-right pull-right');
			snack_down = false;
		}else{
			$('#snack-body').slideDown();
			$('#snack-arrow').attr('class', 'glyphicon glyphicon-chevron-down pull-right');
			snack_down = true;
		}
	});

});