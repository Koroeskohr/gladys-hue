# Gladys Hue

Gladys hooks to control Philips Hue.

Need Gladys version >= 3.0.0.

## Documentation


### config

Connect to a given bridge and add lamps to Gladys device system. 
You need to press the button on your Philips Hue bridge just before calling this function.
This function need to be called only once, then the identifier are saved in Gladys param table.

```javascript
gladys.modules.hue.config()
  .then(function(){

  })
  .catch(function(err){
     // you forgot to press the button...
     // or bridge is not responding
  });
```