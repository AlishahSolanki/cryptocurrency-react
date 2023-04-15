import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { HISTORY_BTC_MIN, DUMP } from "redux/actions/ActionTypes";
import { request } from "redux/actions/ServiceAction";
import constant from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
// ChartJS.plugins.register(
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Filler,
//     Legend
// );
const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Chart.js Line Chart",
        },
    },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];
const data = {
    // labels,
    datasets: [
        {
            fill: true,
            label: "Dataset 2",
            data: labels.map(() =>
                faker.datatype.number({ min: 0, max: 1000 })
            ),
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
    ],
};
function Header() {
    const [dataBitcoin, setDataBitcoin] = useState(null);

    const dispatch = useDispatch();
    useEffect(() => {
        getDataEveryMin();
    }, []);
    const getDataEveryMin = () => {
        let params = {
            fsym: "BTC",
            tsym: "USDT",
            limit: 20,
        };
        dispatch(
            request(
                DUMP,
                constant.histominute,
                "get",
                params,
                true,
                (res) => {
                    const newData = {
                        labels: res.data.Data.map((item) => item.open),
                        datasets: [
                            {
                                fill: true,
                                label: "Dataset 2",
                                data: res.data.Data.map((item) => item.open),
                                borderColor: "rgb(53, 162, 235)",
                                backgroundColor: "rgba(53, 162, 235, 0.5)",
                            },
                        ],
                    };

                    setDataBitcoin(newData);
                    console.log("res", newData);
                },
                (error) => {
                    console.log("error", error);
                }
            )
        );
    };

    return (
        <>
            <div className="header bg-gradient-dark pb-8 pt-5 pt-md-8">
                <Container fluid>
                    <div className="header-body">
                        {/* Card stats */}
                        <Row>
                            <Col lg="6" xl="3">
                                <Card className="card-stats mb-4 mb-xl-0">
                                    <CardBody>
                                        {/* <Row>
                                            <div className="col">
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase text-muted mb-0"
                                                >
                                                    {"Anniversaries"}
                                                </CardTitle>
                                                <span className="h2 font-weight-bold mb-0">
                                                    John Deo
                                                </span>
                                            </div>
                                            <Col className="col-auto">
                                                <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                                    <i className="fas fa-chart-bar" />
                                                </div>
                                            </Col>
                                        </Row>
                                        <p className="mt-3 mb-0 text-muted text-sm">
                                            <span className="text-success mr-2">
                                                <i className="fa fa-arrow-up" />{" "}
                                                3 Year
                                            </span>{" "}
                                            <span className="text-nowrap">
                                                Date
                                            </span>
                                        </p> */}
                                        <div
                                            // className="chart"
                                            style={{ height: 200 }}
                                        >
                                            {dataBitcoin && (
                                                <Line
                                                    options={options}
                                                    data={dataBitcoin}
                                                />
                                            )}
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg="6" xl="3">
                                <Card className="card-stats mb-4 mb-xl-0">
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase text-muted mb-0"
                                                >
                                                    Top Performer
                                                </CardTitle>
                                                <span className="h2 font-weight-bold mb-0">
                                                    Berry Allen
                                                </span>
                                            </div>
                                            <Col className="col-auto">
                                                <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                                                    <i className="fas fa-chart-pie" />
                                                </div>
                                            </Col>
                                        </Row>
                                        <p className="mt-3 mb-0 text-muted text-sm">
                                            <span className="text-danger mr-2">
                                                <i className="fas fa-arrow-down" />{" "}
                                                3.48%
                                            </span>{" "}
                                            <span className="text-nowrap">
                                                Since last week
                                            </span>
                                        </p>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg="6" xl="3">
                                <Card className="card-stats mb-4 mb-xl-0">
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase text-muted mb-0"
                                                >
                                                    Upcoming Event
                                                </CardTitle>
                                                <span className="h2 font-weight-bold mb-0">
                                                    Event XYZ
                                                </span>
                                            </div>
                                            <Col className="col-auto">
                                                <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                                                    <i className="fas fa-users" />
                                                </div>
                                            </Col>
                                        </Row>
                                        <p className="mt-3 mb-0 text-muted text-sm">
                                            <span className="text-warning mr-2">
                                                <i className="fas fa-arrow-down" />{" "}
                                                1.10%
                                            </span>{" "}
                                            <span className="text-nowrap">
                                                Since yesterday
                                            </span>
                                        </p>
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col lg="6" xl="3">
                                <Card className="card-stats mb-4 mb-xl-0">
                                    <CardBody>
                                        <Row>
                                            <div className="col">
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase text-muted mb-0"
                                                >
                                                    Todays Meeting
                                                </CardTitle>
                                                <span className="h2 font-weight-bold mb-0">
                                                    10:30 PM
                                                </span>
                                            </div>
                                            <Col className="col-auto">
                                                <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                                                    <i className="fas fa-percent" />
                                                </div>
                                            </Col>
                                        </Row>
                                        <p className="mt-3 mb-0 text-muted text-sm">
                                            <span className="text-success mr-2">
                                                <i className="fas fa-arrow-up" />{" "}
                                                12%
                                            </span>{" "}
                                            <span className="text-nowrap">
                                                Since last month
                                            </span>
                                        </p>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </>
    );
}

export default Header;
