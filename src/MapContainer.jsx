import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import MapElement from './MapElement';
import MapController from './controllers/MapController';
import supportEvents from './apiEventsLists/map';
import {eventsDecorator} from './utils/decorators';
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
        coordorder: PropTypes.oneOf(['latlong', 'longlat']),
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
        mapController: PropTypes.object,
        coordorder: PropTypes.oneOf(['latlong', 'longlat'])
    }

    constructor (props) {
        super(props);
        this.state = {
            isAPILoaded: false
        };
    }

    getChildContext () {
        return {
            mapController: this._controller,
            coordorder: this.props.coordorder || 'latlong'
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
                case 'center':
                    if (this.props.center[0] !== nextProps.center[0]
                      || this.props.center[1] !== nextProps.center[1] ) {
                      this._controller.setCenter(nextProps.center);
                    }

                    break;
                case 'zoom':
                    if (this.props.zoom !== nextProps.zoom) {
                      this._controller.setZoom(nextProps.zoom);
                    }

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
            api.load(this._getAPIParams())
                .then(this._onAPILoad.bind(this))
                .catch((error) => console.log('Error occured: %s', error));
        }
    }

    render () {
        return (
            <div style={this._getStyle()}>
                <MapElement ref="mapContainer" />
                {Boolean(this.state.isAPILoaded) ? this.props.children : null}
            </div>
        );
    }

    _getAPIParams () {
        const params = {}

        if (this.props.coordorder) {
            params.coordorder = this.props.coordorder;
        }

        return params;
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
        this.setState({isAPILoaded: true});

        if (this.props.onMapAvailable) {
            this.props.onMapAvailable(this._controller.map);
        }
    }
}

export default eventsDecorator(YandexMap, {supportEvents});
