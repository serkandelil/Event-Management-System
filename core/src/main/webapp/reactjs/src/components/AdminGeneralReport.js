import React, {Component} from 'react';
import {Card} from "react-bootstrap";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import AdminNavigationBar from "./AdminNavigationBar";

export default class AdminGeneralReport extends Component{
    style = {
        width: '100%',
        height: '100%'
    }

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
        this.FindData();
    }


    FindData() {
        axios.get("http://localhost:8080/admin/data/")
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
                <AdminNavigationBar/>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>General Report</Card.Header>
                    <Card.Body>
                        <MDBContainer>
                            <h3 className="mt-5">Reserved User Number For Each Event</h3>
                            <Bar data={this.state.dataBar} options={this.state.barChartOptions} />
                        </MDBContainer>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}