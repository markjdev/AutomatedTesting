var frisby = require('frisby');
var async = require('async');
var baseUrl = 'http://localhost:57831/api/';

async.series({
	"one": function(cb) {frisby.create('Reset Data')
	.get(baseUrl + 'products/reset')
    .expectStatus(400)
	.toss();
	cb();
	},
	"two": function(cb) {frisby.create('Reset Data')
	.get(baseUrl + 'products/reset')
    .expectStatus(200)
	.toss();
	cb();
	}
},
function(err, results) {
	console.log("Error encounterd: " + err);
}
);