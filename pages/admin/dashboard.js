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
import TabularData from "./components/TabularData";

const Dashboard = (props) => {
    if (window.Chart) {
        parseOptions(Chart, chartOptions());
    }

    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                <Row>
                    <Col xl="12">
                        <TabularData />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

Dashboard.layout = Admin;

export default Dashboard;
