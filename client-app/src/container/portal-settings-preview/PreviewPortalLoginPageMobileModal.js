import React, { Component } from 'react';
// import '../../../../public/portal/portal.css';
import PreviewPortalLoginPage from './PreviewPortalLoginPage';

class PreviewPortalLoginPageMobileModal extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const imageBgLoginUrl = this.props.attachmentImageBgLogin.preview
            ? this.props.attachmentImageBgLogin.preview
            : this.props.imageBgLoginUrl;
        document.documentElement.style.setProperty('--main-login-background-image-url', 'url(' + imageBgLoginUrl + ')');

        if (this.props.previewFromLayout) {
            document.documentElement.style.setProperty(
                '--portal-main-background-color',
                this.props.portalMainBackgroundColor
            );
            document.documentElement.style.setProperty('--portal-main-text-color', this.props.portalMainTextColor);
            document.documentElement.style.setProperty('--portal-background-color', this.props.portalBackgroundColor);
            document.documentElement.style.setProperty(
                '--portal-background-text-color',
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
            closePreview: {
                padding: '0',
                position: 'fixed',
                top: '70px',
                left: '10px',
                zIndex: '10',
            },
            closePreviewButton: {
                backgroundColor: 'red',
                color: 'white',
                borderColor: 'black',
                padding: '5px 10px',
                fontSize: '12px',
                lineHeight: '1.5',
                borderRadius: '3px',
            },
            authorizationContainer: {
                maxHeight: '700px',
                width: '400px',
                overflow: 'hidden',
                borderRadius: '25px',
                border: '5px solid #000',
                padding: '0',
            },
            fullHeight: {
                height: '100vh',
                maxHeight: '700px',
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
                flex: '0 0 100%',
                maxWidth: '80%',
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

export default PreviewPortalLoginPageMobileModal;
