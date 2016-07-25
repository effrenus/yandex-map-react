'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.eventsDecorator = eventsDecorator;

var _eventsHandler = require('./eventsHandler');

function eventsDecorator(Component, _ref) {
    var supportEvents = _ref.supportEvents;

    Object.defineProperty(Component.prototype, '_setupEvents', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function value() {
            (0, _eventsHandler.register)(this.getController(), this.props, supportEvents);
        }
    });

    return Component;
}