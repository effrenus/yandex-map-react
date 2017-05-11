import api from '../api';

function detectImagesLoaded (element) {
    const images = Array.from(element.querySelectorAll('img') || []);

    if (images.length === 0) {
        return Promise.resolve();
    }

    return Promise.all(images.map((image) => {
        return new Promise((resolve) => {
            if (image.complete) {
                resolve();
                return;
            }
            image.onload = image.onerror = resolve;
        });
    }));
}

function createLayout ({domElement, extendMethods = {}}) {
    const LayoutClass = (api.getAPI()).templateLayoutFactory.createClass(domElement.innerHTML, Object.assign({
        build: function () {
            LayoutClass.superclass.build.call(this);

            this.options = this.getData().options;

            this._updateSize();

            detectImagesLoaded(this.getElement()).then(this._updateMarkerShape.bind(this));
        },

        getShape: function () {
            return new (api.getAPI()).shape.Rectangle(
                new (api.getAPI()).geometry.pixel.Rectangle(
                    [
                        [0, 0],
                        [this._size[0], this._size[1]]
                    ]
                )
            );
        },

        _updateMarkerShape: function () {
            this._updateSize();
            this.events.fire('shapechange');
        },

        _updateSize: function () {
            this._size = this._getSize();
        },

        _getSize: function () {
            const element = this.getElement().firstChild;

            return [element.offsetWidth, element.offsetHeight];
        }
    }, extendMethods));

    return LayoutClass;
}

export default {
    createIconLayoutClass: function (domElement) {
        return createLayout({
            domElement,
            extendMethods: {
                _updateSize: function () {
                    let geoObject;
                    const oldSize = this._size;

                    this._size = this._getSize();

                    // Update layout offset.
                    if (!oldSize || (oldSize[0] !== this._size[0] || oldSize[1] !== this._size[1])) {
                        geoObject = this.getData().geoObject;

                        if (geoObject.getOverlaySync()) {
                            geoObject.options.set('iconOffset', [-this._size[0] / 2, -this._size[1]]);
                        } else {
                            geoObject.getOverlay().then(() => {
                                geoObject.options.set('iconOffset', [-this._size[0] / 2, -this._size[1]]);
                            });
                        }
                    }
                }
            }
        });
    },

    createBalloonLayoutClass: function (domElement) {
        return createLayout({domElement});
    }
};
