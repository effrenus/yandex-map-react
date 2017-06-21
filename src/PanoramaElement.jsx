import React, { Component } from 'react';

const style = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0
};

class PanoramaElement extends Component {
    constructor (props) {
        super(props);
    }

    shouldComponentUpdate () {
        return false;
    }

    render () {
        return (
            <div style={style}> </div>
        );
    }
}

export default PanoramaElement;

// import React, { Component, PropTypes } from 'react';
// import ReactDOM from 'react-dom';
// import PanoramaController from './controllers/PanoramaController';
// import supportEvents from './apiEventsLists/geoObject';
// import {eventsDecorator} from './utils/decorators';
//
//
// class PanoramaElement extends Component {
//     static propTypes = {
//         lat: PropTypes.number.isRequired,
//         lon: PropTypes.number.isRequired,
//     }
//
//     static defaultProps = {}
//
//     static contextTypes = {
//         mapController: PropTypes.object,
//         coordorder: PropTypes.oneOf(['latlong', 'longlat'])
//     }
//
//     constructor (props) {
//         super(props);
//         this.options = {};
//     }
//
//     componentDidMount () {
//         const {lat, lon} = this.props;
//         const coords = (this.context.coordorder === 'longlat') ? [lon, lat] : [lat, lon];
//
//         this._controller = new PanoramaController(coords, this.refs.panoramaPlayer);
//
//         if (this._controller.isSupported()) {
//             this._controller.locate();
//         } else {
//             this._controller.error ({
//                 message: 'Браузер не поддерживается плеером.'
//             });
//         }
//     }
//
//     componentWillUnmount () {
//         this._controller.destroy();
//     }
//
//     getController () {
//         return this._controller ? this._controller : null;
//     }
//
//     render () {
//         return (
//             <div ref="panoramaPlayer" style={{height: '100%'}}> </div>
//         );
//     }
// }
//
// export default eventsDecorator(PanoramaElement, {supportEvents});
