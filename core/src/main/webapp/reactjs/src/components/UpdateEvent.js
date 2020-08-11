import React, {Component} from 'react';
import {Card, Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Toast from "./MyToast";

export default class UpdateEvent extends Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.submitEvent = this.submitEvent.bind(this);
        this.eventChange = this.eventChange.bind(this);
    }

    initialState = {message:"",type:"",eventname:this.props.eventname,capacity:'',latitude:'',longitude:'',startdate:'',enddate:''};

    submitEvent =event=>{
        event.preventDefault();
        const updatedEvent = {
            eventname:this.state.eventname,
            capacity:this.state.capacity,
            latitude:this.state.latitude,
            longitude:this.state.longitude,
            startdate:this.state.startdate,
            enddate:this.state.enddate
        };
        axios.put("http://localhost:8080/admin/"+updatedEvent.eventname,updatedEvent)
            .then(response=>{
                if(response.data!=null){
                    this.setState({"show":true,message:"Event is updated successfully.",type:"success"});
                    setTimeout(()=>this.setState({"show":false}),2000)
                }else{
                    this.setState({"show":false});
                }
            }).catch(response=>{ this.setState({"show":true,message:"Event is not updated successfully.",type:"danger"});
            setTimeout(()=>this.setState({"show":false}),2000) });

        this.setState(this.initialState);
    }

    eventChange=event=>{
        this.setState({
                [event.target.name]:event.target.value
            }
        );
    }

    render(){
        const {eventname,capacity,latitude,longitude,startdate,enddate}=this.state;
        return(
            <div>
                <div style={{"display":this.state.show?"block":"none"}}>
                    <Toast children={{show:this.state.show,message:this.state.message,type:this.state.type}}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>add Event</Card.Header>
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
                                    <Form.Label>Capacity</Form.Label>
                                    <Form.Control required
                                                  value={capacity}
                                                  onChange={this.eventChange}
                                                  type="text" name="capacity" placeholder="Capacity" />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridLatitude">
                                    <Form.Label>Latitude</Form.Label>
                                    <Form.Control required
                                                  value={latitude}
                                                  onChange={this.eventChange}
                                                  type="text" name="latitude" placeholder="Latitude"/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridLongitude">
                                    <Form.Label>Longitude</Form.Label>
                                    <Form.Control required
                                                  value={longitude}
                                                  onChange={this.eventChange}
                                                  type="text" name="longitude" placeholder="Longitude"/>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridStartDate">
                                    <Form.Label>Start Date</Form.Label>
                                    <Form.Control required
                                                  value={startdate}
                                                  onChange={this.eventChange}
                                                  type="text" name="startdate" placeholder="Start Date"/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridEndDate">
                                    <Form.Label>End Date</Form.Label>
                                    <Form.Control required
                                                  value={enddate}
                                                  onChange={this.eventChange}
                                                  type="text" name="enddate"placeholder="End Date"/>
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="primary" type="submit">
                                Update
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}