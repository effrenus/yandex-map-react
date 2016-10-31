'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _api = require('../api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ClusterController = function () {
    function ClusterController(clusterOptions, mapController) {
        _classCallCheck(this, ClusterController);

        this._cluster = new (_api2.default.getAPI().Clusterer)(clusterOptions);
        this._mapController = mapController;
        this._setupCollection();
    }

    _createClass(ClusterController, [{
        key: 'getAPIInstance',
        value: function getAPIInstance() {
            return this._cluster;
        }
    }, {
        key: '_setupCollection',
        value: function _setupCollection() {
            this._geoCollection = new (_api2.default.getAPI().GeoObjectCollection)();
            this._mapController.appendCluster(this._cluster);
        }
    }, {
        key: 'appendMarker',
        value: function appendMarker(marker) {
            this._cluster.add(marker.getAPIInstance());
            this._mapController.map.setBounds(this._cluster.getBounds());
        }
    }, {
        key: 'destroyMarker',
        value: function destroyMarker(marker) {
            this._cluster.remove(marker.getAPIInstance());
        }
    }]);

    return ClusterController;
}();

exports.default = ClusterController;