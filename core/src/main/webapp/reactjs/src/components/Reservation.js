import React, {Component} from 'react';
import {Card, Form} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Toast from "./MyToast";
import Table from "react-bootstrap/Table";

export default class Reservation extends Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.submitEvent = this.submitEvent.bind(this);
        this.eventChange = this.eventChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    initialState = {message:"",type:"",eventname:this.props.eventname,tcno:'',questions: [],allanswers: []};

    componentDidMount() {
        this.FindAllQuestions(this.state.eventname);
    }

    FindAllQuestions=eventname=> {
        axios.get("http://localhost:8080/user/"+eventname+"/eventq")
            .then(response =>response.data)
            .then((data)=>{
                this.setState({questions:data})
            });
    }

    handleChange(e,index){
        this.state.allanswers[index]= e.target.value
        this.setState({allanswers:this.state.allanswers})
        console.log(this.state.allanswers)
    }

    submitEvent =event=>{
        event.preventDefault();
        const updatedEvent = {
            eventname:this.state.eventname,
            tcno:this.state.tcno,
        };

        axios.post("http://localhost:8080/user/"+updatedEvent.eventname+"/"+ updatedEvent.tcno,updatedEvent)
            .then(response=>{
                if(response.data!=null){
                    this.setState({"show":true, finished:true,message:"Reservation is accepted.",type:"success"});
                    setTimeout(()=>this.setState({"show":false}),2000)
                }else{
                    this.setState({"show":false});
                }
            }).catch(response=>{ this.setState({"show":true,message:"Reservation is rejected.",type:"danger"});
            setTimeout(()=>this.setState({"show":false}),2000) });
    }

    eventChange=event=>{
        this.setState({
                [event.target.name]:event.target.value
            }
        );
    }

    saveAnswers(){

        const addedAnswers = {
            allanswers: this.state.allanswers
        };
        for(let i=0;i< addedAnswers.allanswers.length;i++) {
            const oneAnswers = {
                answers: this.state.allanswers[i]
            };
            axios.post("http://localhost:8080/user/reservationA/" +
                this.state.eventname + "/" + this.state.tcno, oneAnswers)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        this.setState(this.initialState);
    }

    render(){
        const {tcno}=this.state;
        return(
            <div>
                <div style={{"display":this.state.show?"block":"none"}}>
                    <Toast children={{show:this.state.show,message:this.state.message,type:this.state.type}}/>
                </div>
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


                            <Table bordered hover striped variant="dark">
                                <thead>
                                <tr>
                                    <th>Questions</th>
                                    <th>Answers</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.questions.length===0?
                                    <tr align="center">
                                        <td colSpan={6}>There is no question for this event</td>
                                    </tr> :
                                    this.state.questions.map((addedQuestion,index)=>(
                                            <tr key={index}>
                                                <td>{addedQuestion.questions}</td>
                                                <input onChange={(e)=>this.handleChange(e,index)} value={this.state.allanswers[index]}/>
                                            </tr>
                                        )
                                    )
                                }
                                </tbody>
                            </Table>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="primary" type="submit">
                                Apply
                            </Button>
                            <Button variant="primary" onClick={(e)=>this.saveAnswers(e)}>
                                Save Answers
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}