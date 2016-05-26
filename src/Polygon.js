import React, { Component, PropTypes } from 'react';
import PolygonController from './controllers/PolygonController';

const apiOptions = {
    cursor: PropTypes.string,
    draggable: PropTypes.bool,
    fill: PropTypes.bool,
    fillColor: PropTypes.string,
    fillImageHref: PropTypes.string,
    fillMethod: PropTypes.string,
    fillOpacity: PropTypes.number,
    hasBalloon: PropTypes.bool,
    hasHint: PropTypes.bool,
    interactiveZIndex: PropTypes.bool,
    interactivityModel: PropTypes.string,
    opacity: PropTypes.number,
    openBalloonOnClick: PropTypes.bool,
    openEmptyBalloon: PropTypes.bool,
    openEmptyHint: PropTypes.bool,
    openHintOnHover: PropTypes.bool,
    outline: PropTypes.bool,
    pane: PropTypes.string,
    strokeColor: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    strokeOpacity: PropTypes.number,
    strokeStyle: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    strokeWidth: PropTypes.number,
    syncOverlayInit: PropTypes.bool,
    useMapMarginInDragging: PropTypes.bool,
    visible: PropTypes.bool,
    zIndex: PropTypes.number,
    zIndexActive: PropTypes.number,
    zIndexDrag: PropTypes.number,
    zIndexHover: PropTypes.number
};

class Polygon extends Component {
    static propTypes = Object.assign({
        coordinates: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired
    }, apiOptions);

    static contextTypes = {
        mapController: PropTypes.object
    }

    componentDidMount () {
        const controller = this._controller = new PolygonController(this.props.coordinates, null, this._getOptions());
        controller.setMapController(this.context.mapController);
        controller.addToMap();
    }

    _getOptions () {
        const opts = {};
        Object.keys(apiOptions).forEach((key) => {
            if (this.props[key]) {
                opts[key] = this.props[key];
            }
        });

        return opts;
    }

    render () {
        return null;
    }
}

export default Polygon;
