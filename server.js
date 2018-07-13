var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var bodyParser = require('body-parser');
var client = require('sync-rest-client');
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
 * Expects:
 * {
 *	'facility': {
 *		facilityId: String,
 *		facilityLocation: String
 *	},
 *	'packages': [
 *		{
 *			packageId: String,
 *			facilityId: String,
 *			deliveryLocatoin: String,
 *			signatureRequired: Boolean,
 *			isDelivered: Boolean,
 *			packageWeight: Number
 *		}
 *	]
 * }
 * */
app.post('/api', function(req, res) {
	/* var facilityId = req.body.facility.facilityId;
	var facilityLocation = req.body.facility.facilityLocation;
	var packages = req.body.packages;
	
	var routes = [];

	var maxPackagesPerRoute = 8;
	var packagesChunk = [];
	var chunkIndex = 0;

	for(var i = 0; i < packages.length; i++) {
		if(chunkIndex < maxPackagesPerRoute) {
			chunkIndex++;
			packagesChunk.push(packages[i]);
		}
		else {
			console.log("before");
			routes.push(calculateRoute(packagesChunk, facilityLocation, facilityId)[0]);
			console.log("after");
			chunkIndex = 0;
			packagesChunk = [];
		}
	}
	
	// Check for the last chunk < 8 packages
	if (Array.isArray(packagesChunk) && packagesChunk.length) {
		routes.push(calculateRoute(packagesChunk, facilityLocation, facilityId)[0])
	}
	var result = {
		deliveryRoutes: routes,
		facilityId: facilityId
	};
	
	console.log("Result: " + JSON.stringify(result)) */
	
	var routeResult = {
		deliveryRoutes: [
			{
				driverId: "-1",
				facilityId: 4,
				routeId: Math.random()*1000,
				googleMapsLink: "https://www.google.com/maps/dir/340+MacArthur+Blvd,+Mahwah,+NJ+07430/UPS+Innovation+Center,+Parsippany-Troy+Hills,+NJ/The+UPS+Store,+Rockaway,+NJ/123+South+Main+Street,+Lodi,+NJ/340+MacArthur+Boulevard,+Mahwah,+NJ/",
				bounty: 42
			},
			{
				driverId: "-1",
				facilityId: 4,
				routeId: Math.random()*1000,
				googleMapsLink: "https://www.google.com/maps/dir/340+MacArthur+Blvd,+Mahwah,+NJ+07430/UPS+Innovation+Center,+Parsippany-Troy+Hills,+NJ/The+UPS+Store,+Rockaway,+NJ/123+South+Main+Street,+Lodi,+NJ/340+MacArthur+Boulevard,+Mahwah,+NJ/",
				bounty: 42
			}
		]
	};
	
	res.send(routeResult);
});

/* function calculateRoute(packagesChunk, facilityLocation, facilityId) {
	console.log("during");
	var apiKey = "AIzaSyBINdf7SLAlb6MwSMGEhYaRTgAcSet_Qno"
	
	var deliveryLocations = []
	
	console.log("Packages chunk: " + JSON.stringify(packagesChunk));
	
	for(var i = 0; i < packagesChunk; i++) {
		var pkg = packagesChunk[i];
		var deliveryLocation = pkg.deliveryLocation;
		deliveryLocations.push(deliveryLocation);
	}
	
	console.log("Delivery locations: " + deliveryLocations.join());
	
	var googleDirectionsRequest = "https://maps.googleapis.com/maps/api/directions/json?origin="+facilityLocation+"&destination="+facilityLocation+"&optimizeWaypoints=waypoints"+deliveryLocations.join("|")+"&key="+apiKey;
	
	var googleMapsUrl = "https://www.google.com/maps/dir/"+"340 Macarthur Boulevard, Mahwah, NJ/"+deliveryLocations.join("/")+"340 Macarthur Boulevard, Mahwah, NJ"+"/";
	console.log("URL: " + googleMapsUrl);
	var routeId = Math.random()*1000;
	console.log("Route id is "+ routeId);
	var routeResult = {
		driverId: "-1",
		facilityId: facilityId,
		routeId: Math.random()*1000,
		googleMapsUrl: googleMapsUrl,
		bounty: 42
	};
	
	console.log("Route result:" + JSON.stringify(routeResult));
	return routeResult;	
} */

app.listen(port);

console.log('RESTful API server started on: ' + port);

