

module.exports = function(sails) {
    
    var search = require('./lib/search.js');
    var register = require('./lib/register.js');
    var exec = require('./lib/exec.js');
    var setup = require('./lib/setup.js');
    
    return {
        search: search,
        register: register,
        exec: exec,
        setup: setup
    };
};