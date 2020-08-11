import React, {Component} from 'react';
import {Navbar, Nav, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import Col from "react-bootstrap/Col";

export default class UserNavigationBar extends Component{
    adminpassword="1234";
    constructor(props) {
        super(props);
        this.state = {
            username:"",
            password:""
        };
    }

    eventChange=event=>{
        this.setState({
                [event.target.name]:event.target.value
            }
        );
    }

    render(){
        return(
            <>
                <Navbar bg="dark" variant="dark" >
                    <Nav className="mr-auto" >
                        <Link to={""} className="navbar-brand">Home</Link>
                        <Link to={"join"} className="navbar-brand">Join</Link>
                        <Form.Group as={Col} controlId="formGridEventName">
                            <Form.Control required
                                          value={this.password}
                                          onChange={this.eventChange}
                                          type="password" name="password"
                                          placeholder="Admin Password" />
                        </Form.Group>
                        {this.state.password.localeCompare(this.adminpassword) ?
                            <Nav.Link eventKey="disabled" to={"admin"} className="navbar-brand">Sign In</Nav.Link>:
                            <Link to={"admin"} className="navbar-brand">Sign In</Link>
                        }
                    </Nav>
                </Navbar>
                <br />
            </>
        );
    }
}