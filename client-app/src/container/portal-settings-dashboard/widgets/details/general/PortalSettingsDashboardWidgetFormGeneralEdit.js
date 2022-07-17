import React, { Component } from 'react';
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
                buttonText: false,
                buttonLink: false,
                widgetImageFileName: false,
                backgroundColor: false,
                textColor: false,
            },
            errorMessage: {},
        };
    }

    togglePreviewPortalLoginPagePc = () => {
        this.setState({ showPreviewPortalLoginPagePc: !this.state.showPreviewPortalLoginPagePc });
    };

    togglePreviewPortalDashboardPagePc = () => {
        this.setState({ showPreviewPortalDashboardPagePc: !this.state.showPreviewPortalDashboardPagePc });
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
        });
    };

    handleReactSelectChange = (selectedOption, name) => {
        this.setState({
            ...this.state,
            widget: {
                ...this.state.widget,
                [name]: selectedOption,
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
        data.append('title', widget.title);
        data.append('text', widget.text);
        data.append('image', widget.image);
        data.append('buttonText', widget.buttonText);
        data.append('buttonLink', widget.buttonLink);
        data.append('widgetImageFileName', widget.widgetImageFileName);
        data.append('showGroupId', widget.showGroupId ? widget.showGroupId : '');
        data.append('backgroundColor', widget.backgroundColor);
        data.append('textColor', widget.textColor);

        this.setState({ ...this.state, errors: errors });

        PortalSettingsDashboardAPI.updatePortalSettingsDashboardWidget(widget.id, data)
            .then(payload => {
                console.log(payload);
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

        const imageUrl = `${URL_API}/portal/images/${widget.widgetImageFileName}?${this.props.imageHash}`;
        const { managePortalSettings = {} } = this.props.permissions;

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
                                    marginLeft: '20px',
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
                                label={'Toon voor groep'}
                                divSize={'col-sm-8'}
                                name={'showGroupId'}
                                options={this.props.contactGroups}
                                value={widget.showGroupId}
                                onChangeAction={this.handleReactSelectChange}
                                isLoading={this.props.isLoading}
                                clearable={true}
                            />
                            {/*<ViewText*/}
                            {/*    label={'Toon voor groep'}*/}
                            {/*    value={widget.showGroupId == null ? 'Alle groepen' : widget.contactGroup.name}*/}
                            {/*    divSize={'col-sm-8'}*/}
                            {/*    className={'col-sm-8 form-group'}*/}
                            {/*/>*/}
                        </div>
                        <div className="row">
                            <InputTextColorPicker
                                label="Widget achtergrond kleur"
                                divSize={'col-sm-8'}
                                name={'backgroundColor'}
                                value={widget.backgroundColor}
                                onChangeAction={this.handleInputChange}
                                readOnly={!managePortalSettings}
                                required={'required'}
                                error={this.state.errors.backgroundColor}
                            />
                            <span
                                className="rc-color-picker-trigger"
                                unselectable="unselectable"
                                style={{
                                    backgroundColor: widget.backgroundColor,
                                    color: widget.textColor,
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
                            previewFromDashboardWidget={true}
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
                    {this.state.showPreviewPortalDashboardPageMobile && (
                        <PreviewPortalDashboardPageMobileModal
                            previewFromDashboardWidget={true}
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

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        // portalSettingsDashboards: state.systemData.portalSettingsDashboards,
    };
};

// const mapDispatchToProps = dispatch => bindActionCreators({ fetchSystemData }, dispatch);
const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(PortalSettingsDashboardWidgetFormGeneralEdit);
