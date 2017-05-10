'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _BalloonLayout = require('./BalloonLayout');

var _BalloonLayout2 = _interopRequireDefault(_BalloonLayout);

var _MarkerLayout = require('./MarkerLayout');

var _MarkerLayout2 = _interopRequireDefault(_MarkerLayout);

var _MarkerController = require('./controllers/MarkerController');

var _MarkerController2 = _interopRequireDefault(_MarkerController);

var _geoObject = require('./apiEventsLists/geoObject');

var _geoObject2 = _interopRequireDefault(_geoObject);

var _decorators = require('./utils/decorators');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MapMarker = function (_Component) {
    _inherits(MapMarker, _Component);

    function MapMarker(props) {
        _classCallCheck(this, MapMarker);

        var _this = _possibleConstructorReturn(this, (MapMarker.__proto__ || Object.getPrototypeOf(MapMarker)).call(this, props));

        _this.options = {};
        return _this;
    }

    _createClass(MapMarker, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            var _this2 = this;

            var _props = this.props,
                lat = _props.lat,
                lon = _props.lon,
                children = _props.children,
                properties = _props.properties,
                options = _props.options,
                balloonState = _props.balloonState;


            if (lat !== prevProps.lat || lon !== prevProps.lon) {
                this._controller.setPosition(this.context.coordorder === 'longlat' ? [lon, lat] : [lat, lon]);
            }

            Object.keys(properties || {}).forEach(function (propName) {
                if (!prevProps.properties || properties[propName] !== prevProps.properties[propName]) {
                    _this2._controller.setProperty(propName, properties[propName]);
                }
            });

            Object.keys(options || {}).forEach(function (optName) {
                if (!prevProps.options || options[optName] !== prevProps.options[optName]) {
                    _this2._controller.setOption(optName, options[optName]);
                }
            });

            this._controller.setBalloonState(balloonState);

            if (children != prevProps.children) {
                this._clearLayouts();
                this._setupLayouts();
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props2 = this.props,
                lat = _props2.lat,
                lon = _props2.lon,
                properties = _props2.properties,
                options = _props2.options,
                balloonState = _props2.balloonState;

            var coords = this.context.coordorder === 'longlat' ? [lon, lat] : [lat, lon];

            this._controller = new _MarkerController2.default(coords, properties, options, balloonState);

            this._setupLayouts();
            this._setupEvents();

            this.context.mapController.appendMarker(this._controller);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this._clearLayouts();
            this._controller.destroy();
        }
    }, {
        key: 'getController',
        value: function getController() {
            return this._controller ? this._controller : null;
        }
    }, {
        key: '_setupLayouts',
        value: function _setupLayouts() {
            var _this3 = this;

            _react2.default.Children.toArray(this.props.children).forEach(function (component) {
                if (component.type === _BalloonLayout2.default) {
                    _this3._setupBalloonLayout(component);
                }
                if (component.type === _MarkerLayout2.default) {
                    _this3._setupMarkerLayout(component);
                }
            });
        }
    }, {
        key: '_setupMarkerLayout',
        value: function _setupMarkerLayout(component) {
            this._markerElement = document.createElement('div');
            this._markerElement.className = 'icon-content';
            this._markerElement.style.display = 'inline-block';

            _reactDom2.default.render(component, this._markerElement);
            this._controller.setLayout('iconLayout', this._markerElement);
        }
    }, {
        key: '_setupBalloonLayout',
        value: function _setupBalloonLayout(component) {
            this._balloonElement = document.createElement('div');

            _reactDom2.default.render(component, this._balloonElement);
            this._controller.setLayout('balloonLayout', this._balloonElement);
        }
    }, {
        key: '_clearLayouts',
        value: function _clearLayouts() {
            if (this._markerElement) {
                _reactDom2.default.unmountComponentAtNode(this._markerElement);
                this._markerElement = null;
            }

            if (this._balloonElement) {
                _reactDom2.default.unmountComponentAtNode(this._balloonElement);
                this._balloonElement = null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return null;
        }
    }]);

    return MapMarker;
}(_react.Component);

MapMarker.propTypes = {
    lat: _propTypes2.default.number.isRequired,
    lon: _propTypes2.default.number.isRequired,
    properties: _propTypes2.default.object,
    options: _propTypes2.default.object,
    balloonState: _propTypes2.default.oneOf(['opened', 'closed'])
};
MapMarker.defaultProps = {
    balloonState: 'closed'
};
MapMarker.contextTypes = {
    mapController: _propTypes2.default.object,
    coordorder: _propTypes2.default.oneOf(['latlong', 'longlat'])
};
exports.default = (0, _decorators.eventsDecorator)(MapMarker, { supportEvents: _geoObject2.default });