import React, { Component } from 'react';
import { getApiUrl } from '../../../../api/utils/ApiUrl';
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
import PortalImageUpload from '../../../../components/imageUploadAndCrop/PortalImageUpload';
import PortalFaviconLayoutNew from './PortalFaviconLayoutNew';
import Image from 'react-bootstrap/es/Image';
import PreviewPortalLoginPagePcModal from '../../../portal-settings-preview/PreviewPortalLoginPagePcModal';
import PreviewPortalLoginPageMobileModal from '../../../portal-settings-preview/PreviewPortalLoginPageMobileModal';
import PreviewPortalDashboardPagePcModal from '../../../portal-settings-preview/PreviewPortalDashboardPagePcModal';
import PreviewPortalDashboardPageMobileModal from '../../../portal-settings-preview/PreviewPortalDashboardPageMobileModal';
import PortalImageCrop from '../../../../components/imageUploadAndCrop/PortalImageCrop';
import InputTextColorPicker from '../../../../components/form/InputTextColorPicker';

class PortalSettingsLayoutDetailsFormGeneralEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showPreviewPortalLoginPagePc: false,
            showPreviewPortalDashboardPagePc: false,
            showPreviewPortalLoginPageMobile: false,
            showPreviewPortalDashboardPageMobile: false,
            showMenu: false,
            portalSettingsLayout: {
                ...props.portalSettingsLayout,
            },
            imageHash: Date.now(),
            image: '',
            imageItemName: '',
            attachmentLogo: '',
            filenameLogo: '',
            showModalUploadImage: false,
            showModalCropImage: false,
            useAutoCropper: true,
            attachmentLogoHeader: '',
            filenameLogoHeader: '',
            uploadImageHeader: false,
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
                portalMainBackgroundColor: false,
                portalMainTextColor: false,
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
        if (this.state.showPreviewPortalLoginPagePc) {
            document.documentElement.removeAttribute('style');
        }
        this.setState({ showPreviewPortalLoginPagePc: !this.state.showPreviewPortalLoginPagePc });
    };

    togglePreviewPortalDashboardPagePc = () => {
        if (this.state.showPreviewPortalDashboardPagePc) {
            document.documentElement.removeAttribute('style');
        }
        this.setState({ showPreviewPortalDashboardPagePc: !this.state.showPreviewPortalDashboardPagePc });
    };

    togglePreviewPortalLoginPageMobile = () => {
        if (this.state.showPreviewPortalLoginPageMobile) {
            document.documentElement.removeAttribute('style');
        }
        this.setState({ showPreviewPortalLoginPageMobile: !this.state.showPreviewPortalLoginPageMobile });
    };

    togglePreviewPortalDashboardPageMobile = () => {
        if (this.state.showPreviewPortalDashboardPageMobile) {
            document.documentElement.removeAttribute('style');
        }
        this.setState({ showPreviewPortalDashboardPageMobile: !this.state.showPreviewPortalDashboardPageMobile });
    };

    setShowMenu = () => {
        this.setState({ showMenu: !this.state.showMenu });
    };

    closeUploadImage = () => {
        this.setState({
            showModalUploadImage: false,
        });
    };
    toggleUploadImage = imageItemName => {
        if (this.props.permissions.managePortalSettings) {
            this.setState({
                showModalUploadImage: !this.state.showModalUploadImage,
                imageItemName: imageItemName,
            });
        }
    };
    setTransparantImage = imageItemName => {
        switch (imageItemName) {
            case 'image-bg-login':
                this.setState({
                    ...this.state,
                    portalSettingsLayout: {
                        ...this.state.portalSettingsLayout,
                        useTransparentBackgroundLogin: 1,
                    },
                });
                break;
            case 'image-bg-header':
                this.setState({
                    ...this.state,
                    portalSettingsLayout: {
                        ...this.state.portalSettingsLayout,
                        useTransparentBackgroundHeader: 1,
                    },
                });
                break;
        }
    };
    toggleNewFavicon = () => {
        if (this.props.permissions.managePortalSettings) {
            this.setState({
                newFavicon: !this.state.newFavicon,
            });
        }
    };
    addImage = (file, imageItemName, useAutoCropper) => {
        this.setState({
            ...this.state,
            image: file[0],
            showModalCropImage: true,
            useAutoCropper: useAutoCropper,
        });
    };

    closeShowCrop = () => {
        this.setState({
            showModalCropImage: false,
        });
    };
    cropImage = file => {
        switch (this.state.imageItemName) {
            case 'logo-login':
                this.setState({
                    ...this.state,
                    attachmentLogo: file,
                    filenameLogo: file.name,
                    showModalCropImage: false,
                });
                break;
            case 'logo-header':
                this.setState({
                    ...this.state,
                    attachmentLogoHeader: file,
                    filenameLogoHeader: file.name,
                    showModalCropImage: false,
                });
                break;
            case 'image-bg-login':
                this.setState({
                    ...this.state,
                    attachmentImageBgLogin: file,
                    filenameImageBgLogin: file.name,
                    showModalCropImage: false,
                    portalSettingsLayout: {
                        ...this.state.portalSettingsLayout,
                        useTransparentBackgroundLogin: 0,
                    },
                });
                break;
            case 'image-bg-header':
                this.setState({
                    ...this.state,
                    attachmentImageBgHeader: file,
                    filenameImageBgHeader: file.name,
                    showModalCropImage: false,
                    portalSettingsLayout: {
                        ...this.state.portalSettingsLayout,
                        useTransparentBackgroundHeader: 0,
                    },
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
        if (validator.isEmpty(portalSettingsLayout.portalMainBackgroundColor)) {
            errors.portalMainBackgroundColor = true;
            hasErrors = true;
        }
        if (validator.isEmpty(portalSettingsLayout.portalMainTextColor)) {
            errors.portalMainTextColor = true;
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
        data.append('isDefault', portalSettingsLayout.isDefault ? 1 : 0);
        data.append('portalLogoFileName', portalSettingsLayout.portalLogoFileName);
        data.append('portalLogoFileNameHeader', portalSettingsLayout.portalLogoFileNameHeader);
        data.append('portalImageBgFileNameLogin', portalSettingsLayout.portalImageBgFileNameLogin);
        data.append('useTransparentBackgroundLogin', portalSettingsLayout.useTransparentBackgroundLogin ? 1 : 0);
        data.append('portalImageBgFileNameHeader', portalSettingsLayout.portalImageBgFileNameHeader);
        data.append('useTransparentBackgroundHeader', portalSettingsLayout.useTransparentBackgroundHeader ? 1 : 0);
        data.append('portalFaviconFileName', portalSettingsLayout.portalFaviconFileName);
        data.append('description', portalSettingsLayout.description);
        data.append('portalMainBackgroundColor', portalSettingsLayout.portalMainBackgroundColor);
        data.append('portalMainTextColor', portalSettingsLayout.portalMainTextColor);
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
            useTransparentBackgroundLogin,
            portalImageBgFileNameLogin,
            useTransparentBackgroundHeader,
            portalImageBgFileNameHeader,
            portalFaviconFileName,
            portalMainBackgroundColor,
            portalMainTextColor,
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

        const logoUrl = `${getApiUrl()}/portal/images/${portalLogoFileName}?${this.props.imageHash}`;
        const logoHeaderUrl = `${getApiUrl()}/portal/images/${portalLogoFileNameHeader}?${this.props.imageHash}`;
        const imageBgLoginUrl = `${getApiUrl()}/portal/images/${portalImageBgFileNameLogin}?${this.props.imageHash}`;
        const imageBgHeaderUrl = `${getApiUrl()}/portal/images/${portalImageBgFileNameHeader}?${this.props.imageHash}`;
        const faviconUrl = `${getApiUrl()}/portal/${portalFaviconFileName}?${this.props.imageHash}`;

        const { managePortalSettings = {} } = this.props.permissions;

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
                            <h4 className={'col-sm-12'}>Afbeeldingen</h4>
                        </div>
                        <div className="row">
                            <InputText
                                label={'A. Logo op de login pagina (bestandstype PNG)'}
                                divSize={'col-sm-8'}
                                name={'portalLogoFileName'}
                                value={
                                    this.state.attachmentLogo.name ? this.state.attachmentLogo.name : portalLogoFileName
                                }
                                onClickAction={() => {
                                    this.toggleUploadImage('logo-login');
                                }}
                                onChangeaction={() => {}}
                                readOnly={!managePortalSettings}
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
                                    maxHeight: '50px',
                                    width: 'auto',
                                    marginBottom: '10px',
                                    boxShadow: '0 0 0 1px #fff inset',
                                }}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label={'B. Achtergrond afbeelding login pagina (bestandstype PNG)'}
                                divSize={'col-sm-8'}
                                name={'portalImageBgFileNameLogin'}
                                value={
                                    useTransparentBackgroundLogin
                                        ? 'Geen'
                                        : this.state.attachmentImageBgLogin.name
                                        ? this.state.attachmentImageBgLogin.name
                                        : portalImageBgFileNameLogin
                                }
                                onClickAction={() => {
                                    this.toggleUploadImage('image-bg-login');
                                }}
                                onChangeaction={() => {}}
                                size={'col-sm-5'}
                                textToolTip={`Om afbeelding zichtbaar te maken moet de achtergrond deels transparant zijn, zie 1. Login pagina / Header kleur voor meer informatie.`}
                                textClearOrDelete={
                                    useTransparentBackgroundLogin ? '' : `Verwijder achtergrond afbeelding login pagina`
                                }
                                actionClearOrDelete={() => {
                                    useTransparentBackgroundLogin ? '' : this.setTransparantImage('image-bg-login');
                                }}
                                readOnly={!managePortalSettings}
                                required={'required'}
                                error={this.state.errors.portalImageBgFileNameLogin}
                            />
                            {!useTransparentBackgroundLogin && (
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
                                        maxHeight: '50px',
                                        width: 'auto',
                                        marginBottom: '10px',
                                        boxShadow: '0 0 0 1px #fff inset',
                                    }}
                                />
                            )}
                        </div>
                        <div className="row">
                            <InputText
                                label={'C. Logo in de header (bestandstype PNG)'}
                                divSize={'col-sm-8'}
                                name={'portalLogoFileNameHeader'}
                                value={
                                    this.state.attachmentLogoHeader.name
                                        ? this.state.attachmentLogoHeader.name
                                        : portalLogoFileNameHeader
                                }
                                onClickAction={() => {
                                    this.toggleUploadImage('logo-header');
                                }}
                                onChangeaction={() => {}}
                                readOnly={!managePortalSettings}
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
                                    maxHeight: '50px',
                                    width: 'auto',
                                    marginBottom: '10px',
                                    boxShadow: '0 0 0 1px #fff inset',
                                }}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label={'D. Achtergrond afbeelding in de header (bestandstype PNG)'}
                                divSize={'col-sm-8'}
                                name={'portalImageBgFileNameHeader'}
                                value={
                                    useTransparentBackgroundHeader
                                        ? 'Geen'
                                        : this.state.attachmentImageBgHeader.name
                                        ? this.state.attachmentImageBgHeader.name
                                        : portalImageBgFileNameHeader
                                }
                                onClickAction={() => {
                                    this.toggleUploadImage('image-bg-header');
                                }}
                                onChangeaction={() => {}}
                                size={'col-md-5'}
                                textToolTip={`Om afbeelding zichtbaar te maken moet de achtergrond deels transparant zijn, zie 1. Login pagina / Header kleur voor meer informatie.`}
                                textClearOrDelete={
                                    useTransparentBackgroundHeader
                                        ? ''
                                        : `Verwijder achtergrond afbeelding in de header`
                                }
                                actionClearOrDelete={() => {
                                    useTransparentBackgroundHeader ? '' : this.setTransparantImage('image-bg-header');
                                }}
                                readOnly={!managePortalSettings}
                                required={'required'}
                                error={this.state.errors.portalImageBgFileNameHeader}
                            />
                            {!useTransparentBackgroundHeader && (
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
                                        maxHeight: '50px',
                                        width: 'auto',
                                        marginBottom: '10px',
                                        boxShadow: '0 0 0 1px #fff inset',
                                    }}
                                />
                            )}
                        </div>
                        <div className="row">
                            <InputText
                                label={'E. Favicon in tabblad browser (bestandstype ICO)'}
                                divSize={'col-sm-8'}
                                name={'portalFaviconFileName'}
                                value={
                                    this.state.attachmentFavicon.name
                                        ? this.state.attachmentFavicon.name
                                        : portalFaviconFileName
                                }
                                onClickAction={this.toggleNewFavicon}
                                onChangeaction={() => {}}
                                size={'col-sm-5'}
                                textToolTip={`Een favicon is het icoontje dat je ziet in de tabbladen van je browser. Vaak is de favicon het logo van het bedrijf waarvan je de website bezoekt.`}
                                readOnly={!managePortalSettings}
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
                            <h4 className={'col-md-12'}>Kleur</h4>
                        </div>
                        <div className="row">
                            <InputTextColorPicker
                                label="1. Login pagina/ header kleur"
                                divSize={'col-sm-8'}
                                name={'loginHeaderBackgroundColor'}
                                value={loginHeaderBackgroundColor}
                                size={'col-sm-4'}
                                textToolTip={`Achtergrond afbeelding werkt alleen als je hier RGBA kleurcode gebruiktkleur en daar (deels) transparantie op toepast: 0.0 (fully transparent) and 1.0 (fully opaque)<br />
                                    Bijv:<br />
                                    rgba(35, 150, 179, 0). Achtergrond kleur volledig transparant, dus zie je achtergrond afbeelding ook volledig.<br />
                                    rgba(35, 150, 179, 1). Achtergrond kleur volledig NIET transparant, dus zie je achtergrond afbeelding helemaal niet.<br />
                                    rgba(35, 150, 179, 0.5). Achtergrond kleur voor 50% transparant, dus zie je achtergrond afbeelding voor 50% door achtergrond kleur heen. Hiermee krijgt je een soort watermerk effect.<br />
                                    LETOP: Als je de colorpicker hier gebruikt dan wordt kleur vervangen door HEX waarde i.p.v. rgba waarde en vervalt de transparantie en zie je achtergornd afbeelding dus ook niet meer.`}
                                readOnly={!managePortalSettings}
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
                            <InputTextColorPicker
                                label="2. Login pagina/ header tekst kleur"
                                divSize={'col-sm-8'}
                                name={'loginHeaderBackgroundTextColor'}
                                value={loginHeaderBackgroundTextColor}
                                onChangeAction={this.handleInputChange}
                                readOnly={!managePortalSettings}
                                required={'required'}
                                error={this.state.errors.loginHeaderBackgroundTextColor}
                            />
                        </div>
                        <div className="row">
                            <InputTextColorPicker
                                label="3. Header - menu/poppetje kleur"
                                divSize={'col-sm-8'}
                                name={'headerIconsColor'}
                                value={headerIconsColor}
                                onChangeAction={this.handleInputChange}
                                readOnly={!managePortalSettings}
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
                            <InputTextColorPicker
                                label="4. Login pagina tekstveld achtergrond kleur"
                                divSize={'col-sm-8'}
                                name={'loginFieldBackgroundColor'}
                                value={loginFieldBackgroundColor}
                                onChangeAction={this.handleInputChange}
                                readOnly={!managePortalSettings}
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
                            <InputTextColorPicker
                                label="5. Login pagina tekstveld tekst kleur"
                                divSize={'col-sm-8'}
                                name={'loginFieldBackgroundTextColor'}
                                value={loginFieldBackgroundTextColor}
                                onChangeAction={this.handleInputChange}
                                readOnly={!managePortalSettings}
                                required={'required'}
                                error={this.state.errors.loginFieldBackgroundTextColor}
                            />
                        </div>
                        <div className="row">
                            <InputTextColorPicker
                                label="6. Menu achtergrond kleur / welkomsttitel tekst kleur"
                                divSize={'col-sm-8'}
                                name={'portalBackgroundColor'}
                                value={portalBackgroundColor}
                                onChangeAction={this.handleInputChange}
                                readOnly={!managePortalSettings}
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
                                    backgroundColor: '#ffffff',
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
                            <InputTextColorPicker
                                label="7. Menu achtergrond tekst kleur"
                                divSize={'col-sm-8'}
                                name={'portalBackgroundTextColor'}
                                value={portalBackgroundTextColor}
                                onChangeAction={this.handleInputChange}
                                readOnly={!managePortalSettings}
                                required={'required'}
                                error={this.state.errors.portalBackgroundTextColor}
                            />
                        </div>
                        <div className="row">
                            <InputTextColorPicker
                                label="8. Buttonknop / Profielcirkel kleur"
                                divSize={'col-sm-8'}
                                name={'buttonColor'}
                                value={buttonColor}
                                onChangeAction={this.handleInputChange}
                                readOnly={!managePortalSettings}
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
                            <InputTextColorPicker
                                label="9. Buttonknop / Profielcirkel tekst kleur"
                                divSize={'col-sm-8'}
                                name={'buttonTextColor'}
                                value={buttonTextColor}
                                onChangeAction={this.handleInputChange}
                                readOnly={!managePortalSettings}
                                required={'required'}
                                error={this.state.errors.buttonTextColor}
                            />
                        </div>
                        <div className="row">
                            <InputTextColorPicker
                                label="10. Algmene achtergrond kleur"
                                divSize={'col-sm-8'}
                                name={'portalMainBackgroundColor'}
                                value={portalMainBackgroundColor}
                                size={'col-sm-4'}
                                textToolTip={`Let op: geen donkere achtergrond kleur kiezen dan wordt zwarte tekst slecht leesbaar.`}
                                onChangeAction={this.handleInputChange}
                                readOnly={!managePortalSettings}
                                required={'required'}
                                error={this.state.errors.portalMainBackgroundColor}
                            />
                            <span
                                className="rc-color-picker-trigger"
                                unselectable="unselectable"
                                style={{
                                    backgroundColor: portalMainBackgroundColor,
                                    color: portalMainTextColor,
                                    border: '1px solid #999',
                                    display: 'inline-block',
                                    padding: '2px',
                                    borderRadius: '2px',
                                    width: '150px',
                                    height: '30px',
                                    boxShadow: '0 0 0 2px #fff inset',
                                }}
                            >
                                Algemene tekst
                            </span>
                        </div>
                        {/*<div className="row">*/}
                        {/*    <InputTextColorPicker*/}
                        {/*        label="11. Algemene tekst kleur"*/}
                        {/*        divSize={'col-sm-8'}*/}
                        {/*        name={'portalMainTextColor'}*/}
                        {/*        value={portalMainTextColor}*/}
                        {/*        onChangeAction={this.handleInputChange}*/}
                        {/*        readOnly={!managePortalSettings}*/}
                        {/*        required={'required'}*/}
                        {/*        error={this.state.errors.portalMainTextColor}*/}
                        {/*    />*/}
                        {/*</div>*/}
                        {this.state.showModalUploadImage && (
                            <PortalImageUpload
                                closeUploadImage={this.closeUploadImage}
                                addImage={this.addImage}
                                imageItemName={this.state.imageItemName}
                                acceptedFiles={['image/png']}
                                acceptedExtenties={'PNG'}
                            />
                        )}
                        {this.state.showModalCropImage && (
                            <PortalImageCrop
                                closeShowCrop={this.closeShowCrop}
                                useAutoCropper={this.state.useAutoCropper}
                                image={this.state.image}
                                imageItemName={this.state.imageItemName}
                                cropImage={this.cropImage}
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
                            attachmentImageBgLogin={this.state.attachmentImageBgLogin}
                            imageBgLoginUrl={imageBgLoginUrl}
                            portalMainBackgroundColor={portalMainBackgroundColor}
                            portalMainTextColor={portalMainTextColor}
                            portalBackgroundColor={portalBackgroundColor}
                            portalBackgroundTextColor={portalBackgroundTextColor}
                            loginHeaderBackgroundColor={loginHeaderBackgroundColor}
                            loginHeaderBackgroundTextColor={loginHeaderBackgroundTextColor}
                            headerIconsColor={headerIconsColor}
                            loginFieldBackgroundColor={loginFieldBackgroundColor}
                            loginFieldBackgroundTextColor={loginFieldBackgroundTextColor}
                            buttonColor={buttonColor}
                            buttonTextColor={buttonTextColor}
                            dashboardSettings={this.props.dashboardSettings}
                        />
                    )}
                    {this.state.showPreviewPortalDashboardPagePc && (
                        <PreviewPortalDashboardPagePcModal
                            closeModal={this.togglePreviewPortalDashboardPagePc}
                            setShowMenu={this.setShowMenu}
                            showMenu={this.state.showMenu}
                            imageHash={this.state.imageHash}
                            attachmentLogoHeader={this.state.attachmentLogoHeader}
                            logoHeaderUrl={logoHeaderUrl}
                            attachmentImageBgHeader={this.state.attachmentImageBgHeader}
                            imageBgHeaderUrl={imageBgHeaderUrl}
                            portalMainBackgroundColor={portalMainBackgroundColor}
                            portalMainTextColor={portalMainTextColor}
                            portalBackgroundColor={portalBackgroundColor}
                            portalBackgroundTextColor={portalBackgroundTextColor}
                            loginHeaderBackgroundColor={loginHeaderBackgroundColor}
                            loginHeaderBackgroundTextColor={loginHeaderBackgroundTextColor}
                            headerIconsColor={headerIconsColor}
                            loginFieldBackgroundColor={loginFieldBackgroundColor}
                            loginFieldBackgroundTextColor={loginFieldBackgroundTextColor}
                            buttonColor={buttonColor}
                            buttonTextColor={buttonTextColor}
                            dashboardSettings={this.props.dashboardSettings}
                        />
                    )}
                    {this.state.showPreviewPortalLoginPageMobile && (
                        <PreviewPortalLoginPageMobileModal
                            closeModal={this.togglePreviewPortalLoginPageMobile}
                            imageHash={this.state.imageHash}
                            attachmentLogo={this.state.attachmentLogo}
                            logoUrl={logoUrl}
                            attachmentImageBgLogin={this.state.attachmentImageBgLogin}
                            imageBgLoginUrl={imageBgLoginUrl}
                            portalMainBackgroundColor={portalMainBackgroundColor}
                            portalMainTextColor={portalMainTextColor}
                            portalBackgroundColor={portalBackgroundColor}
                            portalBackgroundTextColor={portalBackgroundTextColor}
                            loginHeaderBackgroundColor={loginHeaderBackgroundColor}
                            loginHeaderBackgroundTextColor={loginHeaderBackgroundTextColor}
                            headerIconsColor={headerIconsColor}
                            loginFieldBackgroundColor={loginFieldBackgroundColor}
                            loginFieldBackgroundTextColor={loginFieldBackgroundTextColor}
                            buttonColor={buttonColor}
                            buttonTextColor={buttonTextColor}
                            dashboardSettings={this.props.dashboardSettings}
                        />
                    )}
                    {this.state.showPreviewPortalDashboardPageMobile && (
                        <PreviewPortalDashboardPageMobileModal
                            closeModal={this.togglePreviewPortalDashboardPageMobile}
                            setShowMenu={this.setShowMenu}
                            showMenu={this.state.showMenu}
                            imageHash={this.state.imageHash}
                            attachmentLogoHeader={this.state.attachmentLogoHeader}
                            logoHeaderUrl={logoHeaderUrl}
                            attachmentImageBgHeader={this.state.attachmentImageBgHeader}
                            imageBgHeaderUrl={imageBgHeaderUrl}
                            portalMainBackgroundColor={portalMainBackgroundColor}
                            portalMainTextColor={portalMainTextColor}
                            portalBackgroundColor={portalBackgroundColor}
                            portalBackgroundTextColor={portalBackgroundTextColor}
                            loginHeaderBackgroundColor={loginHeaderBackgroundColor}
                            loginHeaderBackgroundTextColor={loginHeaderBackgroundTextColor}
                            headerIconsColor={headerIconsColor}
                            loginFieldBackgroundColor={loginFieldBackgroundColor}
                            loginFieldBackgroundTextColor={loginFieldBackgroundTextColor}
                            buttonColor={buttonColor}
                            buttonTextColor={buttonTextColor}
                            dashboardSettings={this.props.dashboardSettings}
                        />
                    )}
                </Panel>
            </form>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ fetchSystemData }, dispatch);

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(PortalSettingsLayoutDetailsFormGeneralEdit);
