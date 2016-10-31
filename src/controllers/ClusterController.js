import api from '../api';

class ClusterController {
    constructor (clusterOptions, mapController) {
        this._cluster = new (api.getAPI()).Clusterer(clusterOptions);
        this._mapController = mapController;
        this._setupCollection();
    }

    getAPIInstance () {
        return this._cluster;
    }

    _setupCollection () {
        this._geoCollection = new (api.getAPI()).GeoObjectCollection();
        this._mapController.appendCluster(this._cluster);
    }

    appendMarker(marker) {
        this._cluster.add(marker.getAPIInstance());
        this._mapController.map.setBounds(this._cluster.getBounds());
    }

    destroyMarker(marker) {
        this._cluster.remove(marker.getAPIInstance());
    }
}

export default ClusterController;
