const hue = require("node-hue-api");
const shared = require('./shared.js');
const HueApi = hue.HueApi;
const Promise = require('bluebird');

module.exports = function update(params){
  
    return gladys.device.getByService({service: params})
        .then(function(devices){

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
};

function displayStatus(status) {
    etat = JSON.stringify(status.state, null, 2);
    console.log(etat);
    //console.log(status.state.hasOwnProperty('hue'));
};

function updateState(deviceTypes ,state){
    console.log(`Etat: ${state.on}`);
    console.log(`Luminosité: ${state.bri}`);
    console.log(`Reachable: ${state.reachable}`);

    if (state.on){
        var valeur = '1';
        var luminosite = Math.round((state.bri)/2.54);
    }
    else {
        var valeur = '0';
    }

    deviceTypes.forEach(function(deviceType) {
        switch (deviceType.type){
            case 'binary':
                if(deviceType.lastValue !== parseInt(valeur)) {
                    gladys.deviceState.create({devicetype: deviceType.id, value: valeur})
                    .then(value => console.log(`L'état du deviceType ayant pour id ${deviceType.id} a été modifié : ${valeur}`))
                }
                else {
                    console.log('Etat déjà à jour');
                }
                break;
            case 'brightness':
                if (state.on){
                    if(deviceType.lastValue !== luminosite) {
                        console.log(`DeviceType with id ${deviceType.id}.`);
                        gladys.deviceState.create({devicetype: deviceType.id, value: luminosite})
                        .then(value => console.log(`La luminosité du deviceType ayant pour id ${deviceType.id} a été modifié : ${luminosite}`))
                    }
                    else {
                        console.log('Luminosité déjà à jour');
                    }
                }
                else {
                    console.log('Lampe éteinte');
                }
                break;
            case 'hue':
                if (state.on && state.hasOwnProperty('hue')){
                    if(deviceType.lastValue !== state.hue) {
                        console.log(`DeviceType with id ${deviceType.id}.`);
                        gladys.deviceState.create({devicetype: deviceType.id, value: state.hue})
                        .then(value => console.log(`Hue du deviceType ayant pour id ${deviceType.id} a été modifié : ${state.hue}`))
                    }
                    else {
                        console.log('Hue déjà à jour');
                    }
                }
                else {
                    if (state.on){
                        console.log('Paramètre Hue non géré');
                    }
                    else {
                        console.log('Lampe éteinte');
                    }
                }
                break;
            case 'saturation':
                if (state.on && state.hasOwnProperty('sat')){
                    if(deviceType.lastValue !== state.sat) {
                        console.log(`DeviceType with id ${deviceType.id}.`);
                        gladys.deviceState.create({devicetype: deviceType.id, value: state.sat})
                        .then(value => console.log(`Sat du deviceType ayant pour id ${deviceType.id} a été modifié : ${state.sat}`))
                    }
                    else {
                        console.log('Sat déjà à jour');
                    }
                }
                else {
                    if (state.on){
                        console.log('Paramètre Sat non géré');
                    }
                    else {
                        console.log('Lampe éteinte');
                    }
                }
                break;
            default:
                console.log(`DeviceType with id ${deviceType.id} not handled, not updated.`);
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

            deviceTypes.forEach(function(deviceType) {
                switch (deviceType.type){
                  case 'binary':
                    console.log('deviceType binary : ' + deviceType.id);
                    break;
                  case 'brightness':
                    console.log('deviceType brightness : ' + deviceType.id);
                    break;
                  case 'hue':
                    console.log('deviceType hue : ' + deviceType.id);
                    break;
                  case 'saturation':
                    console.log('deviceType sat : ' + deviceType.id);
                    break;
                  default:
                    console.log(`DeviceType with id ${deviceType.id} not handled.`)
                    break;
                }
            })
            return deviceTypes
        });
};