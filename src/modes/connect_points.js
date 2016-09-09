const Constants = require('../constants');

module.exports = function(ctx) {
  
  function handleClick(e) {
    ctx.map.fire(Constants.events.CONNECT_POINTS, {
          features: ctx.store.getSelected().map(f => f.toGeoJSON())
    });
    ctx.events.changeMode(Constants.modes.SIMPLE_SELECT);
    ctx.store.clearSelected();
  }
  
  return {
    start() {
      setTimeout( handleClick, 0 );
    },

    stop() {
      ctx.ui.setActiveButton();
    },

    render(geojson, callback) {
      callback(geojson);
    }
  };
};
