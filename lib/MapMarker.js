'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

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

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MapMarker).call(this, props));

        _this.options = {};
        return _this;
    }

    _createClass(MapMarker, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            var _props = this.props;
            var lat = _props.lat;
            var lon = _props.lon;
            var children = _props.children;

            if (lat !== prevProps.lat || lon !== prevProps.lon) {
                this._controller.setPosition([lat, lon]);
            }

            if (children != prevProps.children) {
                this._clearLayouts();
                this._setupLayouts();
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props2 = this.props;
            var lat = _props2.lat;
            var lon = _props2.lon;


            this._controller = new _MarkerController2.default([lat, lon]);
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
            var _this2 = this;

            _react2.default.Children.toArray(this.props.children).forEach(function (component) {
                switch (component.type.name) {
                    case 'MarkerLayout':
                        _this2._setupMarkerLayout(component);
                        break;
                    case 'BalloonLayout':
                        _this2._setupBalloonLayout(component);
                        break;
                    default:
                        break;
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
    lat: _react.PropTypes.number.isRequired,
    lon: _react.PropTypes.number.isRequired
};
MapMarker.contextTypes = {
    mapController: _react.PropTypes.object
};
exports.default = (0, _decorators.eventsDecorator)(MapMarker, { supportEvents: _geoObject2.default });