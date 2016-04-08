var hue = require("node-hue-api");
var shared = require('./shared.js');
var HueApi = hue.HueApi;
var lightState = hue.lightState;
var state = lightState.create();

module.exports = function exec(params){
    var newState;
    
    if(params.deviceType.type === 'binary'){
        if(params.state.value === 1){
            newState = state.on();
        } else {
            newState = state.off();
        }   
    }
    return shared.getApi()
      .then(function(api){
         return api.setLightState(params.deviceType.identifier, newState); 
      });    
};