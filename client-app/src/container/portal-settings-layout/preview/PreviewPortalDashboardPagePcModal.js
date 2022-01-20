import React, { Component } from 'react';
import '../../../../../public/portal/portal.css';
import { FaUser } from 'react-icons/fa';

class PreviewPortalDashboardPagePcModal extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const imageBgLoginUrl = this.props.attachmentImageBgLogin.preview
            ? this.props.attachmentImageBgLogin.preview
            : this.props.imageBgLoginUrl;
        document.documentElement.style.setProperty('--main-login-background-image-url', 'url(' + imageBgLoginUrl + ')');

        const imageBgHeaderUrl = this.props.attachmentImageBgLogin.preview
            ? this.props.attachmentImageBgLogin.preview
            : this.props.imageBgLoginUrl;
        document.documentElement.style.setProperty(
            '--main-header-background-image-url',
            'url(' + imageBgHeaderUrl + ')'
        );

        document.documentElement.style.setProperty('--main-primary-color', this.props.portalBackgroundColor);
        document.documentElement.style.setProperty('--main-primary-text-color', this.props.portalBackgroundTextColor);
        document.documentElement.style.setProperty('--main-primary-rgba', this.props.loginHeaderBackgroundColor);
        document.documentElement.style.setProperty(
            '--main-primary-rgba-text-color',
            this.props.loginHeaderBackgroundTextColor
        );
        document.documentElement.style.setProperty('--main-header-portal-icon-color', this.props.headerIconsColor);
        document.documentElement.style.setProperty('--main-secondary-color', this.props.loginFieldBackgroundColor);
        document.documentElement.style.setProperty(
            '--main-secondary-text-color',
            this.props.loginFieldBackgroundTextColor
        );
        document.documentElement.style.setProperty('--button-primary-color', this.props.buttonColor);
        document.documentElement.style.setProperty('--button-primary-text-color', this.props.buttonTextColor);
    }

    render() {
        const logoHeaderUrl = this.props.attachmentLogoHeader.preview
            ? this.props.attachmentLogoHeader.preview
            : this.props.logoHeaderUrl;

        const customStyles = {
            modal: {
                position: 'fixed',
                top: '10vh',
                right: '0',
                bottom: '0',
                left: '2vw',
                zIndex: '1050',
                display: 'inline',
                overflow: 'hidden',
                outline: '0',
            },
            body_2: {
                height: '85vh',
                width: '96vw',
                backgroundColor: '#fff',
                overflowWrap: 'initial',
                // borderRadius: '4px',
                border: '2px solid #000',
                fontFamily: 'Montserrat, sans-serif',
                overflow: 'auto',
            },
            col_6: {
                flex: '0 0 50%',
                maxWidth: '50%',
                position: 'relative',
                width: '100%',
                paddingLeft: '15px',
                paddingRight: '15px',
            },
            justifyContentEnd: {
                justifyContent: 'flex-end',
                display: 'flex',
            },
            row: {
                display: 'flex',
                flexWrap: 'wrap',
                marginRight: '-15px',
                marginLeft: '-15px',
            },
            col: {
                flexBasis: '0',
                flexGrow: '1',
                maxWidth: '100%',
                position: 'relative',
                width: '100%',
                paddingLeft: '15px',
                paddingRight: '15px',
            },
            wContainer: {
                marginLeft: 'auto',
                marginRight: 'auto',
                maxWidth: '940px',
            },
            card: {
                marginTop: '30px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                minWidth: '0',
                wordWrap: 'break-word',
                backgroundColor: '#fff',
                backgroundClip: 'border-box',
                border: '1px solid rgba(0,0,0,.125)',
                borderRadius: '.25rem',
            },
            cardBody: {
                flex: '1 1 auto',
                padding: '1.25rem',
            },
        };

        return (
            <div
                // className="modal col-md-10 margin-50-top"
                style={customStyles.modal}
                onClick={this.props.closeModal}
                title={'Klik om preview te sluiten'}
            >
                <div id="root">
                    <div id="body-2" style={customStyles.body_2}>
                        <header>
                            <div className="header-portal">
                                <div className="profile-pic">
                                    <div className="dropdown">
                                        Naam
                                        <br />
                                        Account
                                    </div>
                                </div>
                                <div className="container">
                                    <div style={customStyles.row}>
                                        <div style={customStyles.col_6}>
                                            <div className="header-logo">
                                                <img src={logoHeaderUrl} alt="" className="image logo-container" />
                                            </div>
                                        </div>
                                        <div style={customStyles.col_6}>
                                            <div
                                                className="d-flex justify-content-end"
                                                style={customStyles.justifyContentEnd}
                                            >
                                                <div className="bm-burger-button text-center">
                                                    <span>
                                                        <span className="bm-burger-bars bm-burger-bar-1"></span>
                                                        <span className="bm-burger-bars bm-burger-bar-2"></span>
                                                        <span className="bm-burger-bars bm-burger-bar-3"></span>
                                                    </span>
                                                    <br />
                                                    <small style={{ fontSize: '10px', marginLeft: '-3.5px' }}>
                                                        MENU
                                                    </small>
                                                </div>
                                                <div className="dropdown">
                                                    <button
                                                        aria-haspopup="true"
                                                        aria-expanded="false"
                                                        id="account-dropdown"
                                                        style={{ padding: '0px', marginTop: '20px' }}
                                                        type="button"
                                                        className="dropdown-toggle btn btn-primary"
                                                    >
                                                        <FaUser />
                                                        <br />
                                                        <small style={{ fontSize: '10px' }}>ACCOUNT</small>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*<div>*/}
                            {/*    <div*/}
                            {/*        className="bm-overlay"*/}
                            {/*        style={{*/}
                            {/*            position: 'fixed',*/}
                            {/*            zIndex: '1000',*/}
                            {/*            width: '100%',*/}
                            {/*            height: '100%',*/}
                            {/*            background: 'rgba(0, 0, 0, 0.3) none repeat scroll 0% 0%',*/}
                            {/*            opacity: '0',*/}
                            {/*            transform: 'translate3d(100%, 0px, 0px)',*/}
                            {/*            transition: 'opacity 0.3s ease 0s, transform 0s ease 0.3s',*/}
                            {/*        }}*/}
                            {/*    ></div>*/}
                            {/*    <div*/}
                            {/*        id=""*/}
                            {/*        className="bm-menu-wrap"*/}
                            {/*        style={{*/}
                            {/*            position: 'fixed',*/}
                            {/*            right: '0px',*/}
                            {/*            zIndex: '1100',*/}
                            {/*            width: '300px',*/}
                            {/*            height: '100%',*/}
                            {/*            transform: 'translate3d(100%, 0px, 0px)',*/}
                            {/*            transition: 'all 0.5s ease 0s',*/}
                            {/*        }}*/}
                            {/*    >*/}
                            {/*        <div*/}
                            {/*            className="bm-menu"*/}
                            {/*            style={{ height: '100%', boxSizing: 'border-box', overflow: 'auto' }}*/}
                            {/*        >*/}
                            {/*            <nav className="bm-item-list" style={{ height: '100%' }}>*/}
                            {/*                <div*/}
                            {/*                    className="bm-item sidebar-menu"*/}
                            {/*                    style={{ display: 'block' }}*/}
                            {/*                    tabIndex="-1"*/}
                            {/*                >*/}
                            {/*                    <h6 className="heading in-menu">MENU</h6>*/}
                            {/*                    <a className="nav-link w-nav-link w--nav-link-open ">*/}
                            {/*                        Huidige deelnames*/}
                            {/*                    </a>*/}
                            {/*                    <a className="nav-link w-nav-link w--nav-link-open ">Gegevens</a>*/}
                            {/*                    <a className="nav-link w-nav-link w--nav-link-open ">*/}
                            {/*                        Inschrijven projecten*/}
                            {/*                    </a>*/}
                            {/*                    <a className="nav-link w-nav-link w--nav-link-open ">Over ons</a>*/}
                            {/*                </div>*/}
                            {/*            </nav>*/}
                            {/*        </div>*/}
                            {/*        <div>*/}
                            {/*            <div*/}
                            {/*                className="bm-cross-button"*/}
                            {/*                style={{*/}
                            {/*                    position: 'absolute',*/}
                            {/*                    width: '24px',*/}
                            {/*                    height: '24px',*/}
                            {/*                    right: '8px',*/}
                            {/*                    top: '8px',*/}
                            {/*                }}*/}
                            {/*            >*/}
                            {/*                <span style={{ position: 'absolute', top: '6px', right: '14px' }}>*/}
                            {/*                    <span*/}
                            {/*                        className="bm-cross"*/}
                            {/*                        style={{*/}
                            {/*                            position: 'absolute',*/}
                            {/*                            width: '3px',*/}
                            {/*                            height: '14px',*/}
                            {/*                            transform: 'rotate(45deg)',*/}
                            {/*                        }}*/}
                            {/*                    ></span>*/}
                            {/*                    <span*/}
                            {/*                        className="bm-cross"*/}
                            {/*                        style={{*/}
                            {/*                            position: 'absolute',*/}
                            {/*                            width: '3px',*/}
                            {/*                            height: '14px',*/}
                            {/*                            transform: 'rotate(-45deg)',*/}
                            {/*                        }}*/}
                            {/*                    ></span>*/}
                            {/*                </span>*/}
                            {/*                <button*/}
                            {/*                    style={{*/}
                            {/*                        position: 'absolute',*/}
                            {/*                        left: '0px',*/}
                            {/*                        top: '0px',*/}
                            {/*                        width: '100%',*/}
                            {/*                        height: '100%',*/}
                            {/*                        margin: '0px',*/}
                            {/*                        padding: '0px',*/}
                            {/*                        border: 'medium none',*/}
                            {/*                        fontSize: '0px',*/}
                            {/*                        background: 'transparent none repeat scroll 0% 0%',*/}
                            {/*                        cursor: 'pointer',*/}
                            {/*                    }}*/}
                            {/*                    tabIndex="-1"*/}
                            {/*                >*/}
                            {/*                    Close Menu*/}
                            {/*                </button>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </header>
                        <div className="content-section">
                            <div style={customStyles.wContainer}>
                                <div style={customStyles.row}>
                                    <div style={customStyles.col}>
                                        <h1 className="content-heading mt-0 text-center">
                                            Welkom op jouw energie gemeenschap
                                        </h1>
                                    </div>
                                </div>
                                <div style={customStyles.row}>
                                    <div style={customStyles.col_6}>
                                        <div id="widget-over-ons" style={customStyles.card}>
                                            <img
                                                className="card-img-top"
                                                src={`${URL_API}/portal/images/over-ons.png`}
                                            />
                                            <div style={customStyles.cardBody}>
                                                <h5 className="card-title">Over ons</h5>
                                                <p className="card-text" style={{ whiteSpace: 'break-spaces' }}>
                                                    Vind hier onze contact gegevens
                                                </p>
                                                <button className="w-button btn btn-primary btn-sm">Over Ons</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={customStyles.col_6}>
                                        <div id="widget-project-schrijf-je-in" style={customStyles.card}>
                                            <img
                                                className="card-img-top"
                                                src={`${URL_API}/portal/images/project-schrijf-je-in.png`}
                                            />
                                            <div style={customStyles.cardBody}>
                                                <h5 className="card-title">Projecten</h5>
                                                <p className="card-text" style={{ whiteSpace: 'break-spaces' }}>
                                                    Doe mee met onze projecten en participeer
                                                </p>
                                                <button className="w-button btn btn-primary btn-sm">Projecten</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={customStyles.col_6}>
                                        <div id="widget-huidige-deelnames" style={customStyles.card}>
                                            <img
                                                className="card-img-top"
                                                src={`${URL_API}/portal/images/huidige-deelnames.png`}
                                            />
                                            <div style={customStyles.cardBody}>
                                                <h5 className="card-title">Huidige deelnames</h5>
                                                <p className="card-text" style={{ whiteSpace: 'break-spaces' }}>
                                                    Vind hier de projecten waar aan je deelneemt
                                                </p>
                                                <button className="w-button btn btn-primary btn-sm">
                                                    Huidige deelnames
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={customStyles.row}>
                                    <div style={customStyles.col_6}>
                                        <div id="widget-contact-details" style={customStyles.card}>
                                            <div style={customStyles.cardBody}>
                                                <h5 className="card-title">Naam Account</h5>
                                                <div className="card-text">
                                                    <div>
                                                        <b>Bezoekadres</b>
                                                        <br />
                                                        Straat 1
                                                        <br />
                                                        1234 AB Plaats, Nederland
                                                    </div>
                                                    <div>
                                                        <br />
                                                        <b>Telefoon</b>
                                                        <br />
                                                        012-3456789
                                                    </div>
                                                    <div>
                                                        <br />
                                                        <b>E-mail</b>
                                                        <br />
                                                        email@adres.nl
                                                    </div>
                                                </div>
                                                <br />
                                                <button className="w-button btn btn-primary btn-sm">
                                                    Gegevens beheren
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {/*<div style={customStyles.col_6}>*/}
                                    {/*    <div id="widget-switch-contact" style={customStyles.card}>*/}
                                    {/*        <div style={customStyles.cardBody}>*/}
                                    {/*            <h5 className="card-title">Wissel van contact</h5>*/}
                                    {/*            <div*/}
                                    {/*                className="card-text"*/}
                                    {/*                style={{*/}
                                    {/*                    display: 'flex',*/}
                                    {/*                    justifyContent: 'space-between',*/}
                                    {/*                    overflowX: 'auto',*/}
                                    {/*                }}*/}
                                    {/*            >*/}
                                    {/*                <button*/}
                                    {/*                    id="user-1"*/}
                                    {/*                    style={{ margin: '5px' }}*/}
                                    {/*                    type="button"*/}
                                    {/*                    className="w-button btn btn-primary btn-sm btn btn-primary"*/}
                                    {/*                >*/}
                                    {/*                    Naam account*/}
                                    {/*                </button>*/}
                                    {/*                <button*/}
                                    {/*                    id="user-2"*/}
                                    {/*                    disabled=""*/}
                                    {/*                    style={{ margin: '5px' }}*/}
                                    {/*                    type="button"*/}
                                    {/*                    className="w-button btn btn-primary btn-sm btn btn-primary"*/}
                                    {/*                >*/}
                                    {/*                    Naam account*/}
                                    {/*                </button>*/}
                                    {/*            </div>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PreviewPortalDashboardPagePcModal;
