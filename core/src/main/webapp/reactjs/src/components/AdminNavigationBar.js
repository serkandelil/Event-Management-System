import React, {Component} from 'react';
import {Navbar, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";

export default class AdminNavigationBar extends Component{
    render(){
        return(
            <>
                <Navbar bg="dark" variant="dark" >
                    <Link to={"/admin"} className="navbar-brand">
                        Admin Home
                    </Link>
                    <Nav className="mr-auto">
                        <Link to={"add"} className="navbar-brand">Add Event</Link>
                        <Link to={"report"} className="navbar-brand">Report</Link>
                        <Link to={""} className="navbar-brand">Sign Out</Link>
                    </Nav>
                </Navbar>
                <br />
            </>
        );
    }
}
