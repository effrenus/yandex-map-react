import api from '../api';

class MapController {
    constructor () {

    }

    createMap (container, state, options, cluster, clusterOptions) {
        this._map = new (api.getAPI()).Map(container, state, options);
        this._clusterEnabled = cluster;
        if (this._clusterEnabled) {
            this._cluster = new (api.getAPI()).Clusterer(clusterOptions);
        }
        this.events = this._map.events.group();
        this._setupCollection();
        return this;
    }

    appendMarker (marker) {
        if (this._clusterEnabled) {
            this._cluster.add(marker.getAPIInstance());
            this._map.setBounds(this._cluster.getBounds());
        } else {
            this._geoCollection.add(marker.getAPIInstance());
            this._map.setBounds(this._geoCollection.getBounds());
        }
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
        if (this._clusterEnabled) {
            this._map.geoObjects.add(this._cluster);
        } else {
            this._map.geoObjects.add(this._geoCollection);
        }
    }
}

export default MapController;
