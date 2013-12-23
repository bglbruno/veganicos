var map;
function initialize() {
	var mapOptions = {
		center : new google.maps.LatLng(-23.454249796706467, -46.533792500000004),
		zoom : 15,
		scrollwheel: false,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
}
function loadScript() {
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDWigmPpGjjc4pimthLWhUaUcV4VkFzq1U&sensor=false&callback=initialize';
	document.body.appendChild(script);
}
function updateMap(lat, lon){
	
	var pos = new google.maps.LatLng(lat, lon);
	
	var marker = new google.maps.Marker({
		map: map,
		position: pos,
		content: 'Cep localizado'
	});
	
	map.setCenter(pos);
	
}
window.onload = loadScript;