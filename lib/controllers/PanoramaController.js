'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _api = require('../api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PanoramaController = function () {
    function PanoramaController() {
        _classCallCheck(this, PanoramaController);
    }

    _createClass(PanoramaController, [{
        key: 'createPanorama',
        value: function createPanorama(container, state, options) {

            this._container = container;
            this._coordinates = state.center;
            this._options = options;
            this._panorama = _api2.default.getAPI().panorama;

            return this;
        }
    }, {
        key: 'locate',
        value: function locate() {
            var _this = this;

            if (this.isSupported()) {
                this._panorama.locate(this._coordinates).done(function (panoramas) {
                    return _this.show(panoramas);
                }, function (error) {
                    return _this.error(error);
                });
            } else {
                this.error({
                    message: 'Браузер не поддерживается плеером.'
                });
            }
        }
    }, {
        key: 'show',
        value: function show(panoramas) {
            if (panoramas.length > 0) {
                new this._panorama.Player(this._container, panoramas[0], this._options);
            }
        }
    }, {
        key: 'error',
        value: function error(_error) {
            console.error(_error.message);
        }
    }, {
        key: 'isSupported',
        value: function isSupported() {
            return this._panorama.isSupported();
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            this._panorama = null;
        }
    }]);

    return PanoramaController;
}();

exports.default = PanoramaController;