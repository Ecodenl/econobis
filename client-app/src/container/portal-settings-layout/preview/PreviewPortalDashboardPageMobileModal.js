import React, { Component } from 'react';
import '../../../../../public/portal/portal.css';
import PreviewPortalDashboardPage from './PreviewPortalDashboardPage';

class PreviewPortalDashboardPageMobileModal extends Component {
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
                left: '37%',
                zIndex: '1050',
                display: 'inline',
                overflow: 'hidden',
                outline: '0',
                width: '410px',
                borderRadius: '25px',
                border: '5px solid #000',
                maxHeight: '700px',
            },
            root: {
                padding: '0',
                backgroundColor: '#fff',
                width: '400px',
            },
            body_2: {
                maxHeight: '700px',
                width: '425px',
                overflow: 'auto',
                backgroundColor: '#fff',
                overflowWrap: 'initial',
                fontFamily: 'Montserrat, sans-serif',
                paddingBottom: '1%',
            },
            container: {
                width: '100%',
                paddingLeft: '15px',
                paddingRight: '15px',
                marginRight: 'auto',
                marginLeft: 'auto',
            },
            col_6: {
                flex: '0 0 50%',
                maxWidth: '50%',
                position: 'relative',
                width: '100%',
                paddingLeft: '15px',
                paddingRight: '15px',
            },
            headerLogo: {
                maxWidth: '100px',
                padding: '14px 0',
            },
            logoContainer: {
                maxHeight: '100px',
                maxWidth: '100%',
                verticalAlign: 'middle',
                display: 'inline-block',
            },
            col_widget: {
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
            contentHeading: {
                color: 'var(--main-primary-color)',
                fontSize: '24px',
                fontWeight: '400',
                textShadow: 'none',
                marginTop: '0',
                lineHeight: '44px',
                marginBottom: '10px',
            },
            wContainer: {
                marginLeft: 'auto',
                marginRight: 'auto',
                maxWidth: '360px',
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
            cardImgTop: {
                width: '100%',
                borderTopLeftRadius: 'calc(.25rem - 1px)',
                borderTopRightRadius: 'calc(.25rem - 1px)',
                maxWidth: '100%',
                verticalAlign: 'middle',
                display: 'inline-block',
                borderStyle: 'none',
            },
            cardBody: {
                flex: '1 1 auto',
                padding: '1.25rem',
            },
            cardTitle: {
                marginBottom: '.75rem',
                fontSize: '14px',
                lineHeight: '20px',
                marginTop: '10px',
                fontWeight: 'bold',
                color: '#333',
            },
            cardText: {
                whiteSpace: 'break-spaces',
                marginTop: '0',
                marginBottom: '10px',
                color: '#333',
            },
        };

        return (
            <PreviewPortalDashboardPage
                closeModal={this.props.closeModal}
                customStyles={customStyles}
                logoHeaderUrl={logoHeaderUrl}
                imageHash={this.props.imageHash}
            />
        );
    }
}

export default PreviewPortalDashboardPageMobileModal;
