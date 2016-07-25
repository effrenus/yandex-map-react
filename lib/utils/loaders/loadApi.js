'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = loadApi;

var _fetchScript = require('./fetchScript');

var _fetchScript2 = _interopRequireDefault(_fetchScript);

var _configs = require('../../configs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loadPromise = void 0;

var enabledAPIParams = ['lang', 'apikey', 'coordorder', 'load', 'mode'];
var successCallbackName = '_$_api_success';
var errorCallbackName = '_$_api_error';

var defaultOptions = {
    lang: 'ru_RU',
    coordorder: 'latlong',
    load: 'package.full',
    mode: 'debug',
    ns: '',
    onload: successCallbackName,
    onerror: errorCallbackName
};

function generateURL(options) {
    var params = Object.assign({}, defaultOptions);
    Object.keys(options).filter(function (key) {
        return enabledAPIParams.indexOf(key) !== -1;
    }).forEach(function (key) {
        params[key] = options[key];
    });

    var queryString = Object.keys(params).reduce(function (result, key) {
        result.push(key + '=' + params[key]);
        return result;
    }, []).join('&');

    return 'https://' + _configs.apiConfig.host + '/' + _configs.apiConfig.version + '/?' + queryString;
}

function loadApi(options) {
    if (loadPromise) {
        return loadPromise;
    }

    loadPromise = new Promise(function (resolve, reject) {

        window[successCallbackName] = function (ymaps) {
            resolve(ymaps);
            window[successCallbackName] = null;
        };

        window[errorCallbackName] = function (error) {
            reject(error);
            window[errorCallbackName] = null;
        };

        (0, _fetchScript2.default)(generateURL(options));
    });

    return loadPromise;
}