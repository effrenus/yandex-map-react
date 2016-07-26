import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import MarkerController from './controllers/MarkerController';
import supportEvents from './apiEventsLists/geoObject';
import {eventsDecorator} from './utils/decorators';

class MapMarker extends Component {
    static propTypes = {
        lat: PropTypes.number.isRequired,
        lon: PropTypes.number.isRequired,
    }

    static contextTypes = {
        mapController: PropTypes.object
    }

    constructor (props) {
        super(props);
        this.options = {};
    }

    componentDidUpdate (prevProps) {
        const {lat, lon, children} = this.props;
        if (lat !== prevProps.lat || lon !== prevProps.lon) {
            this._controller.setPosition([lat, lon]);
        }

        if (children != prevProps.children) {
            this._clearLayouts();
            this._setupLayouts();
        }
    }

    componentDidMount () {
        const {lat, lon, properties} = this.props;

        this._controller = new MarkerController([lat, lon], properties);
        this._setupLayouts();
        this._setupEvents();

        this.context.mapController.appendMarker(this._controller);
    }

    componentWillUnmount () {
        this._clearLayouts();
        this._controller.destroy();
    }

    getController () {
        return this._controller ? this._controller : null;
    }

    _setupLayouts () {
        React.Children
            .toArray(this.props.children)
            .forEach(component => {
                switch (component.type.name) {
                    case 'MarkerLayout':
                        this._setupMarkerLayout(component);
                        break;
                    case 'BalloonLayout':
                        this._setupBalloonLayout(component);
                        break;
                    default:
                        break;
                }
            });
    }

    _setupMarkerLayout (component) {
        this._markerElement = document.createElement('div');
        this._markerElement.className = 'icon-content';
        this._markerElement.style.display = 'inline-block';

        ReactDOM.render(component, this._markerElement);
        this._controller.setLayout('iconLayout', this._markerElement);
    }

    _setupBalloonLayout (component) {
        this._balloonElement = document.createElement('div');

        ReactDOM.render(component, this._balloonElement);
        this._controller.setLayout('balloonLayout', this._balloonElement);
    }

    _clearLayouts () {
        if (this._markerElement) {
            ReactDOM.unmountComponentAtNode(this._markerElement);
            this._markerElement = null;
        }

        if (this._balloonElement) {
            ReactDOM.unmountComponentAtNode(this._balloonElement);
            this._balloonElement = null;
        }
    }

    render () {
        return null;
    }
}

export default eventsDecorator(MapMarker, {supportEvents});
