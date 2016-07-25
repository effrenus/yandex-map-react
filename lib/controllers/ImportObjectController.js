'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _api = require('../api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ImportObjectController = function () {
    function ImportObjectController(map, data) {
        _classCallCheck(this, ImportObjectController);

        this._map = map;
        this._data = data;

        this._setupPresets();
        this._setupGeoObjects();
    }

    _createClass(ImportObjectController, [{
        key: 'destroy',
        value: function destroy() {
            this._clearPresets();
            this._geoObject.removeFromMap(this._map);
            this._geoObject = null;
            this._map = null;
        }
    }, {
        key: '_setupGeoObjects',
        value: function _setupGeoObjects() {
            var geoObjects = this._data.geoObjects;

            var ymaps = _api2.default.getAPI();

            if (!geoObjects) {
                return;
            }

            this._geoObject = ymaps.geoQuery(this._prepare(geoObjects)).addToMap(this._map);
        }
    }, {
        key: '_prepare',
        value: function _prepare(collection) {
            var updatedCollection = _extends({}, collection);

            updatedCollection.features.forEach(function (feature) {
                var props = feature.properties;
                if (!props) {
                    return feature;
                }
                if (props.name) {
                    props.balloonContentHeader = props.name;
                }
                if (props.description) {
                    props.balloonContentBody = props.description;
                }
            });

            return updatedCollection;
        }
    }, {
        key: '_setupPresets',
        value: function _setupPresets() {
            var presetStorage = this._data.presetStorage;

            var ymaps = _api2.default.getAPI();

            if (!presetStorage) {
                return;
            }

            this._presetKeys = Object.keys(presetStorage);
            this._presetKeys.forEach(function (key) {
                ymaps.option.presetStorage.add(key, presetStorage[key]);
            });
        }
    }, {
        key: '_clearPresets',
        value: function _clearPresets() {
            var ymaps = _api2.default.getAPI();
            this._presetKeys.forEach(function (key) {
                ymaps.option.presetStorage.remove(key);
            });
        }
    }]);

    return ImportObjectController;
}();

exports.default = ImportObjectController;