
import { useRouter } from 'next/router';
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Container, Row, Col, CardTitle, Card, CardBody, CardHeader, Button } from "reactstrap";
import { request } from "redux/actions/ServiceAction";
import { DUMP } from "redux/actions/ActionTypes";
import { Line, Bar } from "react-chartjs-2";
import Admin from "layouts/Admin";
import constant from "../../constants";
import moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { COINS, COINS_IMG_URL } from 'constants/coins.enum';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const CoinDetail = () => {
  const [chartType, setChartType] = useState('mixed');
  const [coinData, setCoinData] = useState(null);
  const [openCoin, setOpenCoin] = useState([]);
  const router = useRouter();
  const coin = router.query.CoinDetail?.toUpperCase();
  const dispatch = useDispatch();
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: COINS[coin],
      },
      tooltip: {
        yAlign: "bottom",
        displayColors: false,
        callbacks: {
          label: (value) => `${value.raw.toLocaleString("en-US", { style: "currency", currency: "USD" })}`,
          title: (value) => moment.unix(openCoin[value[0].dataIndex].time).format("MMM DD, hh:mm"),
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { display: false }
      },
      y: {
        grid: { display: false },
        ticks: { display: false },
        beginAtZero: false
      },
    }
  }

  useEffect(() => {
    getDataEveryMin();
  }, [coin, chartType]);

  const getDataEveryMin = () => {
    let params = {
      fsym: coin,
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
          console.log(open)
          setOpenCoin(open);
          const newData = {
            labels: open.map((item) => item.open),
            datasets: getDataset(open),
          };
          setCoinData(newData);
        },
        (error) => {
          throw (error);
        }
      )
    );
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

  const getDataset = (open) => {
    switch(chartType) {
      case 'line':
      case 'bar':
        return [{
          fill: false,
          data: open.map((item) => item.open),
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        }];
        break;
      case 'area':
        return [{
          fill: true,
          data: open.map((item) => item.open),
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        }];
        break;
      default:
        return [
          {
            label: 'Bar Dataset',
            data: open.map((item) => item.open),
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
            order: 2
          },
          {
            label: 'Line Dataset',
            data: open.map((item) => item.open),
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
            type: 'line',
            order: 2
          }
        ];
        break;
    }
  }

  const changeViz = (type) => {
    setChartType(type);
  }

  return (
    <>
      <div className="bg-gradient-dark pb-8 pt-5 pt-md-8">
        <Container fluid>
          <Row>
            <Col>
              <Card className="card-stats mb-4 mb-xl-0">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Daily Chart</h3>
                    </div>
                    <div className="col text-right">
                      <Button color={`${chartType === 'mixed' ? 'primary active' : 'light'}`} onClick={() => changeViz('mixed')} size="sm" >Mixed Chart</Button>
                      <Button color={`${chartType === 'bar' ? 'primary active' : 'light'}`} onClick={() => changeViz('bar')} size="sm" >Bar Chart</Button>
                      <Button color={`${chartType === 'line' ? 'primary active' : 'light'}`} onClick={() => changeViz('line')} size="sm" >Line Chart</Button>
                      <Button color={`${chartType === 'area' ? 'primary active' : 'light'}`} onClick={() => changeViz('area')} size="sm" >Area Chart</Button>
                      {/* <Button color="light" onClick={() => changeViz('bar')} size="sm" >Bar Chart</Button> */}
                    </div>
                  </Row>
                </CardHeader>
                <hr className='m-0' />
                <CardBody className="p-0">
                  <Row className="p-4">
                    <div className="col">
                      <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                        {`${coin}-USD`}
                      </CardTitle>
                      <span className="h2 font-weight-bold mb-0">
                        {openCoin.length && numberFormaFull(openCoin[openCoin.length - 1].open)}
                      </span>
                    </div>

                    <Col className="col-auto" style={{ alignItems: "flex-start" }}>
                      <div className="icon icon-shape text-white rounded-circle shadow">
                        <img src={`https://www.cryptocompare.com/${COINS_IMG_URL[coin]}`} width={50} height={50} />
                      </div>
                    </Col>
                  </Row>

                  {/* <Row> */}
                  {coinData && (
                    <Row className="chart">
                      {
                        (chartType === 'bar' || chartType === 'mixed') ? 
                          <Bar options={chartOptions} data={coinData} /> : 
                          <Line options={chartOptions} data={coinData} />
                      }
                    </Row>
                  )}
                  {/* </Row> */}

                  <Row className="text-muted text-sm px-3 justify-content-between d-flex">
                    <div>
                    </div>
                    <div>
                      <span className="text-nowrap">
                        Date: {new Date().toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span>
                        Vol: {openCoin.length && openCoin[openCoin.length - 1].volumeto}
                      </span>
                    </div>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

CoinDetail.layout = Admin;

export default CoinDetail