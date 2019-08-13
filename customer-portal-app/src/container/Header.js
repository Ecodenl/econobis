import React from 'react';
import { AuthConsumer } from '../context/AuthContext';
import { Link, withRouter } from 'react-router-dom';

function Header({ location }) {
    return (
        <header>
            <AuthConsumer>
                {({ isAuth, logout }) => {
                    return (
                        <React.Fragment>
                            {isAuth ? (
                                <div
                                    data-collapse="all"
                                    data-animation="over-right"
                                    data-duration="400"
                                    className="navbar w-nav"
                                >
                                    <div className="container w-container">
                                        <nav role="navigation" className="nav-menu w-nav-menu">
                                            <h6 className="heading in-menu">MENU</h6>
                                            <Link
                                                to={'account-info'}
                                                className={`nav-link w-nav-link w--nav-link-open ${
                                                    location.pathname === '/account-info' ? 'w--current' : ''
                                                }`}
                                            >
                                                Gegevens
                                            </Link>
                                            <Link
                                                to={'account-info-corp'}
                                                className={`nav-link w-nav-link w--nav-link-open ${
                                                    location.pathname === '/account-info-corp' ? 'w--current' : ''
                                                }`}
                                            >
                                                Gegevens zakelijk
                                            </Link>
                                            <a
                                                href="settings.html"
                                                className={`nav-link w-nav-link ${
                                                    location.pathname ? 'w--current' : ''
                                                }`}
                                            >
                                                Mijn interessegebieden
                                            </a>

                                            <a href="#" onClick={logout} className="nav-link w-nav-link">
                                                Log uit
                                            </a>
                                        </nav>
                                        <div className="menu-button w-nav-button">
                                            <div className="icon w-icon-nav-menu" />
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                            <div className="header-deltaw">
                                <div className="profile-pic corporate" />
                            </div>
                        </React.Fragment>
                    );
                }}
            </AuthConsumer>
        </header>
    );
}

export default withRouter(Header);
