'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _api = require('../api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MapController = function () {
    function MapController() {
        _classCallCheck(this, MapController);
    }

    _createClass(MapController, [{
        key: 'createMap',
        value: function createMap(container, state, options, cluster, clusterOptions) {
            this._map = new (_api2.default.getAPI().Map)(container, state, options);
            this._clusterEnabled = cluster;
            if (this._clusterEnabled) {
                this._cluster = new (_api2.default.getAPI().Clusterer)(clusterOptions);
            }
            this.events = this._map.events.group();
            this._setupCollection();
            return this;
        }
    }, {
        key: 'appendMarker',
        value: function appendMarker(marker) {
            if (this._clusterEnabled) {
                this._cluster.add(marker.getAPIInstance());
                this._map.setBounds(this._cluster.getBounds());
            } else {
                this._geoCollection.add(marker.getAPIInstance());
                this._map.setBounds(this._geoCollection.getBounds());
            }
        }
    }, {
        key: 'setOptions',
        value: function setOptions(name, value) {
            this._map.options.set(name, value);
        }
    }, {
        key: 'setCenter',
        value: function setCenter(coords) {
            this._map.setCenter(coords);
        }
    }, {
        key: 'setZoom',
        value: function setZoom(zoom) {
            this._map.setZoom(zoom);
        }
    }, {
        key: 'setState',
        value: function setState(name, value) {
            this._map.state.set(name, value);
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this.events.removeAll();
            this._map.destroy();
        }
    }, {
        key: '_setupCollection',
        value: function _setupCollection() {
            this._geoCollection = new (_api2.default.getAPI().GeoObjectCollection)();
            if (this._clusterEnabled) {
                this._map.geoObjects.add(this._cluster);
            } else {
                this._map.geoObjects.add(this._geoCollection);
            }
        }
    }, {
        key: 'map',
        get: function get() {
            return this._map;
        }
    }]);

    return MapController;
}();

exports.default = MapController;