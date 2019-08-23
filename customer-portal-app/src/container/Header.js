import React from 'react';
import { AuthConsumer } from '../context/AuthContext';
import { Link, withRouter } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';

function Header({ location }) {
    return (
        <header>
            <AuthConsumer>
                {({ isAuth, logout }) => {
                    return (
                        <React.Fragment>
                            <div className="header-deltaw">
                                <div className="profile-pic corporate" />
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="mr-auto">
                                        <Nav.Link href="#home">Home</Nav.Link>
                                        <Nav.Link href="#link">Link</Nav.Link>
                                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                        </NavDropdown>
                                    </Nav>
                                </Navbar.Collapse>
                            </div>
                        </React.Fragment>
                    );
                }}
            </AuthConsumer>
        </header>
    );
}

export default withRouter(Header);
