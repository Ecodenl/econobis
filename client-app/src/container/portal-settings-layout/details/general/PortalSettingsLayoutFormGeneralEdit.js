import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaUser } from 'react-icons/fa';
import validator from 'validator';
import moment from 'moment';
moment.locale('nl');

import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PortalSettingsLayoutDetailsAPI from '../../../../api/portal-settings-layout/PortalSettingsLayoutDetailsAPI';
import { bindActionCreators } from 'redux';
import { fetchSystemData } from '../../../../actions/general/SystemDataActions';
import InputToggle from '../../../../components/form/InputToggle';
import PortalLogoLayoutNew from './PortalLogoLayoutNew';
import PortalFaviconLayoutNew from './PortalFaviconLayoutNew';
import Image from 'react-bootstrap/es/Image';
import PortalLogoHeaderLayoutNew from './PortalLogoHeaderLayoutNew';
import PortalImageBgLoginLayoutNew from './PortalImageBgLoginLayoutNew';
import PortalImageBgHeaderLayoutNew from './PortalImageBgHeaderLayoutNew';
import PreviewPortalLoginPagePcModal from '../../preview/PreviewPortalLoginPagePcModal';
import PreviewPortalLoginPageMobileModal from '../../preview/PreviewPortalLoginPageMobileModal';
// import PortalLogoLayoutNewCrop from './PortalLogoLayoutNewCrop';

class PortalSettingsLayoutDetailsFormGeneralEdit extends Component {
    constructor(props) {
        super(props);

        this.manageTechnicalPortalSettings =
            this.props.meDetails.email == 'support@econobis.nl' || this.props.meDetails.email == 'software@xaris.nl'
                ? true
                : false;

        this.state = {
            showPreviewPortalLoginPagePc: false,
            showPreviewPortalLoginPageMobile: false,
            portalSettingsLayout: {
                ...props.portalSettingsLayout,
            },
            attachmentLogo: '',
            filenameLogo: '',
            newLogo: false,
            attachmentLogoHeader: '',
            filenameLogoHeader: '',
            newLogoHeader: false,
            attachmentImageBgLogin: '',
            filenameImageBgLogin: '',
            newImageBgLogin: false,
            attachmentImageBgHeader: '',
            filenameImageBgHeader: '',
            newImageBgHeader: false,
            attachmentFavicon: '',
            filenameFavicon: '',
            newFavicon: false,

            errors: {
                description: false,
                portalLogoFileName: false,
                portalLogoFileNameHeader: false,
                portalImageBgFileNameLogin: false,
                portalImageBgFileNameHeader: false,
                portalFaviconFileName: false,
                portalBackgroundColor: false,
                portalBackgroundTextColor: false,
                loginHeaderBackgroundColor: false,
                loginHeaderBackgroundTextColor: false,
                headerIconsColor: false,
                loginFieldBackgroundColor: false,
                loginFieldBackgroundTextColor: false,
                buttonColor: false,
                buttonTextColor: false,
            },
        };
    }

    togglePreviewPortalLoginPagePc = () => {
        this.setState({ showPreviewPortalLoginPagePc: !this.state.showPreviewPortalLoginPagePc });
    };

    togglePreviewPortalLoginPageMobile = () => {
        this.setState({ showPreviewPortalLoginPageMobile: !this.state.showPreviewPortalLoginPageMobile });
    };

    toggleNewLogo = () => {
        if (this.manageTechnicalPortalSettings) {
            this.setState({
                newLogo: !this.state.newLogo,
            });
        }
    };
    toggleNewLogoHeader = () => {
        if (this.manageTechnicalPortalSettings) {
            this.setState({
                newLogoHeader: !this.state.newLogoHeader,
            });
        }
    };
    toggleNewImageBgLogin = () => {
        if (this.manageTechnicalPortalSettings) {
            this.setState({
                newImageBgLogin: !this.state.newImageBgLogin,
            });
        }
    };
    toggleNewImageBgHeader = () => {
        if (this.manageTechnicalPortalSettings) {
            this.setState({
                newImageBgHeader: !this.state.newImageBgHeader,
            });
        }
    };
    toggleNewFavicon = () => {
        if (this.manageTechnicalPortalSettings) {
            this.setState({
                newFavicon: !this.state.newFavicon,
            });
        }
    };
    addLogo = file => {
        this.setState({
            ...this.state,
            attachmentLogo: file[0],
            filenameLogo: file[0].name,
        });
    };
    addLogoHeader = file => {
        this.setState({
            ...this.state,
            attachmentLogoHeader: file[0],
            filenameLogoHeader: file[0].name,
        });
    };
    addImageBgLogin = file => {
        this.setState({
            ...this.state,
            attachmentImageBgLogin: file[0],
            filenameImageBgLogin: file[0].name,
        });
    };
    addImageBgHeader = file => {
        this.setState({
            ...this.state,
            attachmentImageBgHeader: file[0],
            filenameImageBgHeader: file[0].name,
        });
    };
    addFavicon = file => {
        this.setState({
            ...this.state,
            attachmentFavicon: file[0],
            filenameFavicon: file[0].name,
        });
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            portalSettingsLayout: {
                ...this.state.portalSettingsLayout,
                [name]: value,
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const {
            portalSettingsLayout,
            attachmentLogo,
            attachmentLogoHeader,
            attachmentImageBgLogin,
            attachmentImageBgHeader,
            attachmentFavicon,
        } = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(portalSettingsLayout.portalLogoFileName) && attachmentLogo.name === undefined) {
            errors.portalLogoFileName = true;
            hasErrors = true;
        }
        if (validator.isEmpty(portalSettingsLayout.portalFaviconFileName) && attachmentFavicon.name === undefined) {
            errors.portalFaviconFileName = true;
            hasErrors = true;
        }
        if (validator.isEmpty(portalSettingsLayout.description)) {
            errors.description = true;
            hasErrors = true;
        }
        if (validator.isEmpty(portalSettingsLayout.portalBackgroundColor)) {
            errors.portalBackgroundColor = true;
            hasErrors = true;
        }
        if (validator.isEmpty(portalSettingsLayout.portalBackgroundTextColor)) {
            errors.portalBackgroundTextColor = true;
            hasErrors = true;
        }
        if (validator.isEmpty(portalSettingsLayout.loginHeaderBackgroundColor)) {
            errors.loginHeaderBackgroundColor = true;
            hasErrors = true;
        }
        if (validator.isEmpty(portalSettingsLayout.loginHeaderBackgroundTextColor)) {
            errors.loginHeaderBackgroundTextColor = true;
            hasErrors = true;
        }
        if (validator.isEmpty(portalSettingsLayout.headerIconsColor)) {
            errors.headerIconsColor = true;
            hasErrors = true;
        }
        if (validator.isEmpty(portalSettingsLayout.loginFieldBackgroundColor)) {
            errors.loginFieldBackgroundColor = true;
            hasErrors = true;
        }
        if (validator.isEmpty(portalSettingsLayout.loginFieldBackgroundTextColor)) {
            errors.loginFieldBackgroundTextColor = true;
            hasErrors = true;
        }
        if (validator.isEmpty(portalSettingsLayout.buttonColor)) {
            errors.buttonColor = true;
            hasErrors = true;
        }
        if (validator.isEmpty(portalSettingsLayout.buttonTextColor)) {
            errors.buttonTextColor = true;
            hasErrors = true;
        }

        // this.setState({ ...this.state, errors: errors });

        const data = new FormData();

        data.append('description', portalSettingsLayout.description);
        data.append('isDefault', portalSettingsLayout.isDefault);
        data.append('portalLogoFileName', portalSettingsLayout.portalLogoFileName);
        data.append('portalLogoFileNameHeader', portalSettingsLayout.portalLogoFileNameHeader);
        data.append('portalImageBgFileNameLogin', portalSettingsLayout.portalImageBgFileNameLogin);
        data.append('portalImageBgFileNameHeader', portalSettingsLayout.portalImageBgFileNameHeader);
        data.append('portalFaviconFileName', portalSettingsLayout.portalFaviconFileName);
        data.append('description', portalSettingsLayout.description);
        data.append('portalBackgroundColor', portalSettingsLayout.portalBackgroundColor);
        data.append('portalBackgroundTextColor', portalSettingsLayout.portalBackgroundTextColor);
        data.append('loginHeaderBackgroundColor', portalSettingsLayout.loginHeaderBackgroundColor);
        data.append('loginHeaderBackgroundTextColor', portalSettingsLayout.loginHeaderBackgroundTextColor);
        data.append('headerIconsColor', portalSettingsLayout.headerIconsColor);
        data.append('loginFieldBackgroundColor', portalSettingsLayout.loginFieldBackgroundColor);
        data.append('loginFieldBackgroundTextColor', portalSettingsLayout.loginFieldBackgroundTextColor);
        data.append('buttonColor', portalSettingsLayout.buttonColor);
        data.append('buttonTextColor', portalSettingsLayout.buttonTextColor);

        data.append('attachmentLogo', attachmentLogo);
        data.append('attachmentLogoHeader', attachmentLogoHeader);
        data.append('attachmentImageBgLogin', attachmentImageBgLogin);
        data.append('attachmentImageBgHeader', attachmentImageBgHeader);
        data.append('attachmentFavicon', attachmentFavicon);

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            PortalSettingsLayoutDetailsAPI.updatePortalSettingsLayout(portalSettingsLayout.id, data)
                .then(payload => {
                    this.props.updateState(payload.data.data);
                    this.props.fetchSystemData();
                    this.props.switchToView();
                })
                .catch(error => {
                    console.log(error);
                    alert('Er is iets misgegaan bij opslaan. Herlaad de pagina en probeer het nogmaals.');
                });
    };

    render() {
        const {
            id,
            description,
            isDefault,
            portalLogoFileName,
            portalLogoFileNameHeader,
            portalImageBgFileNameLogin,
            portalImageBgFileNameHeader,
            portalFaviconFileName,
            portalBackgroundColor,
            portalBackgroundTextColor,
            loginHeaderBackgroundColor,
            loginHeaderBackgroundTextColor,
            headerIconsColor,
            loginFieldBackgroundColor,
            loginFieldBackgroundTextColor,
            buttonColor,
            buttonTextColor,
        } = this.state.portalSettingsLayout;

        const logoUrl = `${URL_API}/portal/images/${portalLogoFileName}?${this.props.imageHash}`;
        const logoHeaderUrl = `${URL_API}/portal/images/${portalLogoFileNameHeader}?${this.props.imageHash}`;
        const imageBgLoginUrl = `${URL_API}/portal/images/${portalImageBgFileNameLogin}?${this.props.imageHash}`;
        const imageBgHeaderUrl = `${URL_API}/portal/images/${portalImageBgFileNameHeader}?${this.props.imageHash}`;
        const faviconUrl = `${URL_API}/portal/${portalFaviconFileName}?${this.props.imageHash}`;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel>
                    <PanelBody>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="btn-group btn-group-flex" role="group">
                                    <ButtonText
                                        buttonText="Preview login pagina PC"
                                        onClickAction={this.togglePreviewPortalLoginPagePc}
                                    />
                                    <ButtonText
                                        buttonText="Preview login pagina mobiel"
                                        onClickAction={this.togglePreviewPortalLoginPageMobile}
                                    />
                                </div>
                            </div>
                        </div>
                    </PanelBody>
                </Panel>
                <Panel>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label="Omschrijving"
                                divSize={'col-sm-8'}
                                name={'description'}
                                value={description}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.description}
                            />
                            <InputToggle
                                label={'Standaard'}
                                divSize={'col-sm-4'}
                                name={'isDefault'}
                                value={isDefault}
                                disabled={isDefault}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                Men
                                label="Logo login (bestandstype PNG)"
                                divSize={'col-sm-8'}
                                value={
                                    this.state.attachmentLogo.name ? this.state.attachmentLogo.name : portalLogoFileName
                                }
                                onClickAction={this.toggleNewLogo}
                                onChangeaction={() => {}}
                                readOnly={!this.manageTechnicalPortalSettings}
                                required={'required'}
                                error={this.state.errors.portalLogoFileName}
                            />
                            <Image
                                src={
                                    this.state.attachmentLogo && this.state.attachmentLogo.preview
                                        ? this.state.attachmentLogo.preview
                                        : logoUrl
                                }
                                style={{
                                    backgroundColor: loginHeaderBackgroundColor,
                                    color: loginHeaderBackgroundTextColor,
                                    border: '1px solid #999',
                                    display: 'inline-block',
                                    padding: '1px',
                                    borderRadius: '1px',
                                    height: '50px',
                                    boxShadow: '0 0 0 1px #fff inset',
                                }}
                            />
                        </div>
                        {this.state.newLogo && (
                            <PortalLogoLayoutNew toggleShowNewLogo={this.toggleNewLogo} addLogo={this.addLogo} />
                        )}
                        {/*{this.state.showCrop && (*/}
                        {/*    <PortalLogoLayoutNewCrop toggleShowCrop={this.toggleCrop} image={this.state.file} />*/}
                        {/*)}*/}
                        <div className="row">
                            <InputText
                                Men
                                label="Background image login (bestandstype PNG)"
                                divSize={'col-sm-8'}
                                value={
                                    this.state.attachmentImageBgLogin.name
                                        ? this.state.attachmentImageBgLogin.name
                                        : portalImageBgFileNameLogin
                                }
                                onClickAction={this.toggleNewImageBgLogin}
                                onChangeaction={() => {}}
                                readOnly={!this.manageTechnicalPortalSettings}
                                required={'required'}
                                error={this.state.errors.portalImageBgFileNameLogin}
                            />
                            <Image
                                src={
                                    this.state.attachmentImageBgLogin && this.state.attachmentImageBgLogin.preview
                                        ? this.state.attachmentImageBgLogin.preview
                                        : imageBgLoginUrl
                                }
                                style={{
                                    backgroundColor: loginHeaderBackgroundColor,
                                    color: loginHeaderBackgroundTextColor,
                                    border: '1px solid #999',
                                    display: 'inline-block',
                                    padding: '1px',
                                    borderRadius: '1px',
                                    height: '50px',
                                    boxShadow: '0 0 0 1px #fff inset',
                                }}
                            />
                        </div>
                        {this.state.newImageBgLogin && (
                            <PortalImageBgLoginLayoutNew
                                toggleShowNewImageBgLogin={this.toggleNewImageBgLogin}
                                addImageBgLogin={this.addImageBgLogin}
                            />
                        )}
                        <div className="row">
                            <InputText
                                Men
                                label="Logo header (bestandstype PNG)"
                                divSize={'col-sm-8'}
                                value={
                                    this.state.attachmentLogoHeader.name
                                        ? this.state.attachmentLogoHeader.name
                                        : portalLogoFileNameHeader
                                }
                                onClickAction={this.toggleNewLogoHeader}
                                onChangeaction={() => {}}
                                readOnly={!this.manageTechnicalPortalSettings}
                                required={'required'}
                                error={this.state.errors.portalLogoFileNameHeader}
                            />
                            <Image
                                src={
                                    this.state.attachmentLogoHeader && this.state.attachmentLogoHeader.preview
                                        ? this.state.attachmentLogoHeader.preview
                                        : logoHeaderUrl
                                }
                                style={{
                                    backgroundColor: loginHeaderBackgroundColor,
                                    color: loginHeaderBackgroundTextColor,
                                    border: '1px solid #999',
                                    display: 'inline-block',
                                    padding: '1px',
                                    borderRadius: '1px',
                                    height: '50px',
                                    boxShadow: '0 0 0 1px #fff inset',
                                }}
                            />
                        </div>
                        {this.state.newLogoHeader && (
                            <PortalLogoHeaderLayoutNew
                                toggleShowNewLogoHeader={this.toggleNewLogoHeader}
                                addLogoHeader={this.addLogoHeader}
                            />
                        )}
                        <div className="row">
                            <InputText
                                Men
                                label="Background image header (bestandstype PNG)"
                                divSize={'col-sm-8'}
                                value={
                                    this.state.attachmentImageBgHeader.name
                                        ? this.state.attachmentImageBgHeader.name
                                        : portalImageBgFileNameHeader
                                }
                                onClickAction={this.toggleNewImageBgHeader}
                                onChangeaction={() => {}}
                                readOnly={!this.manageTechnicalPortalSettings}
                                required={'required'}
                                error={this.state.errors.portalImageBgFileNameHeader}
                            />
                            <Image
                                src={
                                    this.state.attachmentImageBgHeader && this.state.attachmentImageBgHeader.preview
                                        ? this.state.attachmentImageBgHeader.preview
                                        : imageBgHeaderUrl
                                }
                                style={{
                                    backgroundColor: loginHeaderBackgroundColor,
                                    color: loginHeaderBackgroundTextColor,
                                    border: '1px solid #999',
                                    display: 'inline-block',
                                    padding: '1px',
                                    borderRadius: '1px',
                                    height: '50px',
                                    boxShadow: '0 0 0 1px #fff inset',
                                }}
                            />
                        </div>
                        {this.state.newImageBgHeader && (
                            <PortalImageBgHeaderLayoutNew
                                toggleShowNewImageBgHeader={this.toggleNewImageBgHeader}
                                addImageBgHeader={this.addImageBgHeader}
                            />
                        )}
                        <div className="row">
                            <InputText
                                label="Favicon (bestandstype ICO)"
                                divSize={'col-sm-8'}
                                value={
                                    this.state.attachmentFavicon.name
                                        ? this.state.attachmentFavicon.name
                                        : portalFaviconFileName
                                }
                                onClickAction={this.toggleNewFavicon}
                                onChangeaction={() => {}}
                                readOnly={!this.manageTechnicalPortalSettings}
                                required={'required'}
                                error={this.state.errors.portalFaviconFileName}
                            />
                            <Image
                                src={
                                    this.state.attachmentFavicon && this.state.attachmentFavicon.preview
                                        ? this.state.attachmentFavicon.preview
                                        : faviconUrl
                                }
                                style={{
                                    border: '1px solid #999',
                                    display: 'inline-block',
                                    padding: '1px',
                                    borderRadius: '1px',
                                    height: '20px',
                                    boxShadow: '0 0 0 1px #fff inset',
                                }}
                            />
                        </div>
                        {this.state.newFavicon && (
                            <PortalFaviconLayoutNew
                                toggleShowNewFavicon={this.toggleNewFavicon}
                                addFavicon={this.addFavicon}
                            />
                        )}

                        <div className="row">
                            <InputText
                                label="1. Login/Header - achtergrond afbeelding kleur"
                                divSize={'col-sm-8'}
                                name={'loginHeaderBackgroundColor'}
                                value={loginHeaderBackgroundColor}
                                readOnly={!this.manageTechnicalPortalSettings}
                                required={'required'}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.loginHeaderBackgroundColor}
                            />
                            <span
                                className="rc-color-picker-trigger"
                                unselectable="unselectable"
                                style={{
                                    backgroundColor: loginHeaderBackgroundColor,
                                    color: loginHeaderBackgroundTextColor,
                                    border: '1px solid #999',
                                    display: 'inline-block',
                                    padding: '2px',
                                    borderRadius: '2px',
                                    width: '50px',
                                    height: '30px',
                                    boxShadow: '0 0 0 2px #fff inset',
                                }}
                            >
                                Tekst
                            </span>
                        </div>
                        <div className="row">
                            <InputText
                                label="2. Login/Header - achtergrond afbeelding tekst kleur"
                                divSize={'col-sm-8'}
                                name={'loginHeaderBackgroundTextColor'}
                                value={loginHeaderBackgroundTextColor}
                                onChangeAction={this.handleInputChange}
                                readOnly={!this.manageTechnicalPortalSettings}
                                required={'required'}
                                error={this.state.errors.loginHeaderBackgroundTextColor}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label="3. Header - menu/poppetje kleur"
                                divSize={'col-sm-8'}
                                name={'headerIconsColor'}
                                value={headerIconsColor}
                                onChangeAction={this.handleInputChange}
                                readOnly={!this.manageTechnicalPortalSettings}
                                required={'required'}
                                error={this.state.errors.headerIconsColor}
                            />
                            <span
                                className="rc-color-picker-trigger"
                                unselectable="unselectable"
                                style={{
                                    backgroundColor: loginHeaderBackgroundColor,
                                    color: headerIconsColor,
                                    textAlign: 'center',
                                    border: '1px solid #999',
                                    display: 'inline-block',
                                    padding: '4px',
                                    borderRadius: '2px',
                                    width: '50px',
                                    height: '30px',
                                    boxShadow: '0 0 0 2px #fff inset',
                                }}
                            >
                                = <FaUser />
                            </span>
                        </div>
                        <div className="row">
                            <InputText
                                label="4. Login - veld achtergrond kleur"
                                divSize={'col-sm-8'}
                                name={'loginFieldBackgroundColor'}
                                value={loginFieldBackgroundColor}
                                onChangeAction={this.handleInputChange}
                                readOnly={!this.manageTechnicalPortalSettings}
                                required={'required'}
                                error={this.state.errors.loginFieldBackgroundColor}
                            />
                            <div
                                className="rc-color-picker-trigger"
                                unselectable="unselectable"
                                style={{
                                    backgroundColor: loginHeaderBackgroundColor,
                                    display: 'inline-block',
                                }}
                            >
                                <span
                                    className="rc-color-picker-trigger"
                                    unselectable="unselectable"
                                    style={{
                                        backgroundColor: loginFieldBackgroundColor,
                                        color: loginFieldBackgroundTextColor,
                                        border: '1px solid #999',
                                        display: 'inline-block',
                                        padding: '2px',
                                        borderRadius: '2px',
                                        width: '50px',
                                        height: '30px',
                                        boxShadow: '0 0 0 2px #fff inset',
                                    }}
                                >
                                    Tekst
                                </span>
                            </div>
                        </div>
                        <div className="row">
                            <InputText
                                label="5. Login - veld tekst kleur"
                                divSize={'col-sm-8'}
                                name={'loginFieldBackgroundTextColor'}
                                value={loginFieldBackgroundTextColor}
                                onChangeAction={this.handleInputChange}
                                readOnly={!this.manageTechnicalPortalSettings}
                                required={'required'}
                                error={this.state.errors.loginFieldBackgroundTextColor}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label="6. Achtergrond kleur"
                                divSize={'col-sm-8'}
                                name={'portalBackgroundColor'}
                                value={portalBackgroundColor}
                                onChangeAction={this.handleInputChange}
                                readOnly={!this.manageTechnicalPortalSettings}
                                required={'required'}
                                error={this.state.errors.portalBackgroundColor}
                            />
                            <span
                                className="rc-color-picker-trigger"
                                unselectable="unselectable"
                                style={{
                                    backgroundColor: portalBackgroundColor,
                                    color: portalBackgroundTextColor,
                                    border: '1px solid #999',
                                    display: 'inline-block',
                                    padding: '2px',
                                    borderRadius: '2px',
                                    width: '50px',
                                    height: '30px',
                                    boxShadow: '0 0 0 2px #fff inset',
                                }}
                            >
                                Tekst
                            </span>
                        </div>
                        <div className="row">
                            <InputText
                                label="7. Achtergrond tekst kleur"
                                divSize={'col-sm-8'}
                                name={'portalBackgroundTextColor'}
                                value={portalBackgroundTextColor}
                                onChangeAction={this.handleInputChange}
                                readOnly={!this.manageTechnicalPortalSettings}
                                required={'required'}
                                error={this.state.errors.portalBackgroundTextColor}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label="8. Buttonknop kleur"
                                divSize={'col-sm-8'}
                                name={'buttonColor'}
                                value={buttonColor}
                                onChangeAction={this.handleInputChange}
                                readOnly={!this.manageTechnicalPortalSettings}
                                required={'required'}
                                error={this.state.errors.buttonColor}
                            />
                            <span
                                className="rc-color-picker-trigger"
                                unselectable="unselectable"
                                style={{
                                    backgroundColor: buttonColor,
                                    color: buttonTextColor,
                                    border: '1px solid #999',
                                    display: 'inline-block',
                                    padding: '2px',
                                    borderRadius: '2px',
                                    width: '50px',
                                    height: '30px',
                                    boxShadow: '0 0 0 2px #fff inset',
                                }}
                            >
                                Tekst
                            </span>
                        </div>
                        <div className="row">
                            <InputText
                                label="9. Buttonknop tekst kleur"
                                divSize={'col-sm-8'}
                                name={'buttonTextColor'}
                                value={buttonTextColor}
                                onChangeAction={this.handleInputChange}
                                readOnly={!this.manageTechnicalPortalSettings}
                                required={'required'}
                                error={this.state.errors.buttonTextColor}
                            />
                        </div>
                    </PanelBody>

                    <PanelBody>
                        <div className="pull-right btn-group" role="group">
                            <ButtonText
                                buttonClassName={'btn-default'}
                                buttonText={'Sluiten'}
                                onClickAction={this.props.switchToView}
                            />
                            <ButtonText buttonText={'Opslaan'} type={'submit'} value={'Submit'} />
                        </div>
                    </PanelBody>
                    {this.state.showPreviewPortalLoginPagePc && (
                        <PreviewPortalLoginPagePcModal
                            closeModal={this.togglePreviewPortalLoginPagePc}
                            attachmentLogo={this.state.attachmentLogo}
                            logoUrl={logoUrl}
                            attachmentImageBgLogin={this.state.attachmentImageBgLogin}
                            imageBgLoginUrl={imageBgLoginUrl}
                        />
                    )}
                    {this.state.showPreviewPortalLoginPageMobile && (
                        <PreviewPortalLoginPageMobileModal
                            closeModal={this.togglePreviewPortalLoginPageMobile}
                            attachmentLogo={this.state.attachmentLogo}
                            logoUrl={logoUrl}
                            attachmentImageBgLogin={this.state.attachmentImageBgLogin}
                            imageBgLoginUrl={imageBgLoginUrl}
                        />
                    )}
                </Panel>
            </form>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ fetchSystemData }, dispatch);

export default connect(null, mapDispatchToProps)(PortalSettingsLayoutDetailsFormGeneralEdit);
