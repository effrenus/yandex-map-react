'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _MapElement = require('./MapElement');

var _MapElement2 = _interopRequireDefault(_MapElement);

var _MapController = require('./controllers/MapController');

var _MapController2 = _interopRequireDefault(_MapController);

var _map = require('./apiEventsLists/map');

var _map2 = _interopRequireDefault(_map);

var _decorators = require('./utils/decorators');

var _configs = require('./configs');

var _configs2 = _interopRequireDefault(_configs);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var YandexMap = function (_Component) {
    _inherits(YandexMap, _Component);

    function YandexMap(props) {
        _classCallCheck(this, YandexMap);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(YandexMap).call(this, props));

        _this.state = {
            isAPILoaded: false
        };
        return _this;
    }

    _createClass(YandexMap, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                mapController: this._controller
            };
        }
    }, {
        key: 'getController',
        value: function getController() {
            return this._controller ? this._controller : null;
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this2 = this;

            Object.keys(nextProps).forEach(function (key) {
                switch (key) {
                    case 'controls':
                        _this2._controller.setState(key, nextProps[key]);
                        break;
                    default:
                        break;
                }
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (_api2.default.isAvailible()) {
                this._onAPILoad(_api2.default.getAPI());
            } else {
                _api2.default.load(this._getAPIParams()).then(this._onAPILoad.bind(this)).catch(function (error) {
                    return console.log('Error occured: %s', error);
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { style: this._getStyle() },
                _react2.default.createElement(_MapElement2.default, { ref: 'mapContainer' }),
                Boolean(this.state.isAPILoaded) ? this.props.children : null
            );
        }
    }, {
        key: '_getAPIParams',
        value: function _getAPIParams() {
            var params = {};

            if (this.props.coordorder) {
                params.coordorder = this.props.coordorder;
            }

            return params;
        }
    }, {
        key: '_getStyle',
        value: function _getStyle() {
            return _extends({}, this.props.style, {
                width: typeof this.props.width == 'string' ? this.props.width : this.props.width + 'px',
                height: typeof this.props.height == 'string' ? this.props.height : this.props.height + 'px'
            });
        }
    }, {
        key: '_onAPILoad',
        value: function _onAPILoad(namespace) {
            this.props.onAPIAvailable && this.props.onAPIAvailable(namespace);

            this._controller = new _MapController2.default();
            this._controller.createMap(_reactDom2.default.findDOMNode(this.refs.mapContainer), _extends({}, this.props.state, {
                center: this.props.center,
                zoom: this.props.zoom
            }), _extends({}, this.props.options));

            this._setupEvents();
            this.setState({ isAPILoaded: true });

            if (this.props.onMapAvailable) {
                this.props.onMapAvailable(this._controller.map);
            }
        }
    }]);

    return YandexMap;
}(_react.Component);

YandexMap.propTypes = {
    apiKey: _react.PropTypes.string,
    onAPIAvailable: _react.PropTypes.func,
    width: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
    height: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
    zoom: _react.PropTypes.number,
    state: _react.PropTypes.object,
    coordorder: _react.PropTypes.oneOf(['latlong', 'longlat']),
    options: _react.PropTypes.object
};
YandexMap.defaultProps = {
    zoom: 10,
    center: [55, 45],
    width: 600,
    height: 600,
    state: {
        controls: []
    },
    options: {},
    style: {
        position: 'relative'
    }
};
YandexMap.childContextTypes = {
    mapController: _react.PropTypes.object
};
exports.default = (0, _decorators.eventsDecorator)(YandexMap, { supportEvents: _map2.default });