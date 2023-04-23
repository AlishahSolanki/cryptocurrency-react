/*eslint-disable*/
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
// reactstrap components
import {
    Collapse,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Media,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
    Row,
    Col,
    UncontrolledCollapse,
} from "reactstrap";

var ps;

const Sidebar = (props) => {
    // used for checking current route
    const router = useRouter();
    const [collapseOpen, setCollapseOpen] = React.useState(false);
    // verifies if routeName is the one active (in browser input)
    const activeRoute = (routeName) => {
        return router.route.indexOf(routeName) > -1;
    };
    // toggles collapse between opened and closed (true/false)
    const toggleCollapse = () => {
        setCollapseOpen(!collapseOpen);
    };

    // creates the links that appear in the left menu / Sidebar
    const createLinks = (routes) => {
        return routes.map((prop, key) => {
            return (
                <NavItem
                    key={key}
                    active={router.asPath === `${prop.layout}/${prop.id}`}
                    role='button'
                >
                    <Link href={prop.layout + prop.path}>
                        <NavLink
                            active={router.asPath === `${prop.layout}/${prop.id}`}
                            id={prop.id}
                        >
                            <i className={prop.icon} />
                            {prop.name}
                        </NavLink>
                    </Link>
                    {prop.nestedPage && (
                        <UncontrolledCollapse toggler={prop.id}>
                            <Nav navbar>
                                {prop.nestedPage?.map((item, key) => {
                                    return (
                                        <NavItem
                                            style={{ marginLeft: 50 }}
                                            key={key}
                                            active={router.asPath === `${prop.layout}/${prop.id}`}
                                        >
                                            <Link
                                                href={item.layout + item.path}
                                            >
                                                <NavLink
                                                    active={true}
                                                >
                                                    <i className={item.icon} />
                                                    {item.name}
                                                </NavLink>
                                            </Link>
                                        </NavItem>
                                    );
                                })}
                            </Nav>
                        </UncontrolledCollapse>
                    )}
                </NavItem>
            );
        });
    };
    const { routes, logo } = props;
    let navbarBrand = (
        <NavbarBrand href="#pablo" className="pt-0">
            CSCE 5320 (Team 6)
        </NavbarBrand>
    );
    return (
        <Navbar
            className="navbar-vertical fixed-left navbar-light bg-white"
            expand="md"
            id="sidenav-main"
        >
            <Container fluid>
                {/* Toggler */}
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleCollapse}
                >
                    <span className="navbar-toggler-icon" />
                </button>
                {/* Brand */}
                {logo && logo.innerLink ? (
                    <Link href={logo.innerLink}>
                        <span>{navbarBrand}</span>
                    </Link>
                ) : null}
                {logo && logo.outterLink ? (
                    <a href={logo.innerLink} target="_blank">
                        {navbarBrand}
                    </a>
                ) : null}
                
                <Collapse navbar isOpen={collapseOpen}>
                    <Nav navbar>{createLinks(routes)}</Nav>
                </Collapse>
            </Container>
        </Navbar>
    );
};

Sidebar.defaultProps = {
    routes: [{}],
};

Sidebar.propTypes = {
    // links that will be displayed inside the component
    routes: PropTypes.arrayOf(PropTypes.object),
    logo: PropTypes.shape({
        // innerLink is for links that will direct the user within the app
        // it will be rendered as <Link href="...">...</Link> tag
        innerLink: PropTypes.string,
        // outterLink is for links that will direct the user outside the app
        // it will be rendered as simple <a href="...">...</a> tag
        outterLink: PropTypes.string,
        // the image src of the logo
        imgSrc: PropTypes.string.isRequired,
        // the alt for the img
        imgAlt: PropTypes.string.isRequired,
    }),
};

export default Sidebar;
