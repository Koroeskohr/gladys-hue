# Gladys Hue

Gladys hooks to control Philips Hue.

Need Gladys version >= 3.0.0.

## Documentation


### search

Search functions search for Philips Hue bridges in local network with an upnp search.

```javascript
gladys.modules.hue.search()
  .then(function(bridges){

  });
```

### connect

Connect to a given bridge. You need to press the button on your Philips Hue bridge just before calling this function.

```javascript
gladys.modules.hue.connect({ipaddress: '192.168.1.1'})
  .then(function(){

  })
  .catch(function(err){
     // you forgot to press the button...
     // or bridge is not responding
  });
```