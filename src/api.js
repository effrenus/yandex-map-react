import loadApi from './utils/loaders/loadApi';

class Api {
    constructor () {
        this.api = null;
    }

    setAPI (instance) {
        this.api = instance;
        return api;
    }

    getAPI () {
        return this.api;
    }

    isAvailible () {
        return !!this.api;
    }

    /**
     * Loading API
     * @return {Promise}
     */
    load () {
        return loadApi().then((instance) => {
                this.api = instance;
                return instance;
            });
    }
}

export default new Api();
