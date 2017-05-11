'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @class MarkerLayout
 */
var MarkerLayout = function (_Component) {
    _inherits(MarkerLayout, _Component);

    function MarkerLayout() {
        _classCallCheck(this, MarkerLayout);

        return _possibleConstructorReturn(this, (MarkerLayout.__proto__ || Object.getPrototypeOf(MarkerLayout)).apply(this, arguments));
    }

    _createClass(MarkerLayout, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this._marker) {
                this._marker.destroy();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return this.props.children;
        }
    }]);

    return MarkerLayout;
}(_react.Component);

MarkerLayout.propTypes = {
    marker: _propTypes2.default.object
};
exports.default = MarkerLayout;