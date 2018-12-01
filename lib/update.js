const hue = require("node-hue-api");
const shared = require('./shared.js');
const HueApi = hue.HueApi;
const Promise = require('bluebird');

module.exports = function update(params){
    sails.log.debug("yoho");
  
    return gladys.device.getByService({service: params})
        .then(function(devices){

            sails.log.debug("yoho");
            devices.forEach(function(device){

                shared.getApi()
                    .then(function(api) {
                        return Promise.all([api.lightStatus(device.identifier), search(device.id)])
                    })
                    .then(([status, deviceTypes])=> {
                        displayStatus(status)
                        updateState(deviceTypes, status.state)
                    })
            })
        })	
        .catch(function (err) {
            sails.log.error(err);
        })
};

function displayStatus(status) {
    sails.log(JSON.stringify(status.state, null, 2));
};

function updateState(deviceTypes, state){

    if (state.on){
        var valeur = '1';
        var luminosite = Math.round(state.bri / 2.54);
    }
    else {
        var valeur = '0';
    }

    deviceTypes.forEach(function(deviceType) {
        switch (deviceType.type){
            case 'binary':
                if(deviceType.lastValue !== parseInt(valeur)) {
                    gladys.deviceState.create({devicetype: deviceType.id, value: valeur});
                }
                break;
            case 'brightness':
                if (state.on){
                    if(deviceType.lastValue !== luminosite) {
                        gladys.deviceState.create({devicetype: deviceType.id, value: luminosite});
                    }
                }
                break;
            case 'hue':
                if (state.on && state.hasOwnProperty('hue')){
                    if(deviceType.lastValue !== state.hue) {
                        gladys.deviceState.create({devicetype: deviceType.id, value: state.hue});
                    }
                }
                break;
            case 'saturation':
                if (state.on && state.hasOwnProperty('sat')){
                    if(deviceType.lastValue !== state.sat) {
                        gladys.deviceState.create({devicetype: deviceType.id, value: state.sat});
                    }
                }
                break;
            default:
                break;
        } 
    })
};

function search(id_lampe){

    var device = {
        id: id_lampe
      }
    
    return gladys.deviceType.getByDevice(device)
        .then(function(deviceTypes) {
            return deviceTypes
        });
};