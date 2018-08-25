// Create your own Event Tracker system:
//
// 1. create an `EventTracker` object
//    • it should accept a name when constructed
// 2. extend the `EventTracker` prototype with:
//    • an `on` method
//    • a `notify` method
//    • a `trigger` method
//
// EXAMPLE:
// function purchase(item) { console.log( 'purchasing ' + item); }
// function celebrate() { console.log( this.name + ' says birthday parties are awesome!' ); }
//
// var nephewParties = new EventTracker( 'nephews ');
// var richard = new EventTracker( 'Richard' );
//
// nephewParties.on( 'mainEvent', purchase );
// richard.on( 'mainEvent', celebrate );
// nephewParties.notify( richard, 'mainEvent' );
//
// nephewParties.trigger( 'mainEvent', 'ice cream' );
//
var EventTracker = function(name){
  this.name = name,
  this.events = {},
  this.listeners = [],
  this.on = function(title, callback) {
    return internalOn(this, title, callback);
  },

  this.notify = function (otherTracker, title){
    addNotify(this, otherTracker, title);
  },
  this.trigger = function(title, value){
    this.events[title](value);
    if(this.events[title].toNotify){
      this.events[title].toNotify.forEach(function(x) {
        x.trigger(title(value));
      }
    );
    }
  }
}

function internalOn(obj, title, callback) {
  if(obj.events[title] === undefined){
     obj.events[title] = callback
     obj.events[title].toNotify = [];
}
}
function addNotify (obj, otherTracker, title) {

    obj.events[title].toNotify.push(otherTracker);
  }
