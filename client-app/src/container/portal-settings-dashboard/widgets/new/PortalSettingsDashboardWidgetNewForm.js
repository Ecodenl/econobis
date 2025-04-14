import React, { Component } from 'react';
import { connect } from 'react-redux';
import Image from 'react-bootstrap/lib/Image';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import validator from 'validator';

moment.locale('nl');

import ButtonText from '../../../../components/button/ButtonText';
import InputText from '../../../../components/form/InputText';
import InputTextArea from '../../../../components/form/InputTextArea';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import PortalImageCrop from '../../../../components/imageUploadAndCrop/PortalImageCrop';
import PortalImageUpload from '../../../../components/imageUploadAndCrop/PortalImageUpload';
import PortalSettingsDashboardAPI from '../../../../api/portal-settings-dashboard/PortalSettingsDashboardAPI';
import ContactGroupAPI from '../../../../api/contact-group/ContactGroupAPI';
import InputReactSelect from '../../../../components/form/InputReactSelect';
import InputTextColorPicker from '../../../../components/form/InputTextColorPicker';

// Functionele wrapper voor de class component
const PortalSettingsDashboardWidgetNewFormWrapper = props => {
    const navigate = useNavigate();
    return <PortalSettingsDashboardWidgetNewForm {...props} navigate={navigate} />;
};

class PortalSettingsDashboardWidgetNewForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            widget: {
                // todo wm: check anders
                portalSettingsDashboardId: 1,
                title: '',
                text: '',
                image: '',
                widgetImageFileName: '',
                showGroupId: '',
                hideGroupId: '',
                buttonText: '',
                buttonLink: '',
                backgroundColor: '',
                textColor: '',
                active: true,
            },
            contactGroups: {},
            contactGroupsLoading: false,
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

    componentDidMount() {
        this.callFetchContactGroups();
    }

    callFetchContactGroups = () => {
        this.setState({ contactGroupsLoading: true });
        ContactGroupAPI.peekContactGroups()
            .then(payload => {
                this.setState({
                    contactGroupsLoading: false,
                    contactGroups: payload,
                });
            })
            .catch(error => {
                this.setState({ contactGroupsLoading: false });
            });
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
        data.append('portalSettingsDashboardId', widget.portalSettingsDashboardId);
        data.append('title', widget.title);
        data.append('text', widget.text);
        data.append('image', widget.image);
        data.append('buttonText', widget.buttonText);
        data.append('buttonLink', widget.buttonLink);
        data.append('widgetImageFileName', widget.widgetImageFileName);
        data.append('showGroupId', widget.showGroupId);
        data.append('hideGroupId', widget.hideGroupId);
        data.append('backgroundColor', widget.backgroundColor);
        data.append('textColor', widget.textColor);

        this.setState({ ...this.state, errors: errors });

        PortalSettingsDashboardAPI.addPortalSettingsDashboardWidget(data)
            .then(response => {
                this.props.navigate(`/portal-instellingen-dashboard`);
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
                                label={'Zichtbaar voor groep'}
                                divSize={'col-sm-8'}
                                name={'showGroupId'}
                                options={this.state.contactGroups}
                                value={widget.showGroupId}
                                onChangeAction={this.handleReactSelectChange}
                                isLoading={this.state.contactGroupsLoading}
                            />
                        </div>
                        <div className="row">
                            <InputReactSelect
                                label={'Verborgen voor groep'}
                                divSize={'col-sm-8'}
                                name={'hideGroupId'}
                                options={this.state.contactGroups}
                                value={widget.hideGroupId}
                                onChangeAction={this.handleReactSelectChange}
                                isLoading={this.state.contactGroupsLoading}
                            />
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
                                buttonText={'Opslaan'}
                                onClickAction={this.handleSubmit}
                                type={'submit'}
                                value={'Submit'}
                            />
                        </div>
                    </PanelBody>
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

export default connect(mapStateToProps, mapDispatchToProps)(PortalSettingsDashboardWidgetNewFormWrapper);
