import React, {Component} from 'react';
import {Card, Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";
import CustomImg from "./CustomImg";

export default class Qr extends Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.showqr = false;

        this.submitEvent = this.submitEvent.bind(this);
        this.eventChange = this.eventChange.bind(this);
    }

    initialState = {imageLoadError: true,eventname:this.props.eventname,tcno:''};

    submitEvent =event=>{
        event.preventDefault();
        this.setState({"showqr":true});
        setTimeout(()=>this.setState({"showqr":false}),2000)

    }

    eventChange=event=>{
        this.setState({
                [event.target.name]:event.target.value
            }
        );
    }

    render(){
        const {tcno}=this.state;
        return(
            <div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>Reservation</Card.Header>
                    <Form onSubmit={this.submitEvent} id="eventFormId">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridEventName">
                                    <Form.Label>Event Name</Form.Label>
                                    <Form.Control required
                                                  value={this.props.eventname}
                                                  onChange={this.eventChange}
                                                  type="text" name="eventname" placeholder="event name" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridCapacity">
                                    <Form.Label>Tc Number</Form.Label>
                                    <Form.Control required
                                                  value={tcno}
                                                  onChange={this.eventChange}
                                                  type="text" name="tcno" placeholder="Tc Number" />
                                </Form.Group>
                            </Form.Row>

                        </Card.Body>
                        <Card.Footer>
                            <Button variant="primary" type="submit">
                                Show QR
                            </Button>
                            {this.state.showqr?
                                <React.Fragment>
                                    <div>
                                        <CustomImg src= {this.state.tcno+this.state.eventname+'.png'} className="container-close float-right" alt="sample Image" />
                                    </div>
                                </React.Fragment >
                                //<img src={require('../images/'+this.state.tcno+this.state.eventname+'.png')}/>
                                :<tr align="center">
                                <td colSpan={6}>There is no qr</td>
                            </tr>}
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }

    addDefaultSrc(ev){
        ev.target.src = require('../images/Lumfish.jpg');
        ev.target.onerror = null;
    }
}