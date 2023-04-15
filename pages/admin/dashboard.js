import React from "react";
// node.js library that concatenates classes (strings)
// javascipt plugin for creating charts
import Chart from "chart.js";
// reactstrap components
import { Container, Row, Col } from "reactstrap";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import { chartOptions, parseOptions } from "variables/charts.js";

import Header from "components/Headers/Header.js";
import MainChart from "./components/MainChart";
import TabularData from "./components/TabularData";
import PerformanceChart from "./components/PerformanceChart";
import TabularData2 from "./components/TabularData2";
import { useDispatch, useSelector } from "react-redux";

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
                        <TabularData />
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col xl="4">
                        <PerformanceChart />
                    </Col>
                    <Col className="mb-5 mb-xl-0" xl="8">
                        <TabularData2 />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

Dashboard.layout = Admin;

export default Dashboard;
