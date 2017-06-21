import api from '../api';


class PanoramaController {
    constructor () {

    }

    createPanorama (container, state, options) {

        this._container = container;
        this._coordinates = state.center;
        this._options = options;
        this._panorama = api.getAPI().panorama;

        return this;
    }

    locate () {

        if (this.isSupported()) {
            this._panorama.locate(this._coordinates).done(
                (panoramas) => this.show(panoramas),
                (error) => this.error(error)
            );
        } else {
            this.error ({
                message: 'Браузер не поддерживается плеером.'
            });
        }
    }

    show (panoramas) {
        if (panoramas.length > 0) {
            new this._panorama.Player(
                this._container,
                panoramas[0],
                this._options
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
