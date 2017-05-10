'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ImportObjectController = require('./controllers/ImportObjectController');

var _ImportObjectController2 = _interopRequireDefault(_ImportObjectController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConstructorJSONImport = function (_Component) {
    _inherits(ConstructorJSONImport, _Component);

    function ConstructorJSONImport() {
        _classCallCheck(this, ConstructorJSONImport);

        return _possibleConstructorReturn(this, (ConstructorJSONImport.__proto__ || Object.getPrototypeOf(ConstructorJSONImport)).apply(this, arguments));
    }

    _createClass(ConstructorJSONImport, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var map = this.context.mapController.map;

            this._controller = new _ImportObjectController2.default(map, this.props.userMapData);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this._controller.destroy();
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate() {
            return false;
        }
    }, {
        key: 'render',
        value: function render() {
            return null;
        }
    }]);

    return ConstructorJSONImport;
}(_react.Component);

ConstructorJSONImport.propTypes = {
    userMapData: _propTypes2.default.object.isRequired
};
ConstructorJSONImport.contextTypes = {
    mapController: _propTypes2.default.object
};
exports.default = ConstructorJSONImport;