var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var bodyParser = require('body-parser');
var Client = require('node-rest-client').Client;
 
var client = new Client();

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
	var facilityId = req.body.facility.facilityId;
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
			routes.push(calculateRoute(packagesChunk, facilityLocation, facilityId));
			chunkIndex = 0;
			packagesChunk = [];
		}
	}
	
	// Check for the last chunk < 8 packages
	if (Array.isArray(packagesChunk) && packagesChunk.length) {
		routes.push(calculateRoute(packagesChunk, facilityLocation, facilityId))
	}
	var result = {
		deliveryRoutes: routes,
		facilityId: facilityId
	};
	console.log("Result: " + result)
	res.send(result);
});

function calculateRoute(packagesChunk, facilityLocation, facilityId) {
	var apiKey = "AIzaSyBINdf7SLAlb6MwSMGEhYaRTgAcSet_Qno"
	
	var deliveryLocations = []
	
	for(var i = 0; i < packagesChunk; i++) {
		var package = packagesChunk[i];
		var deliveryLocation = package.deliveryLocation;
		deliveryLocations.push(deliveryLocation);
	}
	
	var googleDirectionsRequest = "https://maps.googleapis.com/maps/api/directions/json?origin="+facilityLocation+"&destination="+facilityLocation+"&optimizeWaypoints=waypoints"+deliveryLocations.join("|")+"&key="+apiKey;
	
	var directions = "";
	
	console.log("Google directions request URL: " + googleDirectionsRequest);
	
	return client.get(googleDirectionsRequest, function(data, response) {
		console.log("data= " + data);
		directions = data;
		var indexOrder = directions.routes.waypoint_order;
		var orderedLocations = [];
		orderedLocations.push(facilityLocation);
		if(!(Arrays.isArray(indexOrder) && !indexOrder.length))
			for(var o = 0; o < indexOrder; o++)
				orderedLocations.push(deliveryLocations[o]);
		else {
			orderedLocations = deliveryLocations;
		}
		orderedLocations.push(facilityLocation);
		
		var googleMapsUrl = "https://www.google.com/maps/dir/"+orderedLocations.join("/")+"/";
		var routeId = Math.random()*1000;
		console.log("Route id is "+ routeId);
		var routeResult = {
			driverId: "-1",
			facilityId: facilityId,
			routeId: Math.random()*1000,
			googleMapsUrl: googleMapsUrl,
			bounty: 42
		};
		return routeResult;
	});
	
	
}

app.listen(port);

console.log('RESTful API server started on: ' + port);

