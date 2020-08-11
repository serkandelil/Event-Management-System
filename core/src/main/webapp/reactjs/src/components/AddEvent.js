import React, {Component} from 'react';
import {Card, Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Toast from "./MyToast";
import AdminNavigationBar from "./AdminNavigationBar";

export default class AddEvent extends Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.state.message = "";
        this.state.type = "";
        this.submitEvent = this.submitEvent.bind(this);
        this.eventChange = this.eventChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.saveQuestions = this.saveQuestions.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    initialState = {allquestions:[] ,eventname:'',capacity:'',latitude:'',longitude:'',startdate:'',enddate:''};

    submitEvent =event=>{
        event.preventDefault();
        const addedEvent = {
            eventname:this.state.eventname,
            capacity:this.state.capacity,
            latitude:this.state.latitude,
            longitude:this.state.longitude,
            startdate:this.state.startdate,
            enddate:this.state.enddate
        };
        axios.post("http://localhost:8080/admin",addedEvent)
            .then(response=>{
                console.log(response.data)
                if(response.data!=null){
                    this.setState({"show":true,message:"Event is added successfully.",type:"success"});
                    setTimeout(()=>this.setState({"show":false}),2000)
                }else{
                    this.setState({"show":false});
                }
                }).catch(response=>{ this.setState({"show":true,message:"Event is not added successfully.",type:"danger"});
            setTimeout(()=>this.setState({"show":false}),2000) });
    }

    eventChange=event=>{
        this.setState({
            [event.target.name]:event.target.value
            }
        );
    }

    addQuestion(){
        this.setState({allquestions:[...this.state.allquestions,""]})
        console.log(this.state.allquestions)
    }

    saveQuestions(){
        const addedQuestions = {
            allquestions: this.state.allquestions
        };
        for(let i=0;i< addedQuestions.allquestions.length;i++) {
            const oneQuestions = {
                questions: this.state.allquestions[i]
            };
            axios.post("http://localhost:8080/admin/" + this.state.eventname, oneQuestions)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        this.setState(this.initialState);
    }

    handleChange(e,index){
        this.state.allquestions[index]= e.target.value
        this.setState({allquestions:this.state.allquestions})
    }
    handleRemove(index){
        this.state.allquestions.splice(index,1)
        this.setState({allquestions:this.state.allquestions});

    }

    render(){
        const {allquestions,eventname,capacity,latitude,longitude,startdate,enddate}=this.state;
        return(
            <div>
                <AdminNavigationBar/>
                <div style={{"display":this.state.show?"block":"none"}}>
                    <Toast children={{show:this.state.show,message:this.state.message,type:this.state.type}}/>
                </div>
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header>Add Event</Card.Header>
                <Form onSubmit={this.submitEvent} id="eventFormId">
                <Card.Body>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEventName">
                                <Form.Label>Event Name</Form.Label>
                                <Form.Control required
                                              value={eventname}
                                              onChange={this.eventChange}
                                              type="text" name="eventname"
                                              placeholder="Enter event name" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridCapacity">
                                <Form.Label>Capacity</Form.Label>
                                <Form.Control required
                                              value={capacity}
                                              onChange={this.eventChange}
                                              type="Float" name="capacity" placeholder="Capacity" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridLatitude">
                                <Form.Label>Latitude</Form.Label>
                                <Form.Control required
                                              value={latitude}
                                              onChange={this.eventChange}
                                              type="Float" name="latitude" placeholder="Latitude"/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridLongitude">
                                <Form.Label>Longitude</Form.Label>
                                <Form.Control required
                                              value={longitude}
                                              onChange={this.eventChange}
                                              type="Float" name="longitude" placeholder="Longitude"/>
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
                    {this.state.allquestions.map((question,index)=>{
                        return(
                            <div key={index}>
                                <input onChange={(e)=>this.handleChange(e,index)} value={question}/>
                                <Button onClick={()=>this.handleRemove(index)}>
                                    Remove
                                </Button>
                            </div>
                        )
                    })}
                    <Button onClick={(e)=>this.addQuestion(e)}>
                        Add Question
                    </Button>
                </Card.Body>
                <Card.Footer>
                    <Button variant="primary" type="submit">
                        Submit Event
                    </Button>
                    <Button variant="primary" onClick={(e)=>this.saveQuestions(e)}>
                        Save Questions
                    </Button>
                </Card.Footer>
                </Form>
            </Card>
            </div>
                );
    }
}