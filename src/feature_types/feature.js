var hat = require('hat');
var Constants = require('../constants');

var Feature = function(ctx, geojson) {
  this.ctx = ctx;
  this.properties = geojson.properties || {};
  this.coordinates = geojson.geometry.coordinates;
  this.id = geojson.id || hat();
  this.type = geojson.geometry.type;
};

Feature.prototype.changed = function() {
  this.ctx.store.featureChanged(this.id);
};

Feature.prototype.incomingCoords = function(coords) {
  this.setCoordinates(coords);
};

Feature.prototype.setCoordinates = function(coords) {
  this.coordinates = coords;
  this.changed();
};

Feature.prototype.getCoordinates = function() {
  return JSON.parse(JSON.stringify(this.coordinates));
};

Feature.prototype.toGeoJSON = function() {
  return JSON.parse(JSON.stringify({
    id: this.id,
    type: Constants.geojsonTypes.FEATURE,
    properties: this.properties,
    geometry: {
      coordinates: this.getCoordinates(),
      type: this.type
    }
  }));
};

Feature.prototype.internal = function(mode) {
  var new_properties = this.properties;
  new_properties.id = this.id;
  new_properties.meta = Constants.meta.FEATURE;
  new_properties["meta:type"] = this.type;
  new_properties.active = Constants.activeStates.INACTIVE;
  new_properties.mode = mode;
  
  return {
    type: Constants.geojsonTypes.FEATURE,
    properties: new_properties,
    geometry: {
      coordinates: this.getCoordinates(),
      type: this.type
    }
  };
};

module.exports = Feature;
