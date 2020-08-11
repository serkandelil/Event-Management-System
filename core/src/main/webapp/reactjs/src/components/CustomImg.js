import React from 'react';

class CustomImg extends React.Component {
    render() {
        let image_path = '';
        try {
            image_path = require('../images/' + this.props.src);
        } catch(err){
            image_path = require('../images/yte.png');  //set default image path
        }
        return (
            <img width={this.props.width} src={image_path} className={this.props.className} alt={this.props.alt} />
        );
    }
}

export default CustomImg;