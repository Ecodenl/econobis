import React, { useState, useEffect, useRef } from 'react';
import { AuthConsumer } from '../context/AuthContext';
import { Link, withRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function Header({ location }) {
    const [showNav, toggleShowNav] = useState(false);

    /**
     * Hook that alerts clicks outside of the passed ref
     */
    function useOutsideAlerter(ref) {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                toggleShowNav(false);
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
        <>
            <header>
                <div className="header-deltaw">
                    <div className="profile-pic corporate" />
                    <Container>
                        {/* Hambuger menu */}
                        {!showNav ? (
                            <Row className="justify-content-end">
                                <div className="menu-button w-nav-button" onClick={() => toggleShowNav(!showNav)}>
                                    <div className="icon w-icon-nav-menu" />
                                </div>
                            </Row>
                        ) : null}
                    </Container>
                </div>
            </header>

            <AuthConsumer>
                {({ logout }) => {
                    return (
                        <React.Fragment>
                            {showNav ? (
                                <div
                                    className="w-nav-overlay"
                                    data-wf-ignore=""
                                    style={{ height: '100vh', display: 'block', maxWidth: '588px', top: 0 }}
                                    ref={wrapperRef}
                                >
                                    <nav
                                        role="navigation"
                                        className="nav-menu w-nav-menu w--nav-menu-open"
                                        style={{
                                            height: '100vh',
                                        }}
                                    >
                                        <h6 className="heading in-menu">MENU</h6>
                                        <Link
                                            to={'/gegevens'}
                                            className={`nav-link w-nav-link w--nav-link-open ${
                                                location.pathname === '/gegevens' ? 'w--current' : ''
                                            }`}
                                            onClick={() => toggleShowNav(!showNav)}
                                        >
                                            Gegevens
                                        </Link>
                                        <Link
                                            to={'/gegevens-zakelijk'}
                                            className={`nav-link w-nav-link w--nav-link-open ${
                                                location.pathname === '/gegevens-zakelijk' ? 'w--current' : ''
                                            }`}
                                            onClick={() => toggleShowNav(!showNav)}
                                        >
                                            Gegevens zakelijk
                                        </Link>
                                        <Link
                                            to={'/mijn-interessegebieden'}
                                            className={`nav-link w-nav-link w--nav-link-open ${
                                                location.pathname === '/mijn-interessegebieden' ? 'w--current' : ''
                                            }`}
                                            onClick={() => toggleShowNav(!showNav)}
                                        >
                                            Mijn interessegebieden
                                        </Link>

                                        <Link
                                            to={'/inschrijven/kapitaal/project-x'}
                                            className={`nav-link w-nav-link w--nav-link-open ${
                                                location.pathname === '/inschrijven/kapitaal/project-x'
                                                    ? 'w--current'
                                                    : ''
                                            }`}
                                            onClick={() => toggleShowNav(!showNav)}
                                        >
                                            Mijn inschrijving
                                        </Link>

                                        <a href="#" onClick={logout} className="nav-link w-nav-link w--nav-link-open ">
                                            Log uit
                                        </a>
                                    </nav>
                                </div>
                            ) : null}
                        </React.Fragment>
                    );
                }}
            </AuthConsumer>
        </>
    );
}

export default withRouter(Header);
