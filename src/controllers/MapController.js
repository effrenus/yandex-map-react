import api from '../api';

class MapController {
    constructor () {
        this._markerCollection = [];
    }

    createMap (container, state, options) {
        this._map = new (api.getAPI()).Map(container, state, options);

        return this;
    }

    appendMarker (marker) {
        this._markerCollection.push(marker);
        this._map.geoObjects.add(marker.getAPIInstance());
    }

    get map () {
        return this._map;
    }

    setOptions (name, value) {
        //
    }

    setState (name, value) {
        this._map.state.set(name, value);
    }
}

export default MapController;
