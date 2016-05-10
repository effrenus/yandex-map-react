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
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.context.mapController.removeMarker(marker);
            this._marker.destroy();
            this._marker = null;
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.props.controller.updateLayout();
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props;
            var lat = _props.lat;
            var lon = _props.lon;


            this._setupOptions();
            this._marker = new _MarkerController2.default([lat, lon], this.options);
            this.props.mapController.appendMarker(this._marker);
        }
    }, {
        key: 'setController',
        value: function setController(controller) {
            this._mapController = controller;
        }
    }, {
        key: '_setupOptions',
        value: function _setupOptions() {
            var _this2 = this;

            _react2.default.Children.toArray(this.props.children).forEach(function (component) {
                var container = void 0;
                switch (component.type.name) {
                    case 'MarkerLayout':
                        container = _this2._createMarkerContainer();
                        _this2._markerLayoutInstance = _reactDom2.default.render(component, container);
                        _this2.options.iconComponent = container;
                        break;
                    case 'BalloonLayout':
                        container = document.createElement('div');
                        _reactDom2.default.render(component, container);
                        _this2.options.balloonComponent = container;
                        break;
                    default:
                        break;
                }
            });
        }
    }, {
        key: '_createMarkerContainer',
        value: function _createMarkerContainer() {
            var node = document.createElement('div');

            node.className = 'icon-content';
            node.style.display = 'inline-block';

            return node;
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
exports.default = MapMarker;