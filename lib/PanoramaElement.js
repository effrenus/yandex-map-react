'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var style = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0
};

var PanoramaElement = function (_Component) {
    _inherits(PanoramaElement, _Component);

    function PanoramaElement(props) {
        _classCallCheck(this, PanoramaElement);

        return _possibleConstructorReturn(this, (PanoramaElement.__proto__ || Object.getPrototypeOf(PanoramaElement)).call(this, props));
    }

    _createClass(PanoramaElement, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate() {
            return false;
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { style: style },
                ' '
            );
        }
    }]);

    return PanoramaElement;
}(_react.Component);

exports.default = PanoramaElement;

// import React, { Component, PropTypes } from 'react';
// import ReactDOM from 'react-dom';
// import PanoramaController from './controllers/PanoramaController';
// import supportEvents from './apiEventsLists/geoObject';
// import {eventsDecorator} from './utils/decorators';
//
//
// class PanoramaElement extends Component {
//     static propTypes = {
//         lat: PropTypes.number.isRequired,
//         lon: PropTypes.number.isRequired,
//     }
//
//     static defaultProps = {}
//
//     static contextTypes = {
//         mapController: PropTypes.object,
//         coordorder: PropTypes.oneOf(['latlong', 'longlat'])
//     }
//
//     constructor (props) {
//         super(props);
//         this.options = {};
//     }
//
//     componentDidMount () {
//         const {lat, lon} = this.props;
//         const coords = (this.context.coordorder === 'longlat') ? [lon, lat] : [lat, lon];
//
//         this._controller = new PanoramaController(coords, this.refs.panoramaPlayer);
//
//         if (this._controller.isSupported()) {
//             this._controller.locate();
//         } else {
//             this._controller.error ({
//                 message: 'Браузер не поддерживается плеером.'
//             });
//         }
//     }
//
//     componentWillUnmount () {
//         this._controller.destroy();
//     }
//
//     getController () {
//         return this._controller ? this._controller : null;
//     }
//
//     render () {
//         return (
//             <div ref="panoramaPlayer" style={{height: '100%'}}> </div>
//         );
//     }
// }
//
// export default eventsDecorator(PanoramaElement, {supportEvents});