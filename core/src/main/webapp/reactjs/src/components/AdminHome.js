import React, {Component} from 'react';
import {Card} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Toast from "./MyToast";
import Modal from "react-bootstrap/Modal";
import UpdateEvent from "./UpdateEvent";
import AdminNavigationBar from "./AdminNavigationBar";
import AdminReport from "./AdminReport";

export default class AdminHome extends Component{
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            updatemodalshow:false,
            updatemodalEventName:"ser",
            usermodalshow:false,
            usermodalEventName:"ser1",
            message:"",
            type:""
        };
    }
    componentDidMount() {
        this.FindAllEvents();
    }

    FindAllEvents() {
        axios.get("http://localhost:8080/admin")
            .then(response =>response.data)
            .then((data)=>{
                this.setState({events:data})
            });
    }

    handleUpdateModal=(eventname)=> {
        this.setState({updatemodalEventName: eventname});
        this.setState({updatemodalshow:!this.state.updatemodalshow});
    }

    handleUserModal=(eventname)=> {
        this.setState({usermodalEventName: eventname});
        this.setState({usermodalshow:!this.state.usermodalshow});
    }

    deleteEvent =(eventname)=>{
        axios.delete("http://localhost:8080/admin/"+eventname)
            .then(response=>{
                if(response.data!=null) {
                    console.log(response)
                    this.setState({"show":true,message:"Event is deleted successfully.",type:"success"});
                    setTimeout(()=>this.setState({"show":false}),3000);
                    this.setState({events:this.state.events.filter(addedevent => addedevent.eventname !== eventname)});
                }else{
                    this.setState({"show":false});
                }
            }).catch(response=>{ this.setState({"show":true,message:"Event is not deleted successfully.",type:"danger"});
            setTimeout(()=>this.setState({"show":false}),2000) });
    }

    render(){
        return(
            <div>
                <AdminNavigationBar/>
            <div style={{"display":this.state.show?"block":"none"}}>
                <Toast children={{show:this.state.show,message:this.state.message,type:this.state.type}}/>
            </div>
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header> Events </Card.Header>
                <Table bordered hover striped variant="dark">
                    <thead>
                    <tr>
                        <th>Event Name</th>
                        <th>Capacity</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.events.length===0?
                        <tr align="center">
                            <td colSpan={6}>There is no added event</td>
                        </tr> :
                        this.state.events.map((addedEvent)=>(
                            <tr key={addedEvent.eventname}>
                                <td>{addedEvent.eventname}</td>
                                <td>{addedEvent.capacity}</td>
                                <td>{addedEvent.startdate}</td>
                                <td>{addedEvent.enddate}</td>
                                <ButtonGroup>
                                    <Button size="sm"  variant="outline-primary" onClick={this.handleUpdateModal.bind(this,addedEvent.eventname)}>
                                        Update
                                    </Button>
                                    <Button size="sm"  variant="outline-primary" onClick={this.handleUserModal.bind(this,addedEvent.eventname)}>
                                        Get Users
                                    </Button>
                                    <Button size="sm" variant="outline-danger" onClick={this.deleteEvent.bind(this,addedEvent.eventname)}>
                                        Delete
                                    </Button>
                                </ButtonGroup>
                                <Modal show={this.state.updatemodalshow} onHide={()=>this.handleUpdateModal()}>
                                    <Modal.Header closeButton> header </Modal.Header>
                                    <Modal.Body>
                                        <UpdateEvent eventname={this.state.updatemodalEventName}/>
                                    </Modal.Body>
                                </Modal>

                                <Modal show={this.state.usermodalshow} onHide={()=>this.handleUserModal()}>
                                    <Modal.Header closeButton> header </Modal.Header>
                                    <Modal.Body>
                                        <AdminReport eventname={this.state.usermodalEventName}/>
                                    </Modal.Body>
                                </Modal>
                            </tr>
                            )
                        )
                    }
                    </tbody>
                </Table>
                </Card>
            </div>
        );
    }

}