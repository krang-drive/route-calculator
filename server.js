var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
 * Expects:
 * {
 *	'facilityId': Number,
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
app.get('/api', function(req, res) {
	var facilityId = req.body.facilityId;
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
			routes.push(calculateRoute(packagesChunk));
			chunkIndex = 0;
			packagesChunk = [];
		}
	}
	
	// Check for the last chunk < 8 packages
	if (Array.isArray(packagesChunk) && packagesChunk.length) {
		routes.push(calculateRoute(packagesChunk))
	}
	res.send(routes);
});

function calculateRoute(packagesChunk) {
	var routeResult = [];
	routeResult.push(/* API call here*/);
	return routeResult;
}

app.listen(port);

console.log('RESTful API server started on: ' + port);

