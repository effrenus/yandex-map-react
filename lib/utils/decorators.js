'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.lifecycleDecorator = lifecycleDecorator;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _eventsHandler = require('./eventsHandler');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function noop() {}

function lifecycleDecorator(Component, _ref) {
    var supportEvents = _ref.supportEvents;

    var componentDidMount = Component.prototype.hasOwnProperty('componentDidMount') ? Component.prototype.componentDidMount : noop;
    var componentWillUnmount = Component.prototype.hasOwnProperty('componentWillUnmount') ? Component.prototype.componentWillUnmount : noop;

    Object.defineProperty(Component.prototype, '_setupEvents', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function value() {
            (0, _eventsHandler.register)(this.getController(), this.props, supportEvents);
        }
    });

    Object.defineProperty(Component.prototype, 'componentWillUnmount', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function value() {
            componentWillUnmount.call(this);

            this.getController().destroy();
        }
    });

    return Component;
}