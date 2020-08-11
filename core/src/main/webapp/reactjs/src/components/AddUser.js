import React, {Component} from 'react';
import {Card, Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Toast from "./MyToast";
import UserNavigationBar from "./UserNavigationBar";

export default class Reservation extends Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.submitEvent = this.submitEvent.bind(this);
        this.eventChange = this.eventChange.bind(this);
    }

    initialState = {message:"",type:"",tcno:'',firstname:'',surname:'',email:''};

    componentDidMount() {
    }

    submitEvent =event=>{
        event.preventDefault();
        const updatedEvent = {
            tcno:this.state.tcno,
            firstname:this.state.firstname,
            surname:this.state.surname,
            email:this.state.email
        };
        axios.post("http://localhost:8080/user",updatedEvent)
            .then(response=>{
                if(response.data!=null){
                    this.setState({"show":true,message:"User is added successfully.",type:"success"});
                    setTimeout(()=>this.setState({"show":false}),2000)
                }else{
                    this.setState({"show":false});
                }
            }).catch(response=>{ this.setState({"show":true,message:"User is not added successfully.",type:"danger"});
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
        const {tcno,firstname,surname,email}=this.state;
        return(
            <div>
                <UserNavigationBar/>
                <div style={{"display":this.state.show?"block":"none"}}>
                    <Toast children={{show:this.state.show,message:this.state.message,type:this.state.type}}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>Join </Card.Header>
                    <Form onSubmit={this.submitEvent} id="eventFormId">
                        <Card.Body>
                            <Form.Row>

                                <Form.Group as={Col} controlId="formGridCapacity">
                                    <Form.Label>Tc Number</Form.Label>
                                    <Form.Control required
                                                  value={tcno}
                                                  onChange={this.eventChange}
                                                  type="Integer" name="tcno" placeholder="Tc Number" />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridLatitude">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control required
                                                  value={firstname}
                                                  onChange={this.eventChange}
                                                  type="text" name="firstname" placeholder="First Name"/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridLongitude">
                                    <Form.Label>Surname</Form.Label>
                                    <Form.Control required
                                                  value={surname}
                                                  onChange={this.eventChange}
                                                  type="text" name="surname" placeholder="Surname"/>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridStartDate">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control required
                                                  value={email}
                                                  onChange={this.eventChange}
                                                  type="email" name="email" placeholder="Email"/>
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="primary" type="submit">
                                Apply
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}