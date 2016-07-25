'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _api = require('../api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function detectImagesLoaded(element) {
    var images = Array.from(element.querySelectorAll('img') || []);

    if (images.length === 0) {
        return Promise.resolve();
    }

    return Promise.all(images.map(function (image) {
        return new Promise(function (resolve) {
            if (image.complete) {
                resolve();
                return;
            }
            image.onload = image.onerror = resolve;
        });
    }));
}

function createLayout(_ref) {
    var domElement = _ref.domElement;
    var _ref$extendMethods = _ref.extendMethods;
    var extendMethods = _ref$extendMethods === undefined ? {} : _ref$extendMethods;

    var LayoutClass = _api2.default.getAPI().templateLayoutFactory.createClass('<i></i>', Object.assign({
        build: function build() {
            LayoutClass.superclass.build.call(this);

            this.options = this.getData().options;

            this._setupContent(domElement);
            this._updateSize();

            detectImagesLoaded(this.getElement()).then(this._updateMarkerShape.bind(this));
        },

        getShape: function getShape() {
            return new (_api2.default.getAPI().shape.Rectangle)(new (_api2.default.getAPI().geometry.pixel.Rectangle)([[0, 0], [this._size[0], this._size[1]]]));
        },

        _updateMarkerShape: function _updateMarkerShape() {
            this._updateSize();
            this.events.fire('shapechange');
        },

        _setupContent: function _setupContent(domElement) {
            var element = this.getElement();
            element.appendChild(domElement);
        },

        _updateSize: function _updateSize() {
            this._size = this._getSize();
        },

        _getSize: function _getSize() {
            var element = this.getElement().querySelector('.icon-content');
            return [element.offsetWidth, element.offsetHeight];
        }
    }, extendMethods));

    return LayoutClass;
}

exports.default = {
    createIconLayoutClass: function createIconLayoutClass(domElement) {
        return createLayout({
            domElement: domElement,
            extendMethods: {
                _updateSize: function _updateSize() {
                    var _this = this;

                    var geoObject = void 0;
                    var oldSize = this._size;

                    this._size = this._getSize();

                    // Update layout offset.
                    if (!oldSize || oldSize[0] !== this._size[0] || oldSize[1] !== this._size[1]) {
                        geoObject = this.getData().geoObject;

                        if (geoObject.getOverlaySync()) {
                            geoObject.options.set('iconOffset', [-this._size[0] / 2, -this._size[1]]);
                        } else {
                            geoObject.getOverlay().then(function () {
                                geoObject.options.set('iconOffset', [-_this._size[0] / 2, -_this._size[1]]);
                            });
                        }
                    }
                }
            }
        });
    },

    createBalloonLayoutClass: function createBalloonLayoutClass(domElement) {
        return createLayout({ domElement: domElement });
    }
};