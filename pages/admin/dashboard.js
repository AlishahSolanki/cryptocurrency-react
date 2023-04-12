import React from "react";
// node.js library that concatenates classes (strings)
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Bar } from "react-chartjs-2";
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Progress,
    Table,
    Container,
    Row,
    Col,
} from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import {
    chartOptions,
    parseOptions,
    chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import MainChart from "./components/main-chart";

const Dashboard = (props) => {
    if (window.Chart) {
        parseOptions(Chart, chartOptions());
    }

    return (
        <>
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="mb-5 mb-xl-0" xl="7">
                        <MainChart />
                    </Col>
                    <Col xl="5">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h3 className="mb-0">Today's Jobs</h3>
                                    </div>
                                    <div className="col text-right">
                                        <Button
                                            color="primary"
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                            size="sm"
                                        >
                                            See all
                                        </Button>
                                    </div>
                                </Row>
                            </CardHeader>
                            <Table
                                className="align-items-center table-flush"
                                responsive
                            >
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Jobs</th>
                                        <th scope="col">Client</th>
                                        <th scope="col">Job Prority</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">Facebook</th>
                                        <td>1,480</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <span className="mr-2">
                                                    60%
                                                </span>
                                                <div>
                                                    <Progress
                                                        max="100"
                                                        value="60"
                                                        barClassName="bg-gradient-danger"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Facebook</th>
                                        <td>5,480</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <span className="mr-2">
                                                    70%
                                                </span>
                                                <div>
                                                    <Progress
                                                        max="100"
                                                        value="70"
                                                        barClassName="bg-gradient-success"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Google</th>
                                        <td>4,807</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <span className="mr-2">
                                                    80%
                                                </span>
                                                <div>
                                                    <Progress
                                                        max="100"
                                                        value="80"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Instagram</th>
                                        <td>3,678</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <span className="mr-2">
                                                    75%
                                                </span>
                                                <div>
                                                    <Progress
                                                        max="100"
                                                        value="75"
                                                        barClassName="bg-gradient-info"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">twitter</th>
                                        <td>2,645</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <span className="mr-2">
                                                    30%
                                                </span>
                                                <div>
                                                    <Progress
                                                        max="100"
                                                        value="30"
                                                        barClassName="bg-gradient-warning"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">twitter</th>
                                        <td>2,645</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <span className="mr-2">
                                                    30%
                                                </span>
                                                <div>
                                                    <Progress
                                                        max="100"
                                                        value="30"
                                                        barClassName="bg-gradient-warning"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">twitter</th>
                                        <td>2,645</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <span className="mr-2">
                                                    30%
                                                </span>
                                                <div>
                                                    <Progress
                                                        max="100"
                                                        value="30"
                                                        barClassName="bg-gradient-warning"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col xl="4">
                        <Card className="shadow">
                            <CardHeader className="bg-transparent">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h6 className="text-uppercase text-muted ls-1 mb-1">
                                            Performance
                                        </h6>
                                        <h2 className="mb-0"></h2>
                                    </div>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                {/* Chart */}
                                <div className="chart">
                                    <Bar
                                        data={chartExample2.data}
                                        options={chartExample2.options}
                                    />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col className="mb-5 mb-xl-0" xl="8">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <Row className="align-items-center">
                                    <div className="col">
                                        <h3 className="mb-0">Over Due Jobs</h3>
                                    </div>
                                    <div className="col text-right">
                                        <Button
                                            color="primary"
                                            href="#pablo"
                                            onClick={(e) => e.preventDefault()}
                                            size="sm"
                                        >
                                            See all
                                        </Button>
                                    </div>
                                </Row>
                            </CardHeader>
                            <Table
                                className="align-items-center table-flush"
                                responsive
                            >
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Jobs</th>
                                        <th scope="col">Client</th>
                                        <th scope="col">Dated</th>
                                        <th scope="col">Prority</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">/argon/</th>
                                        <td>4,569</td>
                                        <td>340</td>
                                        <td>
                                            <i className="fas fa-arrow-up text-success mr-3" />{" "}
                                            46,53%
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">/argon/index.html</th>
                                        <td>3,985</td>
                                        <td>319</td>
                                        <td>
                                            <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                                            46,53%
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">/argon/charts.html</th>
                                        <td>3,513</td>
                                        <td>294</td>
                                        <td>
                                            <i className="fas fa-arrow-down text-warning mr-3" />{" "}
                                            36,49%
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">/argon/tables.html</th>
                                        <td>2,050</td>
                                        <td>147</td>
                                        <td>
                                            <i className="fas fa-arrow-up text-success mr-3" />{" "}
                                            50,87%
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">/argon/profile.html</th>
                                        <td>1,795</td>
                                        <td>190</td>
                                        <td>
                                            <i className="fas fa-arrow-down text-danger mr-3" />{" "}
                                            46,53%
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

Dashboard.layout = Admin;

export default Dashboard;
