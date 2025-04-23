import React, { Component } from 'react';
import { getApiUrl } from '../../../../../api/utils/ApiUrl';

import { connect } from 'react-redux';
import Image from 'react-bootstrap/es/Image';
import moment from 'moment';
import validator from 'validator';

moment.locale('nl');

import ButtonText from '../../../../../components/button/ButtonText';
import InputText from '../../../../../components/form/InputText';
import InputTextArea from '../../../../../components/form/InputTextArea';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import PortalImageCrop from '../../../../../components/imageUploadAndCrop/PortalImageCrop';
import PortalImageUpload from '../../../../../components/imageUploadAndCrop/PortalImageUpload';
import PreviewPortalDashboardPagePcModal from '../../../../portal-settings-preview/PreviewPortalDashboardPagePcModal';
import PreviewPortalDashboardPageMobileModal from '../../../../portal-settings-preview/PreviewPortalDashboardPageMobileModal';
import PortalSettingsDashboardAPI from '../../../../../api/portal-settings-dashboard/PortalSettingsDashboardAPI';
import InputTextColorPicker from '../../../../../components/form/InputTextColorPicker';
import InputReactSelect from '../../../../../components/form/InputReactSelect';
import InputToggle from '../../../../../components/form/InputToggle';

class PortalSettingsDashboardWidgetFormGeneralEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showPreviewPortalDashboardPagePc: false,
            showPreviewPortalDashboardPageMobile: false,
            showMenu: false,
            widget: {
                ...props.portalSettingsDashboardWidget,
            },
            dashboardSettings: {
                ...props.dashboardSettings,
            },
            imageHash: Date.now(),
            image: '',
            imageItemName: '',
            showModalUploadImage: false,
            showModalCropImage: false,
            useAutoCropper: true,
            errors: {
                title: false,
                text: false,
                image: false,
                showGroupId: false,
                hideGroupId: false,
                buttonText: false,
                buttonLink: false,
                widgetImageFileName: false,
                backgroundColor: false,
                textColor: false,
            },
            errorMessage: {},
        };
    }

    togglePreviewPortalDashboardPagePc = () => {
        this.setState({ showPreviewPortalDashboardPagePc: !this.state.showPreviewPortalDashboardPagePc });
    };

    togglePreviewPortalDashboardPageMobile = () => {
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
        this.setState({
            ...this.state,
            widget: {
                ...this.state.widget,
                image: file,
                widgetImageFileName: file.name,
            },
            dashboardSettings: {
                ...this.state.dashboardSettings,
                widgets: this.state.dashboardSettings.widgets.map(widget => {
                    if (widget.id == this.state.widget.id) {
                        return {
                            ...this.state.widget,
                            image: file,
                            widgetImageFileName: file.name,
                        };
                    } else {
                        return widget;
                    }
                }),
            },
            showModalCropImage: false,
        });
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            widget: {
                ...this.state.widget,
                [name]: value,
            },
            dashboardSettings: {
                ...this.state.dashboardSettings,
                widgets: this.state.dashboardSettings.widgets.map(widget => {
                    if (widget.id == this.state.widget.id) {
                        return {
                            ...this.state.widget,
                            [name]: value,
                        };
                    } else {
                        return widget;
                    }
                }),
            },
        });
    };

    handleReactSelectChange = (selectedOption, name) => {
        this.setState({
            ...this.state,
            widget: {
                ...this.state.widget,
                [name]: selectedOption,
            },
            dashboardSettings: {
                ...this.state.dashboardSettings,
                widgets: this.state.dashboardSettings.widgets.map(widget => {
                    if (widget.id == this.state.widget.id) {
                        return {
                            ...this.state.widget,
                            [name]: selectedOption,
                        };
                    } else {
                        return widget;
                    }
                }),
            },
        });
    };
    handleSubmit = event => {
        event.preventDefault();

        const { widget } = this.state;

        let errors = {};
        let errorMessage = {};
        let hasErrors = false;

        if (validator.isEmpty(widget.title)) {
            errors.title = true;
            errorMessage.title = 'Titel verplicht veld.';
            hasErrors = true;
        }
        if (validator.isEmpty(widget.text)) {
            errors.text = true;
            errorMessage.text = 'Tekst verplicht veld.';
            hasErrors = true;
        }
        if (validator.isEmpty(widget.widgetImageFileName)) {
            errors.image = true;
            errorMessage.image = 'Afbeelding verplicht veld.';
            hasErrors = true;
        }
        if (validator.isEmpty(widget.buttonText)) {
            errors.buttonText = true;
            errorMessage.buttonText = 'Knoptekst verplicht veld.';
            hasErrors = true;
        }
        if (validator.isEmpty(widget.buttonLink)) {
            errors.buttonLink = true;
            errorMessage.buttonLink = 'Knoplink verplicht veld.';
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors, errorMessage: errorMessage });

        if (hasErrors) return;

        const data = new FormData();
        // data.append('portalSettingsDashboardId', widget.portalSettingsDashboardId);
        data.append('order', widget.order);
        data.append('title', widget.title);
        data.append('active', widget.active);
        data.append('text', widget.text);
        data.append('image', widget.image);
        data.append('buttonText', widget.buttonText);
        data.append('buttonLink', widget.buttonLink);
        data.append('widgetImageFileName', widget.widgetImageFileName);
        data.append('showGroupId', widget.showGroupId ? widget.showGroupId : '');
        data.append('hideGroupId', widget.hideGroupId ? widget.hideGroupId : '');
        data.append('backgroundColor', widget.backgroundColor);
        data.append('textColor', widget.textColor);

        this.setState({ ...this.state, errors: errors });

        PortalSettingsDashboardAPI.updatePortalSettingsDashboardWidget(widget.id, data)
            .then(payload => {
                this.props.updateState(payload.data.data);
                this.props.switchToView();
            })
            .catch(error => {
                console.log(error);
                alert('Er is iets mis gegaan met opslaan!');
            });
    };

    render() {
        const { widget, errors, errorMessage } = this.state;

        const imageUrl = `${getApiUrl()}/portal/images/${widget.widgetImageFileName}?${this.props.imageHash}`;
        const { managePortalSettings = {} } = this.props.permissions;

        const logoHeaderUrl = `${getApiUrl()}/portal/images/logo-header.png?${this.props.imageHash}`;
        const imageBgHeaderUrl = `${getApiUrl()}/portal/images/background-header.png?${this.props.imageHash}`;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel>
                    <PanelBody>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="btn-group btn-group-flex" role="group">
                                    <ButtonText
                                        buttonText="Preview dashboard pagina PC"
                                        onClickAction={this.togglePreviewPortalDashboardPagePc}
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
                        <div className={'row'}>
                            <InputText
                                label={'Titel'}
                                divSize={'col-sm-8'}
                                name={'title'}
                                value={widget.title}
                                onChangeAction={this.handleInputChange}
                                readOnly={!managePortalSettings}
                                required={'required'}
                                error={errors.title}
                                errorMessage={errorMessage.title}
                            />
                        </div>
                        <div className="row">
                            <InputToggle
                                label={'Actief'}
                                divSize={'col-sm-8'}
                                name={'active'}
                                value={Boolean(widget.active)}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label="Afbeelding (bestandstype PNG of JPG)"
                                divSize={'col-sm-8'}
                                name={'widgetImageFileName'}
                                value={widget.image ? widget.image.name : widget.widgetImageFileName}
                                onClickAction={() => {
                                    this.toggleUploadImage('image-widget');
                                }}
                                onChangeaction={() => {}}
                                readOnly={!managePortalSettings}
                                required={'required'}
                                error={this.state.errors.widgetImageFileName}
                            />
                            <Image
                                src={widget.image && widget.image.preview ? widget.image.preview : imageUrl}
                                // thumbnail={true}
                                style={{
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
                            <InputTextArea
                                label={'Tekst'}
                                size={'col-sm-8'}
                                sizeLabel={'col-sm-6'}
                                sizeInput={'col-sm-6'}
                                name={'text'}
                                value={widget.text}
                                onChangeAction={this.handleInputChange}
                                readOnly={!managePortalSettings}
                                required={'required'}
                                error={errors.text}
                                errorMessage={errorMessage.text}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label={'Knoptekst'}
                                divSize={'col-sm-8'}
                                name={'buttonText'}
                                value={widget.buttonText}
                                onChangeAction={this.handleInputChange}
                                readOnly={!managePortalSettings}
                                required={'required'}
                                error={errors.buttonText}
                                errorMessage={errorMessage.buttonText}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label={'Knoplink'}
                                divSize={'col-sm-8'}
                                name={'buttonLink'}
                                value={widget.buttonLink}
                                onChangeAction={this.handleInputChange}
                                readOnly={!managePortalSettings}
                                required={'required'}
                                error={errors.buttonLink}
                                errorMessage={errorMessage.buttonLink}
                            />
                        </div>
                        <div className="row">
                            <InputReactSelect
                                label={'Zichtbaar voor groep'}
                                divSize={'col-sm-8'}
                                name={'showGroupId'}
                                size={'col-sm-5'}
                                textToolTip={`Je kan maar één groep kiezen, als je meerdere groepen deze widget wil laten tonen kan je onder groepenbeheer > + knop een samengestelde groep maken.`}
                                options={this.props.contactGroups}
                                value={widget.showGroupId}
                                onChangeAction={this.handleReactSelectChange}
                                isLoading={this.props.isLoading}
                                clearable={true}
                            />
                        </div>
                        <div className="row">
                            <InputReactSelect
                                label={'Verborgen voor groep'}
                                divSize={'col-sm-8'}
                                name={'hideGroupId'}
                                size={'col-sm-5'}
                                textToolTip={`Je kan maar één groep kiezen, als je meerdere groepen deze widget wil laten verbergen kan je onder groepenbeheer > + knop een samengestelde groep maken.`}
                                options={this.props.contactGroups}
                                value={widget.hideGroupId}
                                onChangeAction={this.handleReactSelectChange}
                                isLoading={this.props.isLoading}
                                clearable={true}
                            />
                        </div>
                        <div className="row">
                            <InputTextColorPicker
                                label="Widget achtergrond kleur"
                                divSize={'col-sm-8'}
                                name={'backgroundColor'}
                                value={widget.backgroundColor}
                                defaultValue={
                                    widget.backgroundColor ? widget.backgroundColor : widget.backgroundColorUsed
                                }
                                // size={'col-sm-4'}
                                // textToolTip={`Let op: geen donkere achtergrond kleur kiezen dan wordt zwarte titel slecht leesbaar.`}
                                onChangeAction={this.handleInputChange}
                                readOnly={!managePortalSettings}
                                required={'required'}
                                error={this.state.errors.backgroundColor}
                            />
                            <span
                                className="rc-color-picker-trigger"
                                unselectable="unselectable"
                                style={{
                                    backgroundColor: widget.backgroundColor
                                        ? widget.backgroundColor
                                        : widget.backgroundColorUsed,
                                    color: widget.textColor ? widget.textColor : widget.textColorUsed,
                                    border: '1px solid #999',
                                    display: 'inline-block',
                                    padding: '2px',
                                    borderRadius: '2px',
                                    width: '150px',
                                    height: '30px',
                                    boxShadow: '0 0 0 2px #fff inset',
                                }}
                            >
                                Widget tekst
                            </span>
                        </div>
                        <div className="row">
                            <InputTextColorPicker
                                label="Widget tekst kleur"
                                divSize={'col-sm-8'}
                                name={'textColor'}
                                value={widget.textColor}
                                defaultValue={widget.textColor ? widget.textColor : widget.textColorUsed}
                                onChangeAction={this.handleInputChange}
                                readOnly={!managePortalSettings}
                                required={'required'}
                                error={this.state.errors.textColor}
                            />
                        </div>
                        {this.state.showModalUploadImage && (
                            <PortalImageUpload
                                closeUploadImage={this.closeUploadImage}
                                addImage={this.addImage}
                                imageItemName={this.state.imageItemName}
                                acceptedFiles={['image/png', 'image/jpeg']}
                                acceptedExtenties={'PNG of JPG'}
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
                    {this.state.showPreviewPortalDashboardPagePc && (
                        <PreviewPortalDashboardPagePcModal
                            closeModal={this.togglePreviewPortalDashboardPagePc}
                            setShowMenu={this.setShowMenu}
                            showMenu={this.state.showMenu}
                            imageHash={this.state.imageHash}
                            attachmentLogoHeader={''}
                            logoHeaderUrl={logoHeaderUrl}
                            attachmentImageBgHeader={''}
                            imageBgHeaderUrl={imageBgHeaderUrl}
                            portalMainBackgroundColor={this.props.defaultPortalSettingsLayout.portalMainBackgroundColor}
                            portalMainTextColor={this.props.defaultPortalSettingsLayout.portalMainTextColor}
                            portalBackgroundColor={this.props.defaultPortalSettingsLayout.portalBackgroundColor}
                            portalBackgroundTextColor={this.props.defaultPortalSettingsLayout.portalBackgroundTextColor}
                            loginHeaderBackgroundColor={
                                this.props.defaultPortalSettingsLayout.loginHeaderBackgroundColor
                            }
                            loginHeaderBackgroundTextColor={
                                this.props.defaultPortalSettingsLayout.loginHeaderBackgroundTextColor
                            }
                            headerIconsColor={this.props.defaultPortalSettingsLayout.headerIconsColor}
                            loginFieldBackgroundColor={this.props.defaultPortalSettingsLayout.loginFieldBackgroundColor}
                            loginFieldBackgroundTextColor={
                                this.props.defaultPortalSettingsLayout.loginFieldBackgroundTextColor
                            }
                            buttonColor={this.props.defaultPortalSettingsLayout.buttonColor}
                            buttonTextColor={this.props.defaultPortalSettingsLayout.buttonTextColor}
                            dashboardSettings={this.state.dashboardSettings}
                        />
                    )}
                    {this.state.showPreviewPortalDashboardPageMobile && (
                        <PreviewPortalDashboardPageMobileModal
                            closeModal={this.togglePreviewPortalDashboardPageMobile}
                            setShowMenu={this.setShowMenu}
                            showMenu={this.state.showMenu}
                            imageHash={this.state.imageHash}
                            attachmentLogoHeader={''}
                            logoHeaderUrl={logoHeaderUrl}
                            attachmentImageBgHeader={''}
                            imageBgHeaderUrl={imageBgHeaderUrl}
                            portalMainBackgroundColor={this.props.defaultPortalSettingsLayout.portalMainBackgroundColor}
                            portalMainTextColor={this.props.defaultPortalSettingsLayout.portalMainTextColor}
                            portalBackgroundColor={this.props.defaultPortalSettingsLayout.portalBackgroundColor}
                            portalBackgroundTextColor={this.props.defaultPortalSettingsLayout.portalBackgroundTextColor}
                            loginHeaderBackgroundColor={
                                this.props.defaultPortalSettingsLayout.loginHeaderBackgroundColor
                            }
                            loginHeaderBackgroundTextColor={
                                this.props.defaultPortalSettingsLayout.loginHeaderBackgroundTextColor
                            }
                            headerIconsColor={this.props.defaultPortalSettingsLayout.headerIconsColor}
                            loginFieldBackgroundColor={this.props.defaultPortalSettingsLayout.loginFieldBackgroundColor}
                            loginFieldBackgroundTextColor={
                                this.props.defaultPortalSettingsLayout.loginFieldBackgroundTextColor
                            }
                            buttonColor={this.props.defaultPortalSettingsLayout.buttonColor}
                            buttonTextColor={this.props.defaultPortalSettingsLayout.buttonTextColor}
                            dashboardSettings={this.state.dashboardSettings}
                        />
                    )}
                </Panel>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(PortalSettingsDashboardWidgetFormGeneralEdit);
