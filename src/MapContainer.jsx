import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import MapElement from './MapElement';
import MapController from './controllers/MapController';
import loadApi from './utils/loaders/loadApi';
import config from './configs';

class YandexMap extends Component {
    static propTypes = {
        apiKey: PropTypes.string,
        onApiAvailable: PropTypes.func,
        zoom: PropTypes.number,
        width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        state: PropTypes.object,
        options: PropTypes.object
    }

    static defaultProps = {
        zoom: 10,
        center: [55, 45],
        width: 600,
        height: 600,
        state: {},
        options: {},
        style: {
            position: 'relative'
        }
    }

    constructor (props) {
        super(props);
    }

    _onApiLoad (namespace) {
        this._ymaps = namespace;

        this._controller = new MapController(this.ymaps);
        this._controller.createMap(
            this.refs.mapContainer,
            {
                center: this.props.center,
                zoom: this.props.zoom
            }
        );

        this.props.onApiAvailable && this.props.onApiAvailable(ymaps);
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
        loadApi()
            .then(this._onApiLoad.bind(this))
            .catch((error) => console.log('Error occured: %s', error));
    }

    render () {
        return (
            <div style={this.props.style}>
                <MapElement ref="mapContainer" />
            </div>
        );
    }
}

export default YandexMap;
