import React, {Component} from 'react';
import {register as registerEvents} from './eventsHandler';

function noop () {}

export function lifecycleDecorator (Component, {supportEvents}) {
    const componentWillUnmount = Component.prototype.hasOwnProperty('componentWillUnmount') ? Component.prototype.componentWillUnmount : noop;

    Object.defineProperty(Component.prototype, '_setupEvents', {
        enumerable: false,
        configurable: true,
        writable: true,
        value() {
            registerEvents(this.getController(), this.props, supportEvents);
        }
    });

    Object.defineProperty(Component.prototype, 'componentWillUnmount', {
        enumerable: false,
        configurable: true,
        writable: true,
        value() {
            componentWillUnmount.call(this);

            this.getController().destroy();
        }
    });

    return Component;
}
