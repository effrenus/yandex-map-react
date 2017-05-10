import PropTypes from 'prop-types';
import React, { Component } from 'react';

class BalloonLayout extends Component {
    render () {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default BalloonLayout;
