import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { toggleSidebar } from '../../actions/SidebarActions';
import Logo from '../logo/Logo';
import NavSearch from './NavSearch';

const NavHeader = (props) => {
    const toggleSidebar = () => {
        props.toggleSidebar();
    };

    const userName = (props.userDetails ? props.userDetails.name : '');
    const heightLogo = '44px';

    return (
        <nav className="navbar navbar-default navbar-fixed-top">
            <div className="fluid-container">
                <div className="col-xs-2 col-md-1 nav-item">
                    <a className="btn btn-sm" onClick={toggleSidebar}>
                        <span className="glyphicon glyphicon-menu-hamburger" />
                    </a>
                </div>
                <div className="col-md-2 hidden-xs hidden-sm">
                    <Logo height={heightLogo} />
                </div>
                <div className="col-md-2 hidden-xs hidden-sm nav-item">
                    <NavSearch />
                </div>
                <div className="col-xs-10 col-md-4 col-md-offset-1 nav-item">
                    <ul className="nav navbar-nav">
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button">
                                { userName } <span className="caret" />
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link to="loguit">Uitloggen</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className="col-md-2 hidden-sm hidden-xs nav-item">
                    <h5 className="text-center">Meldingen: <strong>3</strong></h5>
                </div>
            </div>
        </nav>
    );
};

function mapStateToProps(state) {
    return {
        userDetails: state.userDetails,
    };
}

const mapDispatchToProps = dispatch => ({
    toggleSidebar: () => {
        dispatch(toggleSidebar());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavHeader);
