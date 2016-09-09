const CommonSelectors = require('../lib/common_selectors');
const Point = require('../feature_types/point');
const Constants = require('../constants');

module.exports = function(ctx) {

  return {
    start() {
    	ctx.map.fire(Constants.events.CONNECT_POINTS, {
    	      features: ctx.store.getSelected().map(f => f.toGeoJSON())
    	});
    },

    stop() {
      ctx.ui.setActiveButton();
    },

    render(geojson, callback) {
    },

    trash() {
    }
  };
};
