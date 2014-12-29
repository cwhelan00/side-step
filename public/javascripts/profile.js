$(function(){

	$('#range-input').hide();

	var days;

	var data = {
		calories: {},
		water: {},
		sleep: {},
		weight: {}
	};

	var units = {
		calories: 'calories',
		water: 'ounces',
		sleep: 'hours',
		weight: 'pounds'
	};

	var goals;

	var current;
	var interval;

	var intervals = {
		week: {
			start: function(date){
				var s = new Date(date);
				s.setDate(date.getDate() - (date.getDay() + 1));
				return s;
			},
			end: function(date){
				var e = new Date(date);
				e.setDate(date.getDate() + (6 - date.getDay()));
				return e;
			}
		},
		month: {
			start: function(date){
				var s = new Date(date);
				s.setDate(1);
				return s;
			},
			end: function(date){
				var e = new Date(date);
				e.setMonth(date.getMonth() + 1);
				e.setDate(0);
				return e;
			}
		},
		year: {
			start: function(date){
				var s = new Date(date);
				s.setMonth(0);
				s.setDate(1);
				return s;
			},
			end: function(date){
				var e = new Date(date);
				e.setMonth(11);
				e.setDate(31);
				return e;
			}
		},
		range: {
			start: function(){
				var s = new Date($('#start-date').val());
				s.setHours(24);
				return s;
			},
			end: function(){
				var e = new Date($('#end-date').val());
				e.setHours(24);
				return e;
			}
		}
	}

	function zeroDate(date){
		date.setHours(0);
  		date.setMinutes(0);
  		date.setSeconds(0);
	}

	function main(){
		$.get("http://127.0.0.1:3000/account/get/goals", function(g){
			goals = g;
		});

		$.get("http://127.0.0.1:3000/account/get/days", function(d){
			days = d;
			setData();
			current = 'calories';
			interval = 'week';
			drawChart();
		});
	}

	function setData(){
		for(var i = 0; i < days.length; i++){

			data.calories[days[i].date] = days[i].calories;
			data.water[days[i].date] = days[i].water;
			data.sleep[days[i].date] = days[i].sleep;
			data.weight[days[i].date] = days[i].weight;
		}
	}

	function drawChart(){

		var today = new Date();
  		zeroDate(today);

  		var start = intervals[interval].start(today);
  		var end = intervals[interval].end(today);

  		zeroDate(start);
  		zeroDate(end);


  		var chart;

        if(start.getTime() === end.getTime()){
  			chart = new google.visualization.ColumnChart(document.getElementById('chart'));
  			start.setHours(-12);
  			end.setHours(12);
  		}else{
  			chart = new google.visualization.LineChart(document.getElementById('chart'));
  		}

		var table = new google.visualization.DataTable();

  		table.addColumn('date', 'Date');
  		table.addColumn('number', current);
  		if(goals[current]){
  			table.addColumn('number', 'Goal');
  		}

  		var rows = [];

  		var count = 0;
  		var total = 0;
  		var min = Number.MAX_VALUE;
  		var max = -1;

  		for(var key in data[current]){

  			var value = Number(data[current][key]);
  			var date = new Date(key);

  			if((date.getTime() >= start.getTime()) && (date.getTime() <= end.getTime())){
  				if(value < min){
  					min = value;
  				}
  				if(value > max){
  					max = value;
  				}
  				count++;
  				total += value;
  			}

  			zeroDate(date);

  			var arr;

  			if(goals[current]){
  				arr = [date, value, goals[current]];
  			}else{
  				arr = [date, value];
  			}

  			rows.push(arr);
  		}

  		table.addRows(rows);

        var options = {
          title: current,
          colors: ['green', 'black'],
          hAxis: {
          	title: 'Date',  
          	titleTextStyle: {color: '#009933'},
          	viewWindow: {
          		min: start,
          		max: end
          	}
          },
          vAxis: {
          	title: units[current],
          	titleTextStyle: {color: '#009933'},
          	minValue: 0
          }
        };
        
        chart.draw(table, options);

        if(max >= 0){
        	$('#data-max').html(max);
        }else{
        	$('#data-max').html('None');
        }

        if(min < Number.MAX_VALUE){
        	$('#data-min').html(min);
        }else{
        	$('#data-min').html('None');
        }

        if(count > 0){
        	$('#data-average').html(total/count);
        }else{
        	$('#data-average').html('None');
        }

        if(goals[current]){
        	$('#data-goal').html(goals[current]);
        }else{
        	$('#data-goal').html('None');
        }
	}

	main();

	$(window).resize(function(){
		drawChart();
	});

	$('#select-data').change(function(){
		current = $('#select-data').val();
		drawChart();
	});

	$('#select-interval').change(function(){
		interval = $('#select-interval').val();
		if(interval !== 'range'){
			$('#range-input').slideUp();
			drawChart();
		}else{
			$('#range-input').slideDown();
		}
	});

	$('#button-view-range').click(function(){
		var start = $('#start-date').val();
		var end = $('#end-date').val();
		if(!start || !end){
			alert('undefined');
			return;
		}
		var start_date = new Date(start).getTime();
		var end_date = new Date(end).getTime();
		if(start_date > end_date){
			alert('invalid');
		}else{
			drawChart();
		}
	});

});