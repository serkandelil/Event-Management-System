import React, {Component} from 'react';
import {Card} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Toast from "./MyToast";
import Modal from "react-bootstrap/Modal";
import UserNavigationBar from "./UserNavigationBar";
import Reservation from "./Reservation";
import Location from "./Location";
import Qr from "./Qr";

export default class UserHome extends Component{
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            modalshow:false,
            modalEventName:"",
            geomodalshow:false,
            geomodalLongitude:"",
            geomodalLatitude:"",
            qrmodalshow:false,
            qrmodalEventName:"",
            type:"",
            message:""
        };
    }
    componentDidMount() {
        this.FindAllEvents();
    }

    FindAllEvents() {
        axios.get("http://localhost:8080/user")
            .then(response =>response.data)
            .then((data)=>{
                this.setState({events:data})
            });
    }

    handlegeoModal=(longitude,latitude)=> {
        this.setState({geomodalLongitude: longitude,geomodalLatitude: latitude });
        this.setState({geomodalshow:!this.state.geomodalshow});
    }

    handleModal=(eventname)=> {
        this.setState({modalEventName: eventname});
        this.setState({modalshow:!this.state.modalshow});
    }

    handleQRModal=(eventname)=> {
        this.setState({qrmodalEventName: eventname});
        this.setState({qrmodalshow:!this.state.qrmodalshow});
    }

    render(){
        return(
            <div>
                <UserNavigationBar/>
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
                                            <Button size="sm"  variant="outline-primary" onClick={this.handleModal.bind(this,addedEvent.eventname)}>
                                                Apply
                                            </Button>
                                            <Button size="sm"  variant="outline-primary" onClick={this.handlegeoModal.bind(this,addedEvent.longitude,addedEvent.latitude)}>
                                                Location
                                            </Button>
                                            <Button size="sm"  variant="outline-primary" onClick={this.handleQRModal.bind(this,addedEvent.eventname)}>
                                                Get QR
                                            </Button>
                                        </ButtonGroup>
                                        <Modal show={this.state.modalshow} onHide={()=>this.handleModal()}>
                                            <Modal.Header closeButton> Apply </Modal.Header>
                                            <Modal.Body>
                                                <Reservation eventname={this.state.modalEventName}/>
                                            </Modal.Body>
                                        </Modal>
                                        <Modal show={this.state.qrmodalshow} onHide={()=>this.handleQRModal()}>
                                            <Modal.Header closeButton> Get QR </Modal.Header>
                                            <Modal.Body>
                                                <Qr eventname={this.state.qrmodalEventName}/>
                                            </Modal.Body>
                                        </Modal>
                                        <Modal show={this.state.geomodalshow} onHide={()=>this.handlegeoModal()}>
                                            <Modal.Header closeButton> Location </Modal.Header>
                                            <Modal.Body>
                                                <Location longitude={this.state.geomodalLongitude} latitude={this.state.geomodalLatitude} />
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