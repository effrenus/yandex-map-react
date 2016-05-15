import api from '../api';
import layouts from './layouts';

/**
 * @class MarkerController
 */
class MarkerController {
    /**
     * @constructor
     * @param  {Number[]} coordinates Marker coordinate
     * @param  {Object} options
     * @param  {HTMLElement} options.markerDOM Marker layout
     */
    constructor (coordinates, options = {}) {
        this.options = options;
        this._coordinates = coordinates;
        this._marker = new (api.getAPI()).Placemark(coordinates, null, null);
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

    _setupMarkerOptions () {
        const options = {};

        return options;
    }
}

export default MarkerController;
