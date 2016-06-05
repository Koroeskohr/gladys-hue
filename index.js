

module.exports = function(sails) {
    
    var search = require('./lib/search.js');
    var register = require('./lib/register.js');
    var exec = require('./lib/exec.js');
    var config = require('./lib/config.js');
    
    return {
        search: search,
        register: register,
        exec: exec,
        config: config
    };
};