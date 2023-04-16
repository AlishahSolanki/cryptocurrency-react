
import { useRouter } from 'next/router';
import { Container, Row, Col } from "reactstrap";
import Admin from "layouts/Admin";

const CoinDetail = () => {
  const router = useRouter();
  const coin = router.query.CoinDetail?.toUpperCase();
  return (
    <>
      <div className="bg-gradient-dark pb-8 pt-5 pt-md-8">
        <Container fluid>
          <Row>
            <Col lg="6" xl="3">
              Hello {coin}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

CoinDetail.layout = Admin;

export default CoinDetail