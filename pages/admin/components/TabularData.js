import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  Table,
  Row,
} from "reactstrap";
import { getAllCoins } from '../../../services/coins';
import Link from "next/link";
import { Line } from "react-chartjs-2";

const TabularData = () => {
  const [coins, setCoins] = useState([]);

  useEffect(async () => {
    const list = await getAllCoins();
    console.log(list)
    setCoins(list)
  }, []);

  const seeAll = () => {
    window.location.href = '/admin/tables';
  }
  return (
    <Card className="shadow">
      <CardHeader className="border-0">
        <Row className="align-items-center">
          <div className="col">
            <h3 className="mb-0">Top 10 Coins</h3>
          </div>
        </Row>
      </CardHeader>
      <Table className="align-items-center table-flush table table-hover" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Coin</th>
            <th scope="col">Price</th>
            <th scope="col">Daily Volumn</th>
            <th scope="col">Total Volumn</th>
            <th scope="col">Market Cap</th>
            <th scope="col">Last 7 days</th>
          </tr>
        </thead>
        <tbody className="table-hover">
          {coins.map((coin, index) =>
            <Link href={`/admin/${coin.symbol.toLowerCase()}`}>
              <tr key={coin.id} className="cursor-pointer">
                <td>{index + 1}</td>
                <td>
                  <div>
                    <img src={`https://www.cryptocompare.com/${coin.imageUrl}`} width="25" alt={coin.fullName} />
                    {coin.fullName} ({coin.symbol})
                  </div>
                </td>
                <td>{coin.price}</td>
                <td>{coin.dailyVol}</td>
                <td>{coin.totalVol}</td>
                <td>{coin.marketCap}</td>
                <td className="col-md-1">
                  <Line options={{
                          responsive: true,
                          maintainAspectRatio: true,
                          height: 50,
                          width: 200,
                          plugins: {
                            legend: {
                              display: false,
                            },
                            title: {
                              display: false,
                            },
                          },
                          scales: {
                            x: {
                              grid: { display: false },
                              ticks: { display: false }
                            },
                            y: {
                              grid: { display: false },
                              ticks: { display: false }
                            },
                          },
                        }}
                        data={{
                          labels: coin.last7Days,
                          datasets: [
                            {
                              fill: false,
                              data: coin.last7Days,
                              borderColor: "rgb(53, 162, 235)",
                              backgroundColor: "rgba(53, 162, 235, 0.5)",
                              borderWidth: 3
                            },
                          ],
                        }} />
                </td>
              </tr>
            </Link>
          )}
        </tbody>
      </Table>
    </Card>
  );
}

export default TabularData;
