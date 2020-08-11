import React, {Component} from 'react';

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

export default class Footer extends Component{
    render(){
        return(
            <Navbar fixed="bottom" bg="dark" variant="dark">
                <Container>
                    <Col lg={12} className="text-center text-muted">
                        <div>All Rights Reserved by TUBITAK YTE</div>
                    </Col>
                </Container>
            </Navbar>

        );

    }

}