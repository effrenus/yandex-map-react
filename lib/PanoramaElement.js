'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _PanoramaController = require('./controllers/PanoramaController');

var _PanoramaController2 = _interopRequireDefault(_PanoramaController);

var _geoObject = require('./apiEventsLists/geoObject');

var _geoObject2 = _interopRequireDefault(_geoObject);

var _decorators = require('./utils/decorators');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PanoramaElement = function (_Component) {
    _inherits(PanoramaElement, _Component);

    function PanoramaElement(props) {
        _classCallCheck(this, PanoramaElement);

        var _this = _possibleConstructorReturn(this, (PanoramaElement.__proto__ || Object.getPrototypeOf(PanoramaElement)).call(this, props));

        _this.options = {};
        return _this;
    }

    _createClass(PanoramaElement, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props,
                lat = _props.lat,
                lon = _props.lon;

            var coords = this.context.coordorder === 'longlat' ? [lon, lat] : [lat, lon];

            this._controller = new _PanoramaController2.default(coords, this.refs.panoramaPlayer);

            if (this._controller.isSupported()) {
                this._controller.locate();
            } else {
                this._controller.error({
                    message: 'Браузер не поддерживается плеером.'
                });
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this._controller.destroy();
        }
    }, {
        key: 'getController',
        value: function getController() {
            return this._controller ? this._controller : null;
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { ref: 'panoramaPlayer', style: { height: '100%' } },
                ' '
            );
        }
    }]);

    return PanoramaElement;
}(_react.Component);

PanoramaElement.propTypes = {
    lat: _react.PropTypes.number.isRequired,
    lon: _react.PropTypes.number.isRequired
};
PanoramaElement.defaultProps = {};
PanoramaElement.contextTypes = {
    mapController: _react.PropTypes.object,
    coordorder: _react.PropTypes.oneOf(['latlong', 'longlat'])
};
exports.default = (0, _decorators.eventsDecorator)(PanoramaElement, { supportEvents: _geoObject2.default });