$(function(){

	var div = '<div class="row">'+
		'<div class="col-xs-4">'+
		'<p>Food:</p>'+
		'<p>Amount:</p>'+
		'</div>'+
		'<div class="col-xs-4">'+
		'<div><input name="foods[]" type="text"/></div>'+
		'<div class="small-margin-top"><input name="amounts[]" type="number"/></div>'+
		'</div>'+
		'<div class="col-xs-4">'+
		'<span class="glyphicon glyphicon-remove green remove"></span>'+
		'</div>'+
		'</div>'+
		'<hr/>';

	var button_breakfast = '<button id="button-food-breakfast" class="btn btn-success small-margin-bottom">Save</button>';
	var button_lunch = '<button id="button-food-lunch" class="btn btn-success small-margin-bottom">Save</button>';
	var button_dinner = '<button id="button-food-dinner" class="btn btn-success small-margin-bottom">Save</button>';
	var button_snack = '<button id="button-food-snack" class="btn btn-success small-margin-bottom">Save</button>';

	if($.trim($('#form-food-breakfast').html()).length){
		$('#form-food-breakfast').append(button_breakfast);
	}

	if($.trim($('#form-food-lunch').html()).length){
		$('#form-food-lunch').append(button_lunch);
	}

	if($.trim($('#form-food-dinner').html()).length){
		$('#form-food-dinner').append(button_dinner);
	}

	if($.trim($('#form-food-snack').html()).length){
		$('#form-food-snack').append(button_snack);
	}

	$('#add-food-breakfast').click(function(){
		$('#button-food-breakfast').remove();
		$('#form-food-breakfast').append(div);
		$('#form-food-breakfast').append(button_breakfast);
	});

	$('#add-food-lunch').click(function(){
		$('#button-food-lunch').remove();
		$('#form-food-lunch').append(div);
		$('#form-food-lunch').append(button_lunch);
	});

	$('#add-food-dinner').click(function(){
		$('#button-food-dinner').remove();
		$('#form-food-dinner').append(div);
		$('#form-food-dinner').append(button_dinner);
	});

	$('#add-food-snack').click(function(){
		$('#button-food-snack').remove();
		$('#form-food-snack').append(div);
		$('#form-food-snack').append(button_snack);
	});

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

	$('.remove').click(function(){
		var grand_parent = $(this).parent().parent();
		grand_parent.next().remove();
		grand_parent.remove();
	});

});