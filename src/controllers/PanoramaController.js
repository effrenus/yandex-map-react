import api from '../api';


class PanoramaController {
    constructor (coordinates, container) {
        this._coordinates = coordinates;
        this._container = container;
        this._panorama = api.getAPI().panorama;
    }

    locate () {
        this._panorama.locate(this._coordinates).done(
            (panoramas) => this.show(panoramas),
            (error) => this.error(error)
        );
    }

    show (panoramas) {
        if (panoramas.length > 0) {
            new this._panorama.Player(
                this._container,
                panoramas[0]
            );
        }
    }

    error (error) {
        console.error(error.message);
    }

    isSupported () {
        return this._panorama.isSupported();
    }

    destroy () {
        this._panorama = null;
    }
}

export default PanoramaController;
