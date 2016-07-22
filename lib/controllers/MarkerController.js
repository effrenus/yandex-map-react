'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _api = require('../api');

var _api2 = _interopRequireDefault(_api);

var _layouts = require('./layouts');

var _layouts2 = _interopRequireDefault(_layouts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class MarkerController
 */
var MarkerController = function () {
    /**
     * @constructor
     * @param  {Number[]} coordinates Marker coordinate
     * @param  {Object} options
     * @param  {HTMLElement} options.markerDOM Marker layout
     */
    function MarkerController(coordinates) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, MarkerController);

        this.options = options;
        this._coordinates = coordinates;
        this._marker = new (_api2.default.getAPI().Placemark)(coordinates, null, null);
        this.events = this._marker.events.group();
    }

    /**
     * @return {Object} Return marker instance (specific for MAPAPI)
     */


    _createClass(MarkerController, [{
        key: 'getAPIInstance',
        value: function getAPIInstance() {
            return this._marker;
        }

        /**
         * @return {Number[]} Marker coordinates
         */

    }, {
        key: 'getCoordinates',
        value: function getCoordinates() {
            return this._coordinates;
        }
    }, {
        key: 'setPosition',
        value: function setPosition(coordinates) {
            this._marker.geometry.setCoordinates(coordinates);
        }

        /**
         *
         * @param {String} name
         * @param {HTMLElement} element
         */

    }, {
        key: 'setLayout',
        value: function setLayout(name, element) {
            var layout = void 0;

            if (name === 'iconLayout') {
                layout = _layouts2.default.createIconLayoutClass(element);
            } else if (name === 'balloonLayout') {
                layout = _layouts2.default.createBalloonLayoutClass(element);
            }

            this._marker.options.set(name, layout);
        }

        /**
         * Destroy marker
         */

    }, {
        key: 'destroy',
        value: function destroy() {
            this.events.removeAll();
            this._marker.setParent(null);
            this._marker = null;
        }
    }, {
        key: '_setupMarkerOptions',
        value: function _setupMarkerOptions() {
            var options = {};

            return options;
        }
    }]);

    return MarkerController;
}();

exports.default = MarkerController;