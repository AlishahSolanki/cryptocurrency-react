import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  Table,
  Row,
} from "reactstrap";
import { getAllCoins } from '../../../services/coins';

const TabularData2 = () => {
  const [coins, setCoins] = useState([]);

  useEffect(async () => {
    const list = await getAllCoins();
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
            <h3 className="mb-0">Crypto</h3>
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
      <Table
        className="align-items-center table-flush"
        responsive
      >
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Coin</th>
            <th scope="col">Price</th>
            <th scope="col">Volumn</th>
            <th scope="col">Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin, index) =>
            <tr key={coin.CoinInfo.id}>
              <td>{index + 1}</td>
              <td>{coin.CoinInfo.Name}</td>
              <td>TBC</td>
              <td>{coin.ConversionInfo.TotalVolume24H}</td>
              <td>{coin.ConversionInfo.Supply}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Card>
  );
}

export default TabularData2;
