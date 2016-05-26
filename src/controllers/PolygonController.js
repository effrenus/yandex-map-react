import api from '../api';

class PolygonController {
    constructor (coordinates, properties = null, options = {}) {
        this.options = options;
        this._coordinates = coordinates;
        this._polygon = new (api.getAPI()).Polygon(coordinates, null, options);
        this.events = this._polygon.events.group();
    }

    /**
     * @return {Object} Return API object instance (https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Polygon-docpage/)
     */
    getAPIInstance () {
        return this._polygon;
    }

    setMapController (mapController) {
        this._mapController = mapController;
    }

    addToMap () {
        this._mapController.appendMarker(this);
    }
}

export default PolygonController;
