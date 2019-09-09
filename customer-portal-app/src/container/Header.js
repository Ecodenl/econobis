import React, { useState, useEffect, useRef } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { AuthConsumer } from '../context/AuthContext';
import { Link, withRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { UserConsumer } from '../context/UserContext';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

function Header({ location }) {
    const [menuOpen, updateStateMenu] = useState(false);

    // This keeps your state in sync with the opening/closing of the menu
    // via the default means, e.g. clicking the X, pressing the ESC key etc.
    function handleStateChange(state) {
        updateStateMenu(state.isOpen);
    }

    // This can be used to close the menu, e.g. when a user clicks a menu item
    function openMenu() {
        updateStateMenu(true);
    }

    // This can be used to close the menu, e.g. when a user clicks a menu item
    function closeMenu() {
        updateStateMenu(false);
    }

    // This can be used to toggle the menu, e.g. when using a custom icon
    // Tip: You probably want to hide either/both default icons if using a custom icon
    // See https://github.com/negomi/react-burger-menu#custom-icons
    function toggleMenu() {
        updateStateMenu(!menuOpen);
    }

    /**
     * Hook that alerts clicks outside of the passed ref
     */
    function useOutsideAlerter(ref) {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                updateStateMenu(false);
            }
        }

        useEffect(() => {
            // Bind the event listener
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener('mousedown', handleClickOutside);
            };
        });
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    return (
        <header>
            <div className="header-deltaw">
                <div className="profile-pic">
                    <UserConsumer>
                        {({ user }) => (
                            <span className="profile-title">
                                <span className="profile-sub-title">In beheer:</span>
                                <br />
                                {user.fullName}
                            </span>
                        )}
                    </UserConsumer>
                </div>
                {/* Hambuger menu */}
                <Container>
                    <Row>
                        <Col xs={6}>
                            <div className="header-logo">
                                <Image src="images/logo.png" />
                            </div>
                        </Col>
                        <Col xs={6}>
                            <div className="d-flex justify-content-end">
                                <div className="bm-burger-button" onClick={openMenu}>
                                    <span>
                                        <span className="bm-burger-bars bm-burger-bar-1" />
                                        <span className="bm-burger-bars bm-burger-bar-2" />
                                        <span className="bm-burger-bars bm-burger-bar-3" />
                                    </span>
                                </div>
                            </div>
                            <Menu
                                right
                                width={'300px'}
                                // noOverlay
                                isOpen={menuOpen}
                                onStateChange={state => handleStateChange(state)}
                                customBurgerIcon={false}
                            >
                                <div className={'sidebar-menu'}>
                                    <AuthConsumer>
                                        {({ logout }) => {
                                            return (
                                                <React.Fragment>
                                                    <h6 className="heading in-menu">MENU</h6>
                                                    <Link
                                                        to={'/gegevens'}
                                                        className={`nav-link w-nav-link w--nav-link-open ${
                                                            location.pathname === '/gegevens' ? 'w--current' : ''
                                                        }`}
                                                        onClick={closeMenu}
                                                    >
                                                        Gegevens
                                                    </Link>
                                                    <Link
                                                        to={null}
                                                        className={`nav-link w-nav-link w--nav-link-open ${
                                                            location.pathname === '/' ? 'w--current' : ''
                                                        }`}
                                                        onClick={closeMenu}
                                                    >
                                                        Deelnames
                                                    </Link>
                                                    <Link
                                                        to={'/inschrijven-projecten'}
                                                        className={`nav-link w-nav-link w--nav-link-open ${
                                                            location.pathname === '/inschrijven-projecten'
                                                                ? 'w--current'
                                                                : ''
                                                        }`}
                                                        onClick={closeMenu}
                                                    >
                                                        Inschrijven projecten
                                                    </Link>

                                                    <Link
                                                        to={'/inschrijven/kapitaal/project-x'}
                                                        className={`nav-link w-nav-link w--nav-link-open ${
                                                            location.pathname === '/' ? 'w--current' : ''
                                                        }`}
                                                        onClick={closeMenu}
                                                    >
                                                        Inschrijvingen
                                                    </Link>

                                                    <a
                                                        href="#"
                                                        onClick={logout}
                                                        className="nav-link w-nav-link w--nav-link-open"
                                                    >
                                                        Log uit
                                                    </a>
                                                </React.Fragment>
                                            );
                                        }}
                                    </AuthConsumer>
                                </div>
                            </Menu>
                        </Col>
                    </Row>
                </Container>
            </div>
        </header>
    );
}

export default withRouter(Header);
