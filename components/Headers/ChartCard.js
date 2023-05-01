import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { HISTORY_BTC_MIN, DUMP } from "redux/actions/ActionTypes";
import { request } from "redux/actions/ServiceAction";
import constant from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
import moment from "moment";

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

function ChartCard({
    priceDataRaw,
    priceDataDisplay,
    title,
    imageUrl,
    coinType,
}) {
    const [dataBitcoin, setDataBitcoin] = useState(null);
    const [openBitcoin, setOpenBitcoin] = useState([]);
    const [priceData, setPriceData] = useState({});

    const dispatch = useDispatch();
    useEffect(() => {
        getDataGraph();
    }, []);
    const getDataGraph = () => {
        let params = {
            fsym: coinType,
            tsym: "USD",
            limit: 23,
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

    const getPriceUpdates = () => {
        let params = {
            fsyms: "BTC",
            tsyms: "USD",
        };
        dispatch(
            request(
                DUMP,
                constant.pricemultifull,
                "get",
                params,
                true,
                (res) => {
                    setPriceData(res.data);
                },
                (error) => {
                    console.log("error", error);
                }
            )
        );
    };

    return (
        <>
            <Card className="card-stats mb-4 mb-xl-0">
                <CardBody className="p-0">
                    <Row className="p-4">
                        <div className="col">
                            <CardTitle
                                tag="h5"
                                className="text-uppercase text-muted mb-0"
                            >
                                {title}
                            </CardTitle>
                            <span className="h2 font-weight-bold mb-0">
                                {priceDataDisplay?.PRICE}
                                <span
                                    className={
                                        priceDataRaw?.CHANGEPCTHOUR >= 0
                                            ? "text-success h4 ml-2"
                                            : "text-danger h4 ml-2"
                                    }
                                >
                                    ({priceDataDisplay?.CHANGEPCTHOUR})
                                </span>
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
                                    src={imageUrl}
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
                                                label: (value, item) => {
                                                    const label = `${numberFormat(
                                                        parseFloat(value.raw)
                                                    )}`;
                                                    return label;
                                                },
                                                title: (value) => {
                                                    console.log(
                                                        "value",
                                                        value,
                                                        openBitcoin[
                                                            value[0].dataIndex
                                                        ].time
                                                    );
                                                    return moment
                                                        .unix(
                                                            openBitcoin[
                                                                value[0]
                                                                    .dataIndex
                                                            ].time
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
                            <span
                                className={
                                    priceDataRaw?.CHANGEPCTHOUR >= 0
                                        ? "text-success mr-2"
                                        : "text-danger mr-2"
                                }
                            >
                                <i className="fa fa-arrow-up" />
                                {"   "}
                                Just Now
                            </span>
                        </div>
                        <div>
                            <span className="text-nowrap">
                                {priceDataDisplay?.LASTMARKET}
                            </span>
                        </div>
                        <div>
                            <span>Vol: {priceDataDisplay?.VOLUME24HOUR}</span>
                        </div>
                    </p>
                </CardBody>
            </Card>
        </>
    );
}

export default ChartCard;
