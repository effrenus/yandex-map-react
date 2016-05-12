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
        value: function createMap(container, state, options) {
            this._map = new (_api2.default.getAPI().Map)(container, state, options);
            this.events = this._map.events.group();

            this._setupCollection();

            return this;
        }
    }, {
        key: 'appendMarker',
        value: function appendMarker(marker) {
            this._geoCollection.add(marker.getAPIInstance());
        }
    }, {
        key: 'setOptions',
        value: function setOptions(name, value) {
            this._map.options.set(name, value);
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
            this._map.geoObjects.add(this._geoCollection);
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