import React, {Component} from 'react';
import {Card} from "react-bootstrap";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

export default class AdminReport extends Component{

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
    }

    initialState = {users: [],eventname:this.props.eventname,events: [],mapdata: [],
        dataBar: {
            labels: [],
            datasets: [
                {
                    label: "User Count",
                    data:[],
                    backgroundColor: [
                        "rgba(255,134,159,0.4)",
                        "rgba(134,164,255,0.4)",
                        "rgba(255,235,134,0.4)",
                        "rgba(134,255,231,0.4)",
                        "rgba(98,239,12,0.4)",
                        "rgba(252,95,23,0.4)"
                    ],
                    borderWidth: 2,
                    borderColor: [
                        "rgba(255, 134, 159, 1)",
                        "rgba(134,164,255,1)",
                        "rgba(255,235,134,1)",
                        "rgba(134,255,231,1)",
                        "rgba(98,239,12,1)",
                        "rgba(252,95,23,1)"
                    ]
                }
            ]
        },
        barChartOptions: {
            responsive: false,
            maintainAspectRatio: true,
            scales: {
                xAxes: [
                    {
                        barPercentage: 0.4,
                        gridLines: {
                            display: true,
                            color: "rgba(0, 0, 0, 0.1)"
                        }
                    }
                ],
                yAxes: [
                    {
                        gridLines: {
                            display: true,
                            color: "rgba(0, 0, 0, 0.1)"
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }
                ]
            }
        }};

    componentDidMount() {
        this.FindUsersByEventName(this.state.eventname);
        this.FindDataByEventName(this.state.eventname);
    }

    FindUsersByEventName(eventname) {
                    axios.get("http://localhost:8080/admin/user/"+eventname)
                        .then(response =>response.data)
                        .then((data)=>{
                                if (data != null) {
                                    this.setState({users: data})
                                } else {
                                    (this.setState({users: null}))
                                }
                        });
    }

    FindDataByEventName(eventname) {
        axios.get("http://localhost:8080/admin/data/"+eventname)
            .then(response =>response.data)
            .then((data)=>{
                this.state.dataBar.labels = Object.keys(data);
                this.state.dataBar.datasets[0].data = Object.values(data);
                this.setState({})
            });
    }

    render(){
        return(
            <div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>add Event</Card.Header>
                        <Card.Body>
                            <Table bordered hover striped variant="dark">
                                <thead>
                                <tr>
                                    <th>TC Number</th>
                                    <th>First Name</th>
                                    <th>Surname</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.users.length===0?
                                    <tr align="center">
                                        <td colSpan={6}>There is no user info</td>
                                    </tr> :
                                    this.state.users.map((addedUser)=>(
                                            <tr key={addedUser.tcno}>
                                                <td>{addedUser.tcno}</td>
                                                <td>{addedUser.firstname}</td>
                                                <td>{addedUser.surname}</td>
                                            </tr>
                                        )
                                    )
                                }
                                </tbody>
                            </Table>
                        </Card.Body>
                    <Card.Body>
                        <MDBContainer>
                            <h3 className="mt-5">Bar chart</h3>
                            <Bar data={this.state.dataBar} options={this.state.barChartOptions} />
                        </MDBContainer>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}
