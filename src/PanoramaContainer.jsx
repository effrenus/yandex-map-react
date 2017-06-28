import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PanoramaElement from './PanoramaElement';
import PanoramaController from './controllers/PanoramaController';
import supportEvents from './apiEventsLists/map';
import {eventsDecorator} from './utils/decorators';
import api from './api';

class YandexPanorama extends Component {
    static propTypes = {
        apiKey: PropTypes.string,
        onAPIAvailable: PropTypes.func,
        width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        zoom: PropTypes.number,
        state: PropTypes.object,
        options: PropTypes.object,
        loadOptions: PropTypes.object,
        bounds: PropTypes.array
    }

    static defaultProps = {
        zoom: 10,
        center: [55, 45],
        width: 600,
        height: 600,
        bounds: undefined,
        state: {
            controls: []
        },
        options: {},
        loadOptions: {},
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
            isAPILoaded: false,
            showService: false,
            isPanoramas: false
        };
    }

    getChildContext () {
        return {
            mapController: this._controller,
            coordorder: this.props.loadOptions.coordorder || 'latlong'
        };
    }

    getController () {
        return this._controller ? this._controller : null;
    }

    componentWillReceiveProps (nextProps) {
        this._controller && Object.keys(nextProps).forEach(key => {
            switch (key) {
                case 'showService':
                    if (this.state.showService !== nextProps.showService) {
                        this.setState({
                            showService: nextProps.showService
                        }, () => this.state.showService && this.init());
                    }
                    break;
                default:
                    break;
            }
        });
    }

    componentDidMount () {
        this.init();
    }

    init () {
        if (api.isAvailible()) {
            this._onAPILoad(api.getAPI());
        } else {
            api.load(this.props.loadOptions)
                .then(this._onAPILoad.bind(this))
                .catch((error) => console.log('Error occured: %s', error));
        }
    }

    isPanoramas = (isPanoramas) => {
        this.setState({
            isPanoramas
        })
    }

    render () {

        let style = {};
        if (this.state.showService) {
            style = this._getStyle();
        }

        return (
            <div>
                <div style={style}>
                    <PanoramaElement ref="panoramaPlayer" show={this.state.showService}/>
                </div>

                {
                    !this.state.showService && this.state.isPanoramas && this.props.children
                }
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

        this._controller = new PanoramaController(this.isPanoramas);
        this._controller.createPanorama(
            ReactDOM.findDOMNode(this.refs.panoramaPlayer),
            {
                ...this.props.state,
                center: this.props.center,
                zoom: this.props.zoom,
                bounds: this.props.bounds
            },
            {...this.props.options}
        );

        this.setState({isAPILoaded: true}, () => this._controller.locate(this.state.showService));
   }
}

export default eventsDecorator(YandexPanorama, {supportEvents});
