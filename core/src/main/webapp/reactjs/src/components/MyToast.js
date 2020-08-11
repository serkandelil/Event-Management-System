import React, {Component} from 'react';
import {Toast} from "react-bootstrap";

export  default class MyToast extends Component{

    render() {
        const toastCss ={
            position:"fixed",
            top: "10px",
            right:"10px",
            zIndex:"1"

    };
        return(
            <div style={this.props.children.show ? toastCss: null}>
                {this.props.children.type==="success" ?
                    <Toast className={"border border-success bg-success text-white"} show={this.props.children.show}>
                        <Toast.Header className={"bg-success text-white"} closeButton={false}>
                            <strong className="mr-auto">Success</strong>
                        </Toast.Header>
                        <Toast.Body>
                            {this.props.children.message}
                        </Toast.Body>

                    </Toast>
                    :
                    <Toast className={"border border-danger bg-danger text-white"} show={this.props.children.show}>
                        <Toast.Header className={"bg-danger text-white"} closeButton={false}>
                            <strong className="mr-auto">Fail</strong>
                        </Toast.Header>
                        <Toast.Body>
                            {this.props.children.message}
                        </Toast.Body>
                    </Toast>

                }
            </div>
        );
    }
}