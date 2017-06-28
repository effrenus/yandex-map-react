import api from '../api';

class PanoramaController {
    constructor (func) {
        this._isPanoramas = func;
    }

    createPanorama (container, state, options) {

        this._container = container;
        this._coordinates = state.center;
        this._options = options;
        this._panorama = api.getAPI().panorama;

        return this;
    }

    locate (showService) {

        if (this.isSupported()) {
            this._panorama.locate(this._coordinates).done(
                (panoramas) => {

                    this._isPanoramas(Boolean(panoramas.length));

                    if (showService) {
                        this.show(panoramas);
                    }
                },
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
            const player = new this._panorama.Player(
                this._container,
                panoramas[0],
                this._options
            );

            player.events.add('destroy', this.destroy.bind(this));
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

        if (this._options.parentFunct) {
            this._options.parentFunct();
        }
    }
}

export default PanoramaController;
