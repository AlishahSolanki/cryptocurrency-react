import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  Progress,
  Table,
  Row,
} from "reactstrap";
import { getAllCoins } from '../../../services/coins';
import Link from "next/link";

const TabularData = () => {
  const [coins, setCoins] = useState([]);

  useEffect(async () => {
    const list = await getAllCoins();
    console.log(list)
    // console.log(list[0].ConversionInfo.RAW[0].split('~'));
    setCoins(list.slice(0, 10))
  }, []);

  const seeAll = () => {
    window.location.href = '/admin/tables';
  }
  return (
    <Card className="shadow">
      <CardHeader className="border-0">
        <Row className="align-items-center">
          <div className="col">
            <h3 className="mb-0">Tabular Data</h3>
          </div>
          <div className="col text-right">
            <Button
              color="primary"
              href="#"
              onClick={seeAll}
              size="sm"
            >
              See all
            </Button>
          </div>
        </Row>
      </CardHeader>
      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Coin</th>
            <th scope="col">Price</th>
            <th scope="col">Daily Volumn</th>
            <th scope="col">Total Volumn</th>
            <th scope="col">Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin, index) =>
            <tr key={coin.id}>
              <td>{index + 1}</td>
              <td>
                <Link href={`/admin/${coin.symbol.toLowerCase()}`}>
                  <div>
                    <img src={`https://www.cryptocompare.com/${coin.imageUrl}`} width="25" alt={coin.fullName} />
                    {coin.fullName} ({coin.symbol})
                  </div>
                </Link>
              </td>
              <td>{coin.price}</td>
              <td>{coin.dailyVol}</td>
              <td>{coin.totalVol}</td>
              <td>{coin.marketCap}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Card>
  );
}

export default TabularData;
