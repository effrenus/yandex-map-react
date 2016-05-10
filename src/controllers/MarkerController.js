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
        this._marker = new (api.getAPI()).Placemark(coordinates, null, this._setupMarkerOptions());
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

    /**
     * Destroy marker
     */
    destroy () {
        this._marker.destroy();
    }

    _setupMarkerOptions () {
        const options = {};
        Object.keys(this.options).forEach(key => {
            switch (key) {
                case 'iconComponent':
                    options.iconLayout = layouts.createIconLayoutClass(this.options.iconComponent);
                    break;
                case 'balloonComponent':
                    options.balloonLayout = layouts.createBalloonLayoutClass(this.options.balloonComponent);
                    break;
                default:
                    break;
            }
        });

        return options;
    }
}

export default MarkerController;
