
class MapController {
    constructor (ns) {
        this._ns = ns;
    }

    createMap (container, options) {
        this._map = new ymaps.Map(container, options);

        return this;
    }

    setOptions (name, value) {
        //
    }

    setState (name, value) {
        this._map.state.set(name, value);
    }
}

export default MapController;
