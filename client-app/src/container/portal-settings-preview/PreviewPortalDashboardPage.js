import React from 'react';
import { getApiUrl } from '../../api/utils/ApiUrl';
import { FaUser } from 'react-icons/fa';

const PreviewPortalDashboardPage = ({
    closeModal,
    customStyles,
    logoHeaderUrl,
    imageHash,
    dashboardSettings,
    setShowMenu,
    showMenu,
}) => {
    const {
        welcomeTitle,
        welcomeMessage,
        widgets,
        defaultWidgetBackgroundColor,
        defaultWidgetTextColor,
    } = dashboardSettings;

    const defaultCardStyle = {
        backgroundColor: defaultWidgetBackgroundColor,
        color: defaultWidgetTextColor,
    };

    return (
        <div className="preview-portal">
            <div style={customStyles.modal} className="portal-body">
                <div id="root" style={customStyles.root}>
                    <div style={customStyles.closePreview}>
                        <button style={customStyles.closePreviewButton} onClick={closeModal}>
                            Sluiten preview
                        </button>
                    </div>
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
                                <div style={customStyles.container}>
                                    <div style={customStyles.row}>
                                        <div style={customStyles.col_6}>
                                            <div style={customStyles.headerLogo}>
                                                <img
                                                    src={logoHeaderUrl}
                                                    alt="logo"
                                                    style={customStyles.logoContainer}
                                                />
                                            </div>
                                        </div>
                                        <div style={customStyles.col_6}>
                                            <div
                                                className="d-flex justify-content-end"
                                                style={customStyles.justifyContentEnd}
                                            >
                                                <div
                                                    className="bm-burger-button text-center"
                                                    onClick={setShowMenu}
                                                    title={'Preview menu'}
                                                >
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
                                                        <small
                                                            className="account-dropdown-text"
                                                            style={{ fontSize: '10px' }}
                                                        >
                                                            ACCOUNT
                                                        </small>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {showMenu ? (
                                <div>
                                    <div
                                        className="bm-overlay"
                                        style={{
                                            position: 'fixed',
                                            zIndex: '1000',
                                            width: '0',
                                            height: '100%',
                                            background: 'rgba(0, 0, 0, 0.3) none repeat scroll 0% 0%',
                                            opacity: '1',
                                            transition: 'opacity 0.3s ease 0s',
                                        }}
                                    ></div>
                                    <div
                                        id=""
                                        // className="bm-menu-wrap"
                                        style={{
                                            position: 'absolute',
                                            right: '0px',
                                            top: '0px',
                                            zIndex: '1100',
                                            width: '300px',
                                            height: '100%',
                                            transition: 'all 0.5s ease 0s',
                                        }}
                                    >
                                        <div
                                            className="bm-menu"
                                            style={{
                                                height: '94%',
                                                boxSizing: 'border-box',
                                                overflow: 'auto',
                                            }}
                                        >
                                            <nav className="bm-item-list" style={{ height: '100%' }}>
                                                <div
                                                    className="bm-item sidebar-menu"
                                                    style={{ display: 'block', overflowY: 'none', overflowX: 'none' }}
                                                    tabIndex="0"
                                                >
                                                    <h6
                                                        className="heading in-menu"
                                                        style={{
                                                            fontWeight: 'bold',
                                                            marginBottom: '10px',
                                                            lineHeight: '18px',
                                                            display: 'block',
                                                        }}
                                                    >
                                                        MENU
                                                    </h6>
                                                    <a
                                                        className="nav-link "
                                                        style={{
                                                            padding: '20px',
                                                            textAlign: 'left',
                                                            marginLeft: 'auto',
                                                            marginRight: 'auto',
                                                            textDecoration: 'none',
                                                            display: 'block',
                                                            position: 'relative',
                                                        }}
                                                        // href="#/inschrijvingen-projecten"
                                                    >
                                                        Huidige deelnames
                                                    </a>
                                                    <a
                                                        className="nav-link "
                                                        style={{
                                                            padding: '20px',
                                                            textAlign: 'left',
                                                            marginLeft: 'auto',
                                                            marginRight: 'auto',
                                                            textDecoration: 'none',
                                                            display: 'block',
                                                            position: 'relative',
                                                        }}
                                                        // href="#/gegevens"
                                                    >
                                                        Gegevens
                                                    </a>
                                                    <a
                                                        className="nav-link "
                                                        style={{
                                                            padding: '20px',
                                                            textAlign: 'left',
                                                            marginLeft: 'auto',
                                                            marginRight: 'auto',
                                                            textDecoration: 'none',
                                                            display: 'block',
                                                            position: 'relative',
                                                        }}
                                                        // href="#/inschrijven-projecten"
                                                    >
                                                        Inschrijven projecten
                                                    </a>
                                                    <a
                                                        className="nav-link "
                                                        style={{
                                                            padding: '20px',
                                                            textAlign: 'left',
                                                            marginLeft: 'auto',
                                                            marginRight: 'auto',
                                                            textDecoration: 'none',
                                                            display: 'block',
                                                            position: 'relative',
                                                        }}
                                                        // href="#/over-ons"
                                                    >
                                                        Over ons
                                                    </a>
                                                </div>
                                            </nav>
                                        </div>
                                        <div>
                                            <div
                                                className="bm-cross-button"
                                                style={{
                                                    position: 'absolute',
                                                    width: '24px',
                                                    height: '24px',
                                                    right: '8px',
                                                    top: '8px',
                                                }}
                                            >
                                                <span style={{ position: 'absolute', top: '6px', right: '14px' }}>
                                                    <span
                                                        className="bm-cross"
                                                        style={{
                                                            position: 'absolute',
                                                            width: '3px',
                                                            height: '14px',
                                                            transform: 'rotate(45deg)',
                                                        }}
                                                    ></span>
                                                    <span
                                                        className="bm-cross"
                                                        style={{
                                                            position: 'absolute',
                                                            width: '3px',
                                                            height: '14px',
                                                            transform: 'rotate(-45deg)',
                                                        }}
                                                    ></span>
                                                </span>
                                                <button
                                                    style={{
                                                        position: 'absolute',
                                                        left: '0px',
                                                        top: '0px',
                                                        width: '100%',
                                                        height: '100%',
                                                        margin: '0px',
                                                        padding: '0px',
                                                        border: 'medium none',
                                                        fontSize: '0px',
                                                        background: 'transparent none repeat scroll 0% 0%',
                                                        cursor: 'pointer',
                                                    }}
                                                    tabIndex="0"
                                                    onClick={setShowMenu}
                                                >
                                                    Close Menu
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                        </header>
                        <div className="content-section">
                            <div style={customStyles.wContainer}>
                                <div style={customStyles.row}>
                                    <div style={customStyles.col}>
                                        <h1
                                            className="content-heading mt-0 text-center"
                                            style={customStyles.contentHeading}
                                        >
                                            {welcomeTitle}
                                        </h1>
                                        <p className="text-center" style={{ whiteSpace: 'break-spaces' }}>
                                            {welcomeMessage}
                                        </p>
                                    </div>
                                </div>
                                <div style={customStyles.row}>
                                    {widgets
                                        .filter(w => w.active)
                                        .sort((a, b) => (a.order > b.order ? 1 : -1))
                                        .map(widget => {
                                            const imageSrc =
                                                widget.image && widget.image.preview
                                                    ? widget.image.preview
                                                    : `${getApiUrl()}/portal/images/${
                                                          widget.widgetImageFileName
                                                      }?${imageHash}`;
                                            const cardStyle = {
                                                backgroundColor: `${
                                                    widget.backgroundColor
                                                        ? widget.backgroundColor
                                                        : widget.backgroundColorUsed
                                                }`,
                                                color: `${widget.textColor ? widget.textColor : widget.textColorUsed}`,
                                            };
                                            return (
                                                <div style={customStyles.col_widget}>
                                                    <div id={widget.codeRef} style={customStyles.card}>
                                                        <div style={cardStyle}>
                                                            <img style={customStyles.cardImgTop} src={imageSrc} />
                                                            <div style={customStyles.cardBody}>
                                                                <h5 style={customStyles.cardTitle}>{widget.title}</h5>
                                                                <p
                                                                    style={customStyles.cardText}
                                                                    style={{ whiteSpace: 'break-spaces' }}
                                                                >
                                                                    {widget.text}
                                                                </p>
                                                                <button className="w-button btn btn-primary btn-sm">
                                                                    {widget.buttonText}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                </div>
                                <div style={customStyles.row}>
                                    <div style={customStyles.col_widget}>
                                        <div id="widget-contact-details" style={customStyles.card}>
                                            <div style={defaultCardStyle}>
                                                <div style={customStyles.cardBody}>
                                                    <h5 style={customStyles.cardTitle}>Naam Account</h5>
                                                    <div style={customStyles.cardText}>
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
                                    </div>
                                    <div style={customStyles.col_widget}>
                                        <div id="widget-switch-contact" style={customStyles.card}>
                                            <div style={defaultCardStyle}>
                                                <div style={customStyles.cardBody}>
                                                    <h5 style={customStyles.cardTitle}>Wissel van contact</h5>
                                                    <div
                                                        style={customStyles.cardText}
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent: 'left',
                                                            overflowX: 'auto',
                                                        }}
                                                    >
                                                        <button
                                                            id="user-1"
                                                            style={{ margin: '5px' }}
                                                            type="button"
                                                            className="w-button btn btn-primary btn-sm btn btn-primary"
                                                        >
                                                            Naam account 1
                                                        </button>
                                                        <button
                                                            id="user-2"
                                                            style={{ margin: '5px' }}
                                                            type="button"
                                                            className="w-button btn btn-primary btn-sm btn btn-primary"
                                                        >
                                                            Naam account 2
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewPortalDashboardPage;
