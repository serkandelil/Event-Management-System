import React, {Component} from 'react';
import {Card} from "react-bootstrap";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class Location extends Component{
    style = {
        width: '94%',
        height: '200%'
    }

    constructor(props) {
        super(props);
        this.state = this.initialState;
        console.log(this.state.longitude)
    }

    initialState = {longitude:this.props.longitude,latitude:this.props.latitude};

    render(){
        return(
            <div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>Location</Card.Header>
                    <Card.Body style={this.style}>
                        <tr>Longitude is: {this.props.longitude}</tr>
                        <tr>Latitude is: {this.props.latitude}</tr>
                    </Card.Body>
                </Card>
                <Map
                    google={this.props.google}
                    style={this.style}
                    initialCenter={{
                        lat: this.state.latitude,
                        lng: this.state.longitude
                    }}
                    zoom={15}
                    onClick={this.onMapClicked}
                >
                    <Marker onClick={this.onMarkerClick}
                            name={'Current location'} />
                    <InfoWindow onClose={this.onInfoWindowClose}>

                    </InfoWindow>
                </Map>
            </div>
        );
    }
}
export default GoogleApiWrapper({
    apiKey: ("AIzaSyCA7HlKySwAYqOaVcruc6czkNW5EYYdhcU")
})(Location)