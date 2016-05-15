import {register as registerEvents} from './eventsHandler';

export function eventsDecorator (Component, {supportEvents}) {
    Object.defineProperty(Component.prototype, '_setupEvents', {
        enumerable: false,
        configurable: true,
        writable: true,
        value() {
            registerEvents(this.getController(), this.props, supportEvents);
        }
    });

    return Component;
}
