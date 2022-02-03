import React, { Component } from 'react';
import '../../../../../public/portal/portal.css';
import PreviewPortalLoginPage from './PreviewPortalLoginPage';

class PreviewPortalLoginPagePcModal extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const imageBgLoginUrl = this.props.attachmentImageBgLogin.preview
            ? this.props.attachmentImageBgLogin.preview
            : this.props.imageBgLoginUrl;
        document.documentElement.style.setProperty('--main-login-background-image-url', 'url(' + imageBgLoginUrl + ')');

        if (this.props.previewFromLayout) {
            document.documentElement.style.setProperty('--main-primary-color', this.props.portalBackgroundColor);
            document.documentElement.style.setProperty(
                '--main-primary-text-color',
                this.props.portalBackgroundTextColor
            );
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
            col: {
                flex: '0 0 250px',
                maxWidth: '250px',
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
            <PreviewPortalLoginPage
                closeModal={this.props.closeModal}
                customStyles={customStyles}
                fullHeightJustifyAlignContentCenterRow={fullHeightJustifyAlignContentCenterRow}
                justifyContentCenterRow={justifyContentCenterRow}
                logoUrl={logoUrl}
            />
        );
    }
}

export default PreviewPortalLoginPagePcModal;
