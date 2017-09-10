var search = require('./search.js');
var register = require('./register.js');
var getAllLights = require('./getAllLights.js');
var Promise = require('bluebird');
const shared = require('./shared.js');

module.exports = function() {

	// we clear the cache to remove currently connected bridge
	shared.clearCache();

	// we search on the network for all bridges
	return search()
	  .then(function(bridges){

	  	// if we found a bridge
	  	if(bridges.length === 0){
	  		return Promise.reject(new Error('No bridge found'));
	  	} else {

	  		// we connect to it
	  		return register(bridges[0]);
	  	}
	  })
	  .then(function(){

	  	// and get all the lights on the network
	  	return getAllLights();
	  });

};