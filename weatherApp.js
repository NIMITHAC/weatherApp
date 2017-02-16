$(document).ready(function(){
	$('#current').on('click',function(){
		var cityName=$('#input1').val();
    console.log(cityName);
		var urlString = 'http://api.openweathermap.org/data/2.5/weather?q='+
		cityName+'&appid=27d43832d2a4adcb97fcbfa23db130aa';
		$.ajax({
			url:urlString,
			success:function(data){
        console.log(data);
				var date=moment(Date(data.dt*1000)).format("MMM Do YY");
				var temperature=data.main.temp-273;
				var humidity=data.main.humidity;
				var desc=data.weather[0].description;
				console.log(date,temperature,humidity,desc);
				var htmlString='<tr><td>'+date+'</td><td>'+temperature+'</td><td>'+humidity+'</td><td>'+desc+'</td></tr>';
				$('tbody').append(htmlString);
			},
			error:function(data){
				console.log('Err',data);
			}
		});
	});
	$('#forecast').on('click',function(){
		var cityName=$('#input1').val();
		var urlString = 'http://api.openweathermap.org/data/2.5/forecast?q='+
		cityName+'&appid=27d43832d2a4adcb97fcbfa23db130aa';
		$.ajax({
			url:urlString,
			success:function(data){
    var tempArr=[];
    var dateArr=[];
    var tempArr=data.list.map(item=>item.main.temp-273);
    var dateArr=data.list.map(item=>item.dt_txt);
    'Daily Average Temperature'
    Highcharts.chart('chart', {
     chart: {
      type: 'spline'
    },
    title: {
      text: 'Temperature'
    },
    subtitle: {
      text: 'Source: openweathermap.org'
    },
    xAxis: {
      categories: dateArr
    },
    yAxis: {
     labels: {
      formatter: function () {
       return this.value + '°';
     }
   }
 },
 tooltip: {
   crosshairs: true,
   shared: true
 },
 plotOptions: {
   spline: {
    marker: {
     radius: 4,
     lineColor: '#666666',
     lineWidth: 1
   }
 }
},
series: [{
 name: cityName,
 marker: {
   symbol: 'square'
 },
 data: tempArr

}]
});
  },

  error:function(data){
    console.log('Err',data);
  }
});
  });
});