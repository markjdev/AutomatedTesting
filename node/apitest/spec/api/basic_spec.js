var frisby = require('frisby');
var baseUrl = 'http://localhost:57831/api/';
var async = require('async');

// Reset data - This is a hack, need to run a script to trigger this perhaps? Or can we assume data initializer for automated testing?
async.series([

	function(callback) {
		frisby.create('Reset Data')
			.get(baseUrl + 'products/reset')
			.expectStatus(200)
			.toss();
		callback(null, 0);
	}
]);

// Test retrieval methods
async.parallel([
	function(callback) {
		frisby.create('Get All products')
			.get(baseUrl + 'products')
			.expectStatus(200)
			.expectHeaderContains('content-type', 'application/json')
			.expectJSONTypes({
				data: Array
			})
			.expectJSON({
				data: [
				{
					productId: 1,
					name: "Widget"
				},
				{
					productId: 2,
					name: "Sprocket"
				}
				]
			}
			)
			.expectJSONLength('data', 2)
			.toss();
		callback(null, 0);
	},
	function(callback) {
		frisby.create('Get product by id (exists)')
			.get(baseUrl + 'products/2')
			.expectStatus(200)
			.expectHeaderContains('content-type', 'application/json')
			.expectJSONTypes({
				data: Object
			})
			.expectJSON({
				data: {
					productId: 2,
					name: "Sprocket"
					}
			}
			)
			.toss();
		callback(null, 0);
	},
	function(callback) {
		frisby.create('Get product by id (does not exist)')
			.get(baseUrl + 'products/3')
			.expectStatus(404)
			.toss();
		callback(null);
	}
]);

// Test creation and update methods

async.parallel([	
	function(callback) {
		frisby.create('Create a new product (valid)')
			.post(baseUrl + 'products/', {
				"name": "Flange"
			}, {json: true})
			.expectStatus(200)
			.after(function(err, res, body) {
				frisby.create('Check product was created')
					.get(baseUrl + 'products/3')
					.expectStatus(200)
					.expectHeaderContains('content-type', 'application/json')
					.expectJSONTypes({
						data: Object
					})
					.expectJSON({
						data: {
							productId: 3,
							name: "Flange"
							}
					}
					).toss()
			  })
			.toss();
		callback(null, 0);
	},
	function(callback) {
		frisby.create('Create a new product (invalid)')
			.post(baseUrl + 'products/', {
				"name": "Fl"
			}, {json: true})
			.expectStatus(400)
			.expectJSON({
				"errors": [
				{
				  "errorMessage": "The field Name must be a string or array type with a minimum length of '3'."
				}
			]
			})
			.toss();
		callback(null, 0);
	}
]);

//Test delete methods
async.parallel([
	function(callback) {
		frisby.create('Delete a product (exists)')
			.delete(baseUrl + 'products/2')
			.expectStatus(200)
			.after(function(err, res, body) {
				frisby.create('Check product has been deleted')
				.get(baseUrl + '/products/2')
				.expectStatus(404)
				.toss();
			})
			.toss();
		callback(null, 0);
	},
	
	function(callback) {
		frisby.create('Delete a product (does not exist)')
			.delete(baseUrl + 'products/25')
			.expectStatus(404)
			.toss();
		callback(null, 0);
	}
]);