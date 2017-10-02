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
    function PanoramaController(func) {
        _classCallCheck(this, PanoramaController);

        this._isPanoramas = func;
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
        value: function locate(showService) {
            var _this = this;

            if (this.isSupported()) {
                this._panorama.locate(this._coordinates).done(function (panoramas) {

                    _this._isPanoramas(Boolean(panoramas.length));

                    if (showService) {
                        _this.show(panoramas);
                    }
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
                var player = new this._panorama.Player(this._container, panoramas[0], this._options);

                player.events.add('destroy', this.destroy.bind(this));
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

            if (this._options.parentFunct) {
                this._options.parentFunct();
            }
        }
    }]);

    return PanoramaController;
}();

exports.default = PanoramaController;