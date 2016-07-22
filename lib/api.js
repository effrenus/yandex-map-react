'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _loadApi = require('./utils/loaders/loadApi');

var _loadApi2 = _interopRequireDefault(_loadApi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Api = function () {
    function Api() {
        _classCallCheck(this, Api);

        this.api = window.ymaps ? window.ymaps : null;
    }

    _createClass(Api, [{
        key: 'setAPI',
        value: function setAPI(instance) {
            this.api = instance;

            return this.api;
        }
    }, {
        key: 'getAPI',
        value: function getAPI() {
            return this.api;
        }
    }, {
        key: 'isAvailible',
        value: function isAvailible() {
            return Boolean(this.api);
        }

        /**
         * Loading API
         * @return {Promise}
         */

    }, {
        key: 'load',
        value: function load() {
            var _this = this;

            var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            return (0, _loadApi2.default)(options).then(function (instance) {
                _this.api = instance;
                return instance;
            });
        }
    }]);

    return Api;
}();

exports.default = new Api();