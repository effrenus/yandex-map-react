import api from '../api';
import layouts from './layouts';

/**
 * @class MarkerController
 */
class MarkerController {
    /**
     * @constructor
     * @param  {Number[]} coordinates Marker coordinate
     * @param  {Object} properties
     * @param  {Object} options
     * @param  {HTMLElement} options.markerDOM Marker layout
     */
    constructor (coordinates, properties = {}, options = {}) {
        this.options = options;
        this.properties = properties;
        this._coordinates = coordinates;
        this._marker = new (api.getAPI()).Placemark(coordinates, null, null);
        this._setupMarkerProperties();
        this._setupMarkerOptions();
        this.events = this._marker.events.group();
    }

    /**
     * @return {Object} Return marker instance (specific for MAPAPI)
     */
    getAPIInstance () {
        return this._marker;
    }

    /**
     * @return {Number[]} Marker coordinates
     */
    getCoordinates () {
        return this._coordinates;
    }

    setPosition (coordinates) {
        this._marker.geometry.setCoordinates(coordinates);
    }

    setProperty (propName, value) {
        this._marker.properties.set(propName, value);
    }

    setOption (optName, value) {
        this._marker.options.set(optName, value);
    }

    /**
     *
     * @param {String} name
     * @param {HTMLElement} element
     */
    setLayout (name, element) {
        let layout;

        if (name === 'iconLayout') {
            layout = layouts.createIconLayoutClass(element);
        } else if (name === 'balloonLayout') {
            layout = layouts.createBalloonLayoutClass(element);
        }

        this._marker.options.set(name, layout);
    }

    /**
     * Destroy marker
     */
    destroy () {
        this.events.removeAll();
        this._marker.setParent(null);
        this._marker = null;
    }

    _setupMarkerProperties () {
        const {properties} = this;
        Object.keys(properties).forEach(propName => {
            this.setProperty(propName, properties[propName]);
        });
    }

    _setupMarkerOptions () {
        const {options} = this;
        Object.keys(options).forEach(optName => {
            this.setOption(optName, options[optName]);
        });
    }
}

export default MarkerController;
