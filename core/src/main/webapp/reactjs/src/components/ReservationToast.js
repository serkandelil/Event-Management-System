import React, {Component} from 'react';
import {Toast} from "react-bootstrap";

export  default class ReservationToast extends Component{

    render() {
        const toastCss ={
            position:"fixed",
            top: "10px",
            right:"10px",
            zIndex:"1"

        };
        return(
            <div style={this.props.children.show ? toastCss: null}>
                <Toast className={"border border-success bg-success text-white"} show={this.props.children.show}>
                    <Toast.Header className={"bg-success text-white"} closeButton={true}>
                        <strong className="mr-auto">Success</strong>
                    </Toast.Header>
                    <Toast.Body>
                        {this.props.children.message}
                        <img src={require('../MyQRCode.png')}/>
                    </Toast.Body>

                </Toast>

            </div>
        );
    }
}