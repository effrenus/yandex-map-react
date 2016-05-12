

function toOnEventName (name) {
    return `on${name.substr(0, 1).toUpperCase()}${name.substr(1)}`;
}

/**
 * Register event callback on api instance
 * @param  {Object} controller
 * @param  {Object} props React component `props`
 * @param  {Array} eventsList Events supported in API (specific for different objects)
 */
export function register (controller, props, eventsList) {
    eventsList.forEach((eventName) => {
        const onEventName = toOnEventName(eventName);
        if (props.hasOwnProperty(onEventName)) {
            controller.events.add(eventName, props[onEventName]);
        }
    });
}
