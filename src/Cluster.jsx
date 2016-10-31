import React, {Component, PropTypes} from 'react';
import ClusterController from './controllers/ClusterController';

class Cluster extends Component {

    static defaultProps = {
        options: {},
    }

    static propTypes = {
        options: PropTypes.object,
    }

    static contextTypes = {
        mapController: PropTypes.object,
    }

    static childContextTypes = {
        cluster: PropTypes.bool,
        clusterController: PropTypes.object,
    }

    constructor (props, context) {
        super(props);
        const {options} = props;
        this._controller = new ClusterController(options, context.mapController);
    }

    getChildContext () {
        return {
            cluster: true,
            clusterController: this._controller,
        };
    }

    componentWillUnmount () {
        this._controller.destroy();
    }

    render () {
        return <div>{this.props.children}</div>;
    }
}

export default Cluster;
