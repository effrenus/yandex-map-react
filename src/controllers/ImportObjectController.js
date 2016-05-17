import api from '../api';

class ImportObjectController {
    constructor (map, data) {
        this._map = map;
        this._data = data;

        this._setupPresets();
        this._setupGeoObjects();
    }

    destroy () {
        this._clearPresets();
        this._geoObject.removeFromMap(this._map);
        this._geoObject = null;
        this._map = null;
    }

    _setupGeoObjects () {
        const {geoObjects} = this._data;
        const ymaps = api.getAPI();

        if (!geoObjects) {
            return;
        }

        this._geoObject = ymaps.geoQuery(this._prepare(geoObjects)).addToMap(this._map);
    }

    _prepare (collection) {
        const updatedCollection = {...collection};

        updatedCollection.features.forEach((feature) => {
            const props = feature.properties;
            if (!props) {
                return feature;
            }
            if (props.name) {
                props.balloonContentHeader = props.name;
            }
            if (props.description) {
                props.balloonContentBody = props.description;
            }
        });

        return updatedCollection;
    }

    _setupPresets () {
        const {presetStorage} = this._data;
        const ymaps = api.getAPI();

        if (!presetStorage) {
            return;
        }

        this._presetKeys = Object.keys(presetStorage);
        this._presetKeys.forEach((key) => {
            ymaps.option.presetStorage.add(key, presetStorage[key]);
        });
    }

    _clearPresets () {
        const ymaps = api.getAPI();
        this._presetKeys.forEach((key) => {
            ymaps.option.presetStorage.remove(key);
        });
    }
}

export default ImportObjectController;
