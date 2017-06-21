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

var _PanoramaElement = require('./PanoramaElement');

var _PanoramaElement2 = _interopRequireDefault(_PanoramaElement);

var _PanoramaController = require('./controllers/PanoramaController');

var _PanoramaController2 = _interopRequireDefault(_PanoramaController);

var _map = require('./apiEventsLists/map');

var _map2 = _interopRequireDefault(_map);

var _decorators = require('./utils/decorators');

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var YandexPanorama = function (_Component) {
    _inherits(YandexPanorama, _Component);

    function YandexPanorama(props) {
        _classCallCheck(this, YandexPanorama);

        var _this = _possibleConstructorReturn(this, (YandexPanorama.__proto__ || Object.getPrototypeOf(YandexPanorama)).call(this, props));

        _this.state = {
            isAPILoaded: false
        };
        return _this;
    }

    _createClass(YandexPanorama, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                mapController: this._controller,
                coordorder: this.props.loadOptions.coordorder || 'latlong'
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
            // this._controller && Object.keys(nextProps).forEach(key => {
            //     switch (key) {
            //         case 'controls':
            //             this._controller.setState(key, nextProps[key]);
            //             break;
            //         case 'center':
            //             if (this.props.center[0] !== nextProps.center[0]
            //               || this.props.center[1] !== nextProps.center[1] ) {
            //               this._controller.setCenter(nextProps.center);
            //             }
            //
            //             break;
            //         case 'zoom':
            //             if (this.props.zoom !== nextProps.zoom) {
            //               this._controller.setZoom(nextProps.zoom);
            //             }
            //
            //             break;
            //         case 'bounds':
            //             if (this.props.bounds !== nextProps.bounds) {
            //               this._controller.setBounds(nextProps.bounds);
            //             }
            //
            //             break;
            //         default:
            //             break;
            //     }
            // });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (_api2.default.isAvailible()) {
                this._onAPILoad(_api2.default.getAPI());
            } else {
                _api2.default.load(this.props.loadOptions).then(this._onAPILoad.bind(this)).catch(function (error) {
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
                _react2.default.createElement(_PanoramaElement2.default, { ref: 'panoramaPlayer' })
            );
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
            var _this2 = this;

            this.props.onAPIAvailable && this.props.onAPIAvailable(namespace);

            this._controller = new _PanoramaController2.default();
            this._controller.createPanorama(_reactDom2.default.findDOMNode(this.refs.panoramaPlayer), _extends({}, this.props.state, {
                center: this.props.center,
                zoom: this.props.zoom,
                bounds: this.props.bounds
            }), _extends({}, this.props.options));

            this.setState({ isAPILoaded: true }, function () {
                return _this2._controller.locate();
            });
        }
    }]);

    return YandexPanorama;
}(_react.Component);

YandexPanorama.propTypes = {
    apiKey: _react.PropTypes.string,
    onAPIAvailable: _react.PropTypes.func,
    width: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
    height: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
    zoom: _react.PropTypes.number,
    state: _react.PropTypes.object,
    options: _react.PropTypes.object,
    loadOptions: _react.PropTypes.object,
    bounds: _react.PropTypes.array
};
YandexPanorama.defaultProps = {
    zoom: 10,
    center: [55, 45],
    width: 600,
    height: 600,
    bounds: undefined,
    state: {
        controls: []
    },
    options: {},
    loadOptions: {},
    style: {
        position: 'relative'
    }
};
YandexPanorama.childContextTypes = {
    mapController: _react.PropTypes.object,
    coordorder: _react.PropTypes.oneOf(['latlong', 'longlat'])
};
exports.default = (0, _decorators.eventsDecorator)(YandexPanorama, { supportEvents: _map2.default });