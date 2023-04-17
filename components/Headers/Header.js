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
import ChartCard from "./ChartCard";
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
    const [priceData, setPriceData] = useState({});

    const dispatch = useDispatch();
    useEffect(() => {
        getPriceUpdates();
        setInterval(() => {
            getPriceUpdates();
        }, 5000);
    }, []);

    const getPriceUpdates = () => {
        let params = {
            fsyms: "BTC,ETH,LTC,XRP",
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
            <div className="header bg-gradient-dark pb-8 pt-5 pt-md-8">
                <Container fluid>
                    <div className="header-body">
                        {/* Card stats */}
                        <Row>
                            <Col lg="6" xl="3">
                                <ChartCard
                                    priceDataRaw={priceData?.RAW?.BTC?.USD}
                                    priceDataDisplay={
                                        priceData?.DISPLAY?.BTC?.USD
                                    }
                                    title={"BTC-USD"}
                                    imageUrl={
                                        "https://www.cryptocompare.com/media/37746251/btc.png"
                                    }
                                    coinType={"BTC"}
                                />
                            </Col>
                            <Col lg="6" xl="3">
                                <ChartCard
                                    priceDataRaw={priceData?.RAW?.ETH?.USD}
                                    priceDataDisplay={
                                        priceData?.DISPLAY?.ETH?.USD
                                    }
                                    title={"ETH-USD"}
                                    imageUrl={
                                        "https://www.cryptocompare.com//media/37746238/eth.png"
                                    }
                                    coinType={"ETH"}
                                />
                            </Col>
                            <Col lg="6" xl="3">
                                <ChartCard
                                    priceDataRaw={priceData?.RAW?.LTC?.USD}
                                    priceDataDisplay={
                                        priceData?.DISPLAY?.LTC?.USD
                                    }
                                    title={"LTC-USD"}
                                    imageUrl={
                                        "https://www.cryptocompare.com//media/37746243/ltc.png"
                                    }
                                    coinType={"LTC"}
                                />
                            </Col>
                            <Col lg="6" xl="3">
                                <ChartCard
                                    priceDataRaw={priceData?.RAW?.XRP?.USD}
                                    priceDataDisplay={
                                        priceData?.DISPLAY?.XRP?.USD
                                    }
                                    title={"XRP-USD"}
                                    imageUrl={
                                        "https://www.cryptocompare.com//media/38553096/xrp.png"
                                    }
                                    coinType={"XRP"}
                                />
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </>
    );
}

export default Header;
