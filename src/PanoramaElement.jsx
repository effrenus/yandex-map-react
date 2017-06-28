import React, { Component } from 'react';

const style = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 0
};

class PanoramaElement extends Component {
    render () {
        if (this.props.show) {
            return (
                <div style={style}> </div>
            );
        } else {
            return null;
        }
    }
}

export default PanoramaElement;
