import api from '../api';

class MapController {
    constructor () {

    }

    createMap (container, state, options) {
        this._map = new (api.getAPI()).Map(container, state, options);
        this.events = this._map.events.group();

        this._setupCollection();

        return this;
    }

    appendMarker (marker) {
        this._geoCollection.add(marker.getAPIInstance());
    }

    get map () {
        return this._map;
    }

    setOptions (name, value) {
        this._map.options.set(name, value);
    }

    setCenter (coords) {
        this._map.setCenter(coords);
    }

    setZoom (zoom) {
        this._map.setZoom(zoom);
    }

    setState (name, value) {
        this._map.state.set(name, value);
    }

    destroy () {
        this.events.removeAll();
        this._map.destroy();
    }

    _setupCollection () {
        this._geoCollection = new (api.getAPI()).GeoObjectCollection();
        this._map.geoObjects.add(this._geoCollection);
    }
}

export default MapController;
