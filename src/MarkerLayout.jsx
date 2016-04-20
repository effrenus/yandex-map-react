import React, { Component, PropTypes } from 'react';
import { types } from './constants';

/**
 * @class MarkerLayout
 */
class MarkerLayout extends Component {
    static propTypes = {
        marker: PropTypes.object
    }

    componentWillUnmount () {
        if (this._marker) {
            this._marker.destroy();
        }
    }

    render () {
        return <div>{this.props.children}</div>;
    }
}

export default MarkerLayout;
