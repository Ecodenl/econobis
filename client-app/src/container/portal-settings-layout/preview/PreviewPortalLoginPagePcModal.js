import React, { Component } from 'react';
import '../../../../../public/portal/portal.css';
class PreviewPortalLoginPagePcModal extends Component {
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
        const logoUrl = this.props.attachmentLogo.preview ? this.props.attachmentLogo.preview : this.props.logoUrl;

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
            authorizationContainer: {
                position: 'initial',
                height: '85vh',
                width: '96vw',
                border: '2px solid #000',
                overflow: 'auto',
            },
            fullHeight: {
                height: '100vh',
            },
            justifyContentCenter: {
                justifyContent: 'center',
            },
            alignContentCenter: {
                alignContent: 'center',
            },
            row: {
                display: 'flex',
                flexWrap: 'wrap',
                marginRight: '-15px',
                marginLeft: '-15px',
            },
        };

        const fullHeightJustifyAlignContentCenterRow = {
            ...customStyles.fullHeight,
            ...customStyles.justifyContentCenter,
            ...customStyles.alignContentCenter,
            ...customStyles.row,
        };
        const justifyContentCenterRow = {
            ...customStyles.justifyContentCenter,
            ...customStyles.row,
        };

        return (
            <div
                // className="modal col-md-10 margin-50-top"
                style={customStyles.modal}
                onClick={this.props.closeModal}
                title={'Klik om preview te sluiten'}
            >
                <div id="root">
                    <div
                        className="authorization-container container-fluid"
                        style={customStyles.authorizationContainer}
                    >
                        <div style={fullHeightJustifyAlignContentCenterRow}>
                            <div>
                                <img src={logoUrl} alt="" className="image logo-container" />
                                <form>
                                    <input
                                        type="text"
                                        className="text-input w-input   "
                                        id="username"
                                        name="username"
                                        placeholder="E-mailadres"
                                        value=""
                                        readOnly={true}
                                    />
                                    <input
                                        type="password"
                                        className="text-input w-input   "
                                        id="password"
                                        name="password"
                                        placeholder="Wachtwoord"
                                        value=""
                                        readOnly={true}
                                    />
                                    <button className="authorization-button btn btn-primary btn-sm">
                                        <span>Log in</span>
                                    </button>
                                </form>
                                <div style={justifyContentCenterRow}>
                                    <a className="authorization-link">Wachtwoord vergeten?</a>
                                </div>
                                <div style={justifyContentCenterRow}>
                                    <a className="authorization-link">Nieuw bij ...</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PreviewPortalLoginPagePcModal;
