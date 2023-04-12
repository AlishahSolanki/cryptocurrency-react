import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Row,
} from "reactstrap";
import classnames from "classnames";
import { Line } from "react-chartjs-2";
import {
  chartExample1,
} from "variables/charts.js";

const MainChart = () => {
  const [activeNav, setActiveNav] = React.useState(1);
  const [chartExample1Data, setChartExample1Data] = React.useState("data1");

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };

  return (
    <Card className="shadow">
      <CardHeader className="bg-transparent">
        <Row className="align-items-center">
          <div className="col">
            <h6 className="text-uppercase text-light ls-1 mb-1">
              Work Effeciency
            </h6>
            <h2 className="text-white mb-0">
              Sales value
            </h2>
          </div>
          <div className="col">
            <Nav
              className="justify-content-end"
              pills
            >
              <NavItem>
                <NavLink
                  className={classnames(
                    "py-2 px-3",
                    {
                      active:
                        activeNav === 1,
                    }
                  )}
                  href="#pablo"
                  onClick={(e) =>
                    toggleNavs(e, 1)
                  }
                >
                  <span className="d-none d-md-block">
                    Month
                  </span>
                  <span className="d-md-none">
                    M
                  </span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames(
                    "py-2 px-3",
                    {
                      active:
                        activeNav === 2,
                    }
                  )}
                  data-toggle="tab"
                  href="#pablo"
                  onClick={(e) =>
                    toggleNavs(e, 2)
                  }
                >
                  <span className="d-none d-md-block">
                    Week
                  </span>
                  <span className="d-md-none">
                    W
                  </span>
                </NavLink>
              </NavItem>
            </Nav>
          </div>
        </Row>
      </CardHeader>
      <CardBody>
        {/* Chart */}
        <div className="chart">
          <Line
            data={chartExample1[chartExample1Data]}
            options={chartExample1.options}
            getDatasetAtEvent={(e) =>
              console.log(e)
            }
          />
        </div>
      </CardBody>
    </Card>
  );
}

export default MainChart