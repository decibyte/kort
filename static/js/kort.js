window.addEvent('domready', function() {
	var geographic = new OpenLayers.Projection('EPSG:4326');
	var map = new OpenLayers.Map('map', {
		controls: [
	        	new OpenLayers.Control.Navigation(),
			new OpenLayers.Control.Zoom()
		]
	});
	var basemap = new OpenLayers.Layer.OSM('Kort');
	map.addLayer(basemap);

	var markers = new OpenLayers.Layer.Markers('Markers');
	map.addLayer(markers);
	var size = new OpenLayers.Size(50,70);
	var offset = new OpenLayers.Pixel(-25, -60);
	var icon = new OpenLayers.Icon('/static/gfx/tuna.png',size,offset);

	if($('map').dataset.lon != 'None') {
		var pos = new OpenLayers.LonLat($('map').dataset.lon, $('map').dataset.lat);
		map.setCenter(
			pos.transform(
				geographic,
				map.getProjectionObject()
			), 16
		);
		markers.addMarker(new OpenLayers.Marker(pos,icon));
	} else if ($$('html')[0].hasClass('geolocation')) {
		navigator.geolocation.getCurrentPosition(function(position) {
			map.setCenter(
				new OpenLayers.LonLat(position.coords.longitude, position.coords.latitude).transform(
					geographic,
					map.getProjectionObject()
				), 16
			);
		});
	} else {
		map.setCenter(
			new OpenLayers.LonLat(11.5, 56.25).transform(
				geographic,
				map.getProjectionObject()
			), 7
		);
	}
});
