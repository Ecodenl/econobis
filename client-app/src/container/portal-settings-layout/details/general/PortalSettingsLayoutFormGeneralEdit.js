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
import PreviewPortalLoginPagePcModal from '../../preview/PreviewPortalLoginPagePcModal';
import PreviewPortalLoginPageMobileModal from '../../preview/PreviewPortalLoginPageMobileModal';
import PreviewPortalDashboardPagePcModal from '../../preview/PreviewPortalDashboardPagePcModal';
import PreviewPortalDashboardPageMobileModal from '../../preview/PreviewPortalDashboardPageMobileModal';
import PortalLogoLayoutNewCrop from '../../../../components/cropImage/portalLayout/PortalLogoLayoutNewCrop';

class PortalSettingsLayoutDetailsFormGeneralEdit extends Component {
    constructor(props) {
        super(props);

        this.manageTechnicalPortalSettings =
            this.props.meDetails.email == 'support@econobis.nl' || this.props.meDetails.email == 'software@xaris.nl'
                ? true
                : false;

        this.state = {
            showPreviewPortalLoginPagePc: false,
            showPreviewPortalDashboardPagePc: false,
            showPreviewPortalLoginPageMobile: false,
            showPreviewPortalDashboardPageMobile: false,
            portalSettingsLayout: {
                ...props.portalSettingsLayout,
            },
            imageHash: Date.now(),
            image: '',
            imageLayoutItemName: '',
            attachmentLogo: '',
            filenameLogo: '',
            showModalNewLogo: false,
            showModalCropLogo: false,
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

    togglePreviewPortalDashboardPagePc = () => {
        this.setState({ showPreviewPortalDashboardPagePc: !this.state.showPreviewPortalDashboardPagePc });
    };

    togglePreviewPortalLoginPageMobile = () => {
        this.setState({ showPreviewPortalLoginPageMobile: !this.state.showPreviewPortalLoginPageMobile });
    };

    togglePreviewPortalDashboardPageMobile = () => {
        this.setState({ showPreviewPortalDashboardPageMobile: !this.state.showPreviewPortalDashboardPageMobile });
    };

    closeNewLogo = () => {
        this.setState({
            showModalNewLogo: false,
        });
    };
    toggleNewLogo = imageLayoutItemName => {
        if (this.manageTechnicalPortalSettings) {
            this.setState({
                showModalNewLogo: !this.state.showModalNewLogo,
                imageLayoutItemName: imageLayoutItemName,
            });
        }
    };
    closeShowCrop = () => {
        this.setState({
            showModalCropLogo: false,
        });
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
            image: file[0],
            showModalCropLogo: true,
        });
    };
    cropLogo = file => {
        switch (this.state.imageLayoutItemName) {
            case 'logo-login':
                this.setState({
                    ...this.state,
                    attachmentLogo: file,
                    filenameLogo: file.name,
                    showModalCropLogo: false,
                });
                break;
            case 'logo-header':
                this.setState({
                    ...this.state,
                    attachmentLogoHeader: file,
                    filenameLogoHeader: file.name,
                    showModalCropLogo: false,
                });
                break;
            case 'image-bg-login':
                this.setState({
                    ...this.state,
                    attachmentImageBgLogin: file,
                    filenameImageBgLogin: file.name,
                    showModalCropLogo: false,
                });
                break;
            case 'image-bg-header':
                this.setState({
                    ...this.state,
                    attachmentImageBgHeader: file,
                    filenameImageBgHeader: file.name,
                    showModalCropLogo: false,
                });
                break;
        }
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
                                        buttonText="Preview dashboard pagina PC"
                                        onClickAction={this.togglePreviewPortalDashboardPagePc}
                                    />
                                    <ButtonText
                                        buttonText="Preview login pagina mobiel"
                                        onClickAction={this.togglePreviewPortalLoginPageMobile}
                                    />
                                    <ButtonText
                                        buttonText="Preview dashboard pagina mobiel"
                                        onClickAction={this.togglePreviewPortalDashboardPageMobile}
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
                                value={Boolean(isDefault)}
                                disabled={Boolean(isDefault)}
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
                                onClickAction={() => {
                                    this.toggleNewLogo('logo-login');
                                }}
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
                        <div className="row">
                            <InputText
                                Men
                                label="Achtergrond afbeelding login (bestandstype PNG)"
                                divSize={'col-sm-8'}
                                value={
                                    this.state.attachmentImageBgLogin.name
                                        ? this.state.attachmentImageBgLogin.name
                                        : portalImageBgFileNameLogin
                                }
                                onClickAction={() => {
                                    this.toggleNewLogo('image-bg-login');
                                }}
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
                                onClickAction={() => {
                                    this.toggleNewLogo('logo-header');
                                }}
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
                        <div className="row">
                            <InputText
                                Men
                                label="Achtergrond afbeelding header (bestandstype PNG)"
                                divSize={'col-sm-8'}
                                value={
                                    this.state.attachmentImageBgHeader.name
                                        ? this.state.attachmentImageBgHeader.name
                                        : portalImageBgFileNameHeader
                                }
                                onClickAction={() => {
                                    this.toggleNewLogo('image-bg-header');
                                }}
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
                                size={'col-sm-5'}
                                textToolTip={`Achtergrond afbeelding werkt alleen als je hier RGBA kleurcode gebruiktkleur en daar (deels) transparantie op toepast: 0.0 (fully transparent) and 1.0 (fully opaque)<br />
                                    Bijv:<br />
                                    rgba(35, 150, 179, 0). Achtergrond kleur volledig transparant, dus zie je achtergrond afbeelding ook volledig.<br />
                                    rgba(35, 150, 179, 1). Achtergrond kleur volledig NIET transparant, dus zie je achtergrond afbeelding helemaal niet.<br />
                                    rgba(35, 150, 179, 0.5). Achtergrond kleur voor 50% transparant, dus zie je achtergrond afbeelding voor 50% door achtergrond kleur heen. Hiermee krijgt je een soort watermerk effect.`}
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
                                label="6. Menu achtergrond / pagina header tekst kleur"
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
                                    width: '150px',
                                    height: '30px',
                                    boxShadow: '0 0 0 2px #fff inset',
                                }}
                            >
                                Menutekst
                            </span>
                            <br />
                            <span
                                className="rc-color-picker-trigger"
                                unselectable="unselectable"
                                style={{
                                    backgroundColor: '#fff',
                                    color: portalBackgroundColor,
                                    border: '1px solid #999',
                                    display: 'inline-block',
                                    padding: '2px',
                                    borderRadius: '2px',
                                    width: '150px',
                                    height: '30px',
                                    boxShadow: '0 0 0 2px #fff inset',
                                }}
                            >
                                Pagina header tekst
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
                                label="8. Buttonknop / Profielcircel kleur"
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
                                label="9. Buttonknop / Profielcircel tekst kleur"
                                divSize={'col-sm-8'}
                                name={'buttonTextColor'}
                                value={buttonTextColor}
                                onChangeAction={this.handleInputChange}
                                readOnly={!this.manageTechnicalPortalSettings}
                                required={'required'}
                                error={this.state.errors.buttonTextColor}
                            />
                        </div>
                        {this.state.showModalNewLogo && (
                            <PortalLogoLayoutNew
                                closeNewLogo={this.closeNewLogo}
                                addLogo={this.addLogo}
                                imageLayoutItemName={this.state.imageLayoutItemName}
                            />
                        )}
                        {this.state.showModalCropLogo && (
                            <PortalLogoLayoutNewCrop
                                closeShowCrop={this.closeShowCrop}
                                image={this.state.image}
                                imageLayoutItemName={this.state.imageLayoutItemName}
                                cropLogo={this.cropLogo}
                            />
                        )}
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
                            imageHash={this.state.imageHash}
                            attachmentLogo={this.state.attachmentLogo}
                            logoUrl={logoUrl}
                            attachmentLogoHeader={this.state.attachmentLogoHeader}
                            logoHeaderUrl={logoHeaderUrl}
                            attachmentImageBgLogin={this.state.attachmentImageBgLogin}
                            imageBgLoginUrl={imageBgLoginUrl}
                            attachmentImageBgHeader={this.state.attachmentImageBgHeader}
                            imageBgHeaderUrl={imageBgHeaderUrl}
                            // portalFaviconFileName
                            portalBackgroundColor={portalBackgroundColor}
                            portalBackgroundTextColor={portalBackgroundTextColor}
                            loginHeaderBackgroundColor={loginHeaderBackgroundColor}
                            loginHeaderBackgroundTextColor={loginHeaderBackgroundTextColor}
                            headerIconsColor={headerIconsColor}
                            loginFieldBackgroundColor={loginFieldBackgroundColor}
                            loginFieldBackgroundTextColor={loginFieldBackgroundTextColor}
                            buttonColor={buttonColor}
                            buttonTextColor={buttonTextColor}
                        />
                    )}
                    {this.state.showPreviewPortalDashboardPagePc && (
                        <PreviewPortalDashboardPagePcModal
                            closeModal={this.togglePreviewPortalDashboardPagePc}
                            imageHash={this.state.imageHash}
                            attachmentLogo={this.state.attachmentLogo}
                            logoUrl={logoUrl}
                            attachmentLogoHeader={this.state.attachmentLogoHeader}
                            logoHeaderUrl={logoHeaderUrl}
                            attachmentImageBgLogin={this.state.attachmentImageBgLogin}
                            imageBgLoginUrl={imageBgLoginUrl}
                            attachmentImageBgHeader={this.state.attachmentImageBgHeader}
                            imageBgHeaderUrl={imageBgHeaderUrl}
                            // portalFaviconFileName
                            portalBackgroundColor={portalBackgroundColor}
                            portalBackgroundTextColor={portalBackgroundTextColor}
                            loginHeaderBackgroundColor={loginHeaderBackgroundColor}
                            loginHeaderBackgroundTextColor={loginHeaderBackgroundTextColor}
                            headerIconsColor={headerIconsColor}
                            loginFieldBackgroundColor={loginFieldBackgroundColor}
                            loginFieldBackgroundTextColor={loginFieldBackgroundTextColor}
                            buttonColor={buttonColor}
                            buttonTextColor={buttonTextColor}
                        />
                    )}
                    {this.state.showPreviewPortalLoginPageMobile && (
                        <PreviewPortalLoginPageMobileModal
                            closeModal={this.togglePreviewPortalLoginPageMobile}
                            imageHash={this.state.imageHash}
                            attachmentLogo={this.state.attachmentLogo}
                            logoUrl={logoUrl}
                            attachmentLogoHeader={this.state.attachmentLogoHeader}
                            logoHeaderUrl={logoHeaderUrl}
                            attachmentImageBgLogin={this.state.attachmentImageBgLogin}
                            imageBgLoginUrl={imageBgLoginUrl}
                            attachmentImageBgHeader={this.state.attachmentImageBgHeader}
                            imageBgHeaderUrl={imageBgHeaderUrl}
                            // portalFaviconFileName
                            portalBackgroundColor={portalBackgroundColor}
                            portalBackgroundTextColor={portalBackgroundTextColor}
                            loginHeaderBackgroundColor={loginHeaderBackgroundColor}
                            loginHeaderBackgroundTextColor={loginHeaderBackgroundTextColor}
                            headerIconsColor={headerIconsColor}
                            loginFieldBackgroundColor={loginFieldBackgroundColor}
                            loginFieldBackgroundTextColor={loginFieldBackgroundTextColor}
                            buttonColor={buttonColor}
                            buttonTextColor={buttonTextColor}
                        />
                    )}
                    {this.state.showPreviewPortalDashboardPageMobile && (
                        <PreviewPortalDashboardPageMobileModal
                            closeModal={this.togglePreviewPortalDashboardPageMobile}
                            imageHash={this.state.imageHash}
                            attachmentLogo={this.state.attachmentLogo}
                            logoUrl={logoUrl}
                            attachmentLogoHeader={this.state.attachmentLogoHeader}
                            logoHeaderUrl={logoHeaderUrl}
                            attachmentImageBgLogin={this.state.attachmentImageBgLogin}
                            imageBgLoginUrl={imageBgLoginUrl}
                            attachmentImageBgHeader={this.state.attachmentImageBgHeader}
                            imageBgHeaderUrl={imageBgHeaderUrl}
                            // portalFaviconFileName
                            portalBackgroundColor={portalBackgroundColor}
                            portalBackgroundTextColor={portalBackgroundTextColor}
                            loginHeaderBackgroundColor={loginHeaderBackgroundColor}
                            loginHeaderBackgroundTextColor={loginHeaderBackgroundTextColor}
                            headerIconsColor={headerIconsColor}
                            loginFieldBackgroundColor={loginFieldBackgroundColor}
                            loginFieldBackgroundTextColor={loginFieldBackgroundTextColor}
                            buttonColor={buttonColor}
                            buttonTextColor={buttonTextColor}
                        />
                    )}
                </Panel>
            </form>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ fetchSystemData }, dispatch);

export default connect(null, mapDispatchToProps)(PortalSettingsLayoutDetailsFormGeneralEdit);
