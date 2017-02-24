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
        return this.props.children;
    }
}

export default MarkerLayout;
