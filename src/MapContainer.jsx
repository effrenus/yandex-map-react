import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import MapElement from './MapElement';
import MapController from './controllers/MapController';
import supportEvents from './apiEventsLists/map';
import {lifecycleDecorator} from './utils/decorators';
import config from './configs';
import api from './api';

class YandexMap extends Component {
    static propTypes = {
        apiKey: PropTypes.string,
        onAPIAvailable: PropTypes.func,
        width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        zoom: PropTypes.number,
        state: PropTypes.object,
        options: PropTypes.object
    }

    static defaultProps = {
        zoom: 10,
        center: [55, 45],
        width: 600,
        height: 600,
        state: {
            controls: []
        },
        options: {},
        style: {
            position: 'relative'
        }
    }

    static childContextTypes = {
        mapController: PropTypes.object
    }

    constructor (props) {
        super(props);
    }

    getChildContext () {
        return {
            mapController: this._controller
        };
    }

    getController () {
        return this._controller ? this._controller : null;
    }

    componentWillReceiveProps (nextProps) {
        Object.keys(nextProps).forEach(key => {
            switch (key) {
                case 'controls':
                    this._controller.setState(key, nextProps[key]);
                    break;
                default:
                    break;
            }
        });
    }

    componentDidMount () {
        if (api.isAvailible()) {
            this._onAPILoad(api.getAPI());
        } else {
            api.load()
                .then(this._onAPILoad.bind(this))
                .catch((error) => console.log('Error occured: %s', error));
        }
    }

    render () {
        return (
            <div style={this._getStyle()}>
                <MapElement ref="mapContainer" />
            </div>
        );
    }

    _getStyle () {
        return {
            ...this.props.style,
            width: typeof this.props.width == 'string' ? this.props.width : `${this.props.width}px`,
            height: typeof this.props.height == 'string' ? this.props.height : `${this.props.height}px`
        };
    }

    _onAPILoad (namespace) {
        this.props.onAPIAvailable && this.props.onAPIAvailable(namespace);

        this._controller = new MapController();
        this._controller.createMap(
            ReactDOM.findDOMNode(this.refs.mapContainer),
            {
                ...this.props.state,
                center: this.props.center,
                zoom: this.props.zoom
            },
            {...this.props.options}
        );

        this._setupEvents();
        this._setupMarkers();
    }

    _setupMarkers () {
        React.Children
            .toArray(this.props.children)
            .filter(component => component.type && component.type.name == 'MapMarker')
            .forEach(component => {
                const clonedComponent = React.cloneElement(component, {mapController: this._controller});
                ReactDOM.render(clonedComponent, document.createElement('div'));
            });
    }
}

export default lifecycleDecorator(YandexMap, {supportEvents});
