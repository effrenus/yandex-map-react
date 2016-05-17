import React, {Component, PropTypes} from 'react';
import ImportObjectController from './controllers/ImportObjectController';

class ConstructorJSONImport extends Component {
    static propTypes = {
        userMapData: PropTypes.object.isRequired
    }

    static contextTypes = {
        mapController: PropTypes.object
    }

    componentDidMount () {
        const {map} = this.context.mapController;
        this._controller = new ImportObjectController(map, this.props.userMapData);
    }

    componentWillUnmount () {
        this._controller.destroy();
    }

    shouldComponentUpdate () {
        return false;
    }

    render () {
        return null;
    }
}

export default ConstructorJSONImport;
