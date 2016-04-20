import React, { Component, PropTypes } from 'react';

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
