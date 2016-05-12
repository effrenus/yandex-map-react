import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import MarkerController from './controllers/MarkerController';
import supportEvents from './apiEventsLists/geoObject';
import {lifecycleDecorator} from './utils/decorators';

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

    componentDidUpdate () {
        this.props.controller.updateLayout();
    }

    componentDidMount () {
        const {lat, lon} = this.props;

        this._setupOptions();
        this._controller = new MarkerController([lat, lon], this.options);
        this.props.mapController.appendMarker(this._controller);
        this._setupEvents();
    }

    getController () {
        return this._controller ? this._controller : null;
    }

    _setupOptions () {
        React.Children
            .toArray(this.props.children)
            .forEach(component => {
                let container;
                switch (component.type.name) {
                    case 'MarkerLayout':
                        container = this._createMarkerContainer()
                        this._markerLayoutInstance = ReactDOM.render(component, container);
                        this.options.iconComponent = container;
                        break;
                    case 'BalloonLayout':
                        container = document.createElement('div');
                        ReactDOM.render(component, container);
                        this.options.balloonComponent = container;
                        break;
                    default:
                        break;
                }
            });
    }

    _createMarkerContainer () {
        const node = document.createElement('div');

        node.className = 'icon-content';
        node.style.display = 'inline-block';

        return node;
    }

    render () {
        return null;
    }
}

export default lifecycleDecorator(MapMarker, {supportEvents});
