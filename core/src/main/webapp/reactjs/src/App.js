import React from 'react';
import './App.css';
import Footer from "./components/Footer";
import {Col,Row,Container} from "react-bootstrap";
import AddEvent from "./components/AddEvent";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import AdminHome from "./components/AdminHome";
import UserHome from "./components/UserHome";
import AdminGeneralReport from "./components/AdminGeneralReport";
import AddUser from "./components/AddUser";

function App() {
    return (
    <Router>
        <Container>
            <Row>
                <Col>
                    <Switch>
                        <Route path="/" exact component={UserHome}/>
                        <Route path="/admin" exact component={AdminHome}/>
                        <Route path="/add" exact component={AddEvent}/>
                        <Route path="/report" exact component={AdminGeneralReport}/>
                        <Route path="/join" exact component={AddUser}/>
                    </Switch>
                </Col>
            </Row>
        </Container>
        <Footer/>
    </Router>
  );
}

export default App;
