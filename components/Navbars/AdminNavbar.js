import React from "react";
import Link from "next/link";
// reactstrap components
import {
    Form,
    FormGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    InputGroup,
    Navbar,
    Container,
} from "reactstrap";

const AdminNavbar = ({ brandText }) => {
    return (
        <>
            <Navbar
                className="navbar-top navbar-dark"
                expand="md"
                id="navbar-main"
            >
                <Container fluid>
                    <Link href="/admin/dashboard">
                        <a className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block">
                            {brandText}
                        </a>
                    </Link>
                    {/* <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
                        <FormGroup className="mb-0">
                            <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="fas fa-search" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="Search" type="text" />
                            </InputGroup>
                        </FormGroup>
                    </Form> */}
                </Container>
            </Navbar>
        </>
    );
};

export default AdminNavbar;
