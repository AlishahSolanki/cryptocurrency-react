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
import moment from "moment";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);
const options = {};

const labels = ["January", "February", "March", "April", "May", "June", "July"];
const data = {
    labels,
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

const numberFormat = (value) =>
    new Intl.NumberFormat("en-US", {
        notation: "compact",
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    }).format(value);

const numberFormaFull = (value) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    }).format(value);

function Header() {
    const [dataBitcoin, setDataBitcoin] = useState(null);
    const [openBitcoin, setOpenBitcoin] = useState([]);

    const dispatch = useDispatch();
    useEffect(() => {
        getDataEveryMin();
    }, []);
    const getDataEveryMin = () => {
        let params = {
            // fsym: "BTC",
            // tsym: "USD",
            // limit: 10,
            fsym: "BTC",
            tsym: "USD",
            limit: 20,
        };
        dispatch(
            request(
                DUMP,
                constant.histohour,
                "get",
                params,
                true,
                (res) => {
                    let open = res.data.Data;
                    setOpenBitcoin(open);
                    const newData = {
                        labels: open.map((item) => item.open),
                        datasets: [
                            {
                                fill: true,
                                label: "Dataset 2",
                                data: open.map((item) => item.open),
                                borderColor: "rgb(53, 162, 235)",
                                backgroundColor: "rgba(53, 162, 235, 0.5)",
                            },
                        ],
                    };
                    setDataBitcoin(newData);
                    console.log(
                        "res",
                        res.data.Data.map((item) => item.open)
                    );
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
                                    <CardBody className="p-0">
                                        <Row className="p-4">
                                            <div className="col">
                                                <CardTitle
                                                    tag="h5"
                                                    className="text-uppercase text-muted mb-0"
                                                >
                                                    {"BTC-USD"}
                                                </CardTitle>
                                                <span className="h2 font-weight-bold mb-0">
                                                    {openBitcoin.length &&
                                                        numberFormaFull(
                                                            openBitcoin[
                                                                openBitcoin.length -
                                                                    1
                                                            ].open
                                                        )}
                                                </span>
                                            </div>

                                            <Col
                                                className="col-auto"
                                                style={{
                                                    alignItems: "flex-start",
                                                }}
                                            >
                                                <div className="icon icon-shape text-white rounded-circle shadow">
                                                    {/* <i className="fas fa-chart-bar" /> */}
                                                    <img
                                                        src="https://www.cryptocompare.com/media/37746251/btc.png"
                                                        width={50}
                                                        height={50}
                                                    ></img>
                                                </div>
                                            </Col>
                                        </Row>

                                        <div>
                                            {dataBitcoin && (
                                                <Line
                                                    options={{
                                                        responsive: true,
                                                        maintainAspectRatio: false,
                                                        interaction: {
                                                            mode: "point",
                                                            intersect: true,
                                                        },
                                                        plugins: {
                                                            legend: {
                                                                display: false,
                                                            },
                                                            title: {
                                                                display: false,
                                                                text: "Bitcoin",
                                                            },
                                                            tooltip: {
                                                                yAlign: "bottom",
                                                                displayColors: false,
                                                                callbacks: {
                                                                    label: (
                                                                        value,
                                                                        item
                                                                    ) => {
                                                                        const label = `${numberFormat(
                                                                            parseFloat(
                                                                                value.raw
                                                                            )
                                                                        )}`;
                                                                        return label;
                                                                    },
                                                                    title: (
                                                                        value
                                                                    ) => {
                                                                        console.log(
                                                                            "value",
                                                                            value,
                                                                            openBitcoin[
                                                                                value[0]
                                                                                    .dataIndex
                                                                            ]
                                                                                .time
                                                                        );
                                                                        return moment
                                                                            .unix(
                                                                                openBitcoin[
                                                                                    value[0]
                                                                                        .dataIndex
                                                                                ]
                                                                                    .time
                                                                            )
                                                                            .format(
                                                                                "MMM DD, hh:mm"
                                                                            );
                                                                    },
                                                                },
                                                            },
                                                        },
                                                        scales: {
                                                            x: {
                                                                grid: {
                                                                    display: false,
                                                                },
                                                                ticks: {
                                                                    display: false,
                                                                },
                                                            },
                                                            y: {
                                                                grid: {
                                                                    display: false,
                                                                },
                                                                ticks: {
                                                                    display: false,
                                                                },
                                                            },
                                                        },
                                                    }}
                                                    data={dataBitcoin}
                                                />
                                            )}
                                        </div>

                                        <p className="mb-0 text-muted text-sm px-3 justify-content-between d-flex">
                                            <div>
                                                <span className="text-success mr-2">
                                                    <i className="fa fa-arrow-up" />{" "}
                                                    3 Year
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-nowrap">
                                                    Date
                                                </span>
                                            </div>
                                            <div>
                                                <span>
                                                    Vol:{" "}
                                                    {openBitcoin.length &&
                                                        openBitcoin[
                                                            openBitcoin.length -
                                                                1
                                                        ].volumeto}
                                                </span>
                                            </div>
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
