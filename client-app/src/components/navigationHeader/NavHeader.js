import React from 'react';
import SvgIcon from 'react-icons-kit';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Logo from '../logo/Logo';
import NavSearch from './NavSearch';
import { question } from 'react-icons-kit/icomoon/question';

const NavHeader = props => {
    const heightLogo = '44px';

    return (
        <nav className="navbar navbar-default navbar-fixed-top">
            <div className="fluid-container row-eq-height">
                <div className="col-xs-2 col-md-1 nav-item">
                    <a className="btn btn-sm" onClick={props.toggleMenuStuck}>
                        {props.menuStuck ? (
                            <span className="glyphicon glyphicon-option-vertical close-menu-option-vertical" />
                        ) : (
                            <span className="glyphicon glyphicon-menu-hamburger" />
                        )}
                    </a>
                    <a
                        href="https://alfresco.econobis.nl"
                        title="Als je op (?) help klikt dan kom je uit op de Alfreco Econobis Community Portaal. Hier vind je al informatie over het gebruik van Econobis. Je kan inloggen op de site met je inlog gegevens van Econobis. Kom je er niet uit stuur dan een mail naar support@econobis.nl"
                    >
                        <SvgIcon size={20} icon={question} />
                    </a>
                </div>
                <div className="col-md-2 hidden-xs hidden-sm">
                    <Logo height={heightLogo} />
                </div>
                <div className="col-md-2 hidden-xs hidden-sm nav-item">
                    <NavSearch />
                </div>
                <div className="col-xs-8 col-md-4 col-md-offset-1 nav-item">
                    <ul className="nav navbar-nav">
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button">
                                {props.meDetails.fullName} <span className="caret" />
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link to="loguit">Uitloggen</Link>
                                </li>
                                <li onClick={props.toggleChangePassword}>
                                    <Link>Wachtwoord wijzigen</Link>
                                </li>
                                <li>
                                    <Link>{props.versionNumber}</Link>
                                </li>
                                <li onClick={props.toggleAboutUs}>
                                    <Link>Over ons</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

function mapStateToProps(state) {
    return {
        meDetails: state.meDetails,
        versionNumber: state.systemData.versionNumber,
    };
}

export default connect(
    mapStateToProps,
    null
)(NavHeader);
