import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';

import Modal from '../../../components/modal/Modal';
import InputText from '../../../components/form/InputText';
import InputTextArea from '../../../components/form/InputTextarea';
import PortalSettingsDashboardAPI from '../../../api/portal-settings-dashboard/PortalSettingsDashboardAPI';
import { Col } from 'react-bootstrap';
import PortalLogoLayoutNewCrop from '../../../components/cropImage/portalLayout/PortalLogoLayoutNewCrop';
import validator from 'validator';
import InputToggle from '../../../components/form/InputToggle';
const Dropzone = require('react-dropzone').default;

class AddPortalSettingsDashboardWidgetModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            widget: {
                title: '',
                text: '',
                image: '',
                imageName: '',
                buttonText: '',
                buttonLink: '',
                active: true,
            },
            useAutoCropper: true,
            showCropImageModal: false,
            errors: {
                title: false,
                text: false,
                image: false,
                buttonText: false,
                buttonLink: false,
            },
            errorMessage: {},
        };
    }

    onDropAccepted(file) {
        this.setState({
            ...this.state,
            widget: {
                ...this.state.widget,
                image: file[0],
                imageName: file[0].name,
            },
            showCropImageModal: true,
        });
    }

    onDropRejected() {
        alert('Er is wat fout gegaan.');
    }

    toggleUseAutoCropper = () => {
        this.setState({
            ...this.state,
            useAutoCropper: !this.state.useAutoCropper,
        });
    };

    closeShowCropWidgetImage = () => {
        this.setState({
            ...this.state,
            widget: {
                ...this.state.widget,
                image: '',
                imageName: '',
            },
            showCropImageModal: false,
        });
    };

    cropWidgetImage = file => {
        this.setState({
            ...this.state,
            widget: {
                ...this.state.widget,
                image: file,
                imageName: file.name,
            },
            showCropImageModal: false,
        });
    };

    addWidgetAction = () => {
        let errors = {};
        let errorMessage = {};
        let hasErrors = false;

        const { widget } = this.state;
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
        if (validator.isEmpty(widget.imageName)) {
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
        data.append('title', widget.title);
        data.append('text', widget.text);
        data.append('image', widget.image);
        data.append('buttonText', widget.buttonText);
        data.append('buttonLink', widget.buttonLink);
        data.append('name', widget.imageName);

        PortalSettingsDashboardAPI.addDashboardWidget(data)
            .then(response => {
                this.props.addWidget(response.data);
                this.props.toggleModal();
            })
            .catch(error => {
                console.log(error);
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

    render() {
        const { widget, showCropImageModal, useAutoCropper, errors, errorMessage } = this.state;
        const acceptedFiles = ['image/png', 'image/jpeg'];

        return (
            <div className={'portal-layout-add-widget'}>
                <Modal
                    modalClassName={'modal-portal-layout-add-widget'}
                    closeModal={this.props.toggleModal}
                    showConfirmAction={true}
                    title={this.props.title}
                    buttonConfirmText={'Toevoegen'}
                    confirmAction={this.addWidgetAction}
                >
                    <div className={'row'}>
                        <Col sm={12}>
                            <InputText
                                divSize={'col-sm-12'}
                                labelSize={'col-sm-12'}
                                size={'col-sm-12'}
                                label={'Titel'}
                                name={'title'}
                                value={widget.title}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={errors.title}
                                errorMessage={errorMessage.title}
                            />
                        </Col>
                        <Col sm={12} style={{ paddingLeft: '30px', paddingRight: '30px' }}>
                            <InputTextArea
                                sizeInput={'col-sm-12'}
                                sizeLabel={'col-sm-12'}
                                size={'col-sm-12'}
                                label={'Tekst'}
                                name={'text'}
                                value={widget.text}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={errors.text}
                                errorMessage={errorMessage.text}
                            />
                        </Col>
                        <Col sm={12}>
                            <InputToggle
                                label={'Ik wil het standaard formaat aanhouden'}
                                id={'useAutoCropper'}
                                name={'useAutoCropper'}
                                value={useAutoCropper}
                                onChangeAction={this.toggleUseAutoCropper}
                                divSize={'col-sm-6'}
                                labelSize={'col-sm-6'}
                                size={'col-sm-6'}
                            />
                        </Col>
                        <Col sm={12} style={{ paddingLeft: '30px', paddingRight: '30px' }}>
                            <label className={'col-sm-12 required'}>Afbeelding</label>
                            {!!widget.imageName && <b>&nbsp;Geselecteerd bestand: {widget.imageName}</b>}
                            <Dropzone
                                accept={acceptedFiles}
                                multiple={false}
                                className="dropzone"
                                onDropAccepted={this.onDropAccepted.bind(this)}
                                onDropRejected={this.onDropRejected.bind(this)}
                                maxSize={6000000}
                            >
                                <p>Klik hier voor het uploaden van een bestand</p>
                                <p>
                                    <strong>of</strong> sleep het bestand hierheen
                                </p>
                            </Dropzone>
                            {errors.image && (
                                <div className={'col-sm-12'}>
                                    <span className="has-error-message"> {errorMessage.image}</span>
                                </div>
                            )}
                        </Col>
                        <Col sm={5}>
                            <InputText
                                divSize={'col-sm-12'}
                                labelSize={'col-sm-12'}
                                size={'col-sm-12'}
                                label={'Knoptekst'}
                                name={'buttonText'}
                                value={widget.buttonText}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={errors.buttonText}
                                errorMessage={errorMessage.buttonText}
                            />
                        </Col>
                        <Col sm={7}>
                            <InputText
                                divSize={'col-sm-12'}
                                labelSize={'col-sm-12'}
                                size={'col-sm-12'}
                                label={'Knoplink'}
                                name={'buttonLink'}
                                value={widget.buttonLink}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={errors.buttonLink}
                                errorMessage={errorMessage.buttonLink}
                            />
                        </Col>
                    </div>
                    {showCropImageModal && (
                        <PortalLogoLayoutNewCrop
                            closeShowCrop={this.closeShowCropWidgetImage}
                            useAutoCropper={useAutoCropper}
                            image={widget.image}
                            imageLayoutItemName={'image-widget'}
                            cropLogo={this.cropWidgetImage}
                        />
                    )}
                </Modal>
            </div>
        );
    }
}

export default AddPortalSettingsDashboardWidgetModal;
