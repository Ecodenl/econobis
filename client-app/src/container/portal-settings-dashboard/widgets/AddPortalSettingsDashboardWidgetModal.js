import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from '../../../components/modal/Modal';
import InputText from '../../../components/form/InputText';
import InputTextArea from '../../../components/form/InputTextarea';
import PortalSettingsDashboardAPI from '../../../api/portal-settings-dashboard/PortalSettingsDashboardAPI';
import { Col } from 'react-bootstrap';
import AddPortalSettingsDashboardWidgetImageCropModal from './AddPortalSettingsDashboardWidgetImageCropModal';
const Dropzone = require('react-dropzone').default;

const AddPortalSettingsDashboardWidgetModal = ({ title, toggleModal, addWidget }) => {
    const [widget, setWidget] = useState({
        title: '',
        text: '',
        image: '',
        imageName: '',
        buttonText: '',
        buttonLink: '',
        active: true,
    });
    const [showCropImageModal, setShowCropImageModal] = useState();

    function onDropAccepted(file) {
        setWidget({
            ...widget,
            image: file[0],
            imageName: file[0].name,
        });
        setShowCropImageModal(true);
    }

    function onDropRejected() {
        alert('Er is wat fout gegaan.');
    }

    const closeNewWidgetImage = () => {
        setNewWidgetImage(false);
    };

    const closeShowCropWidgetImage = () => {
        setWidget({
            ...widget,
            image: '',
            imageName: '',
        });
        setShowCropImageModal(false);
    };

    function cropWidgetImage(file) {
        setWidget({
            ...widget,
            image: file,
            imageName: file.name,
        });
        setShowCropImageModal(false);
    }

    function addWidgetAction() {
        if (!Object.values(widget).join('')) {
            alert('Vul alle velden in.');
            return;
        }

        const data = new FormData();
        data.append('title', widget.title);
        data.append('text', widget.text);
        data.append('image', widget.image);
        data.append('buttonText', widget.buttonText);
        data.append('buttonLink', widget.buttonLink);

        PortalSettingsDashboardAPI.addDashboardWidget(data)
            .then(response => {
                addWidget(response.data);
                toggleModal();
            })
            .catch(error => {
                console.log(error);
            });
    }

    function handleInputChange(e) {
        setWidget({
            ...widget,
            [e.target.name]: e.target.value,
        });
    }

    return (
        <Modal
            closeModal={toggleModal}
            showConfirmAction={true}
            title={title}
            buttonConfirmText={'Toevoegen'}
            confirmAction={addWidgetAction}
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
                        onChangeAction={handleInputChange}
                    />
                </Col>
                <Col sm={12} style={{ paddingLeft: '30px', paddingRight: '30px' }}>
                    <InputTextArea
                        sizeInput={'col-sm-12'}
                        size={'col-sm-12'}
                        label={'Tekst'}
                        name={'text'}
                        value={widget.text}
                        onChangeAction={handleInputChange}
                    />
                </Col>
                <Col sm={12} style={{ paddingLeft: '30px', paddingRight: '30px' }}>
                    <label>Afbeelding</label>
                    {!!widget.imageName && <b>&nbsp;geslecteerd bestand: {widget.imageName}</b>}
                    <Dropzone
                        accept="image/png"
                        multiple={false}
                        className="dropzone"
                        onDropAccepted={onDropAccepted.bind(this)}
                        onDropRejected={onDropRejected.bind(this)}
                        maxSize={6000000}
                    >
                        <p>Klik hier voor het uploaden van een bestand</p>
                        <p>
                            <strong>of</strong> sleep het bestand hierheen
                        </p>
                    </Dropzone>
                </Col>
                <Col sm={5}>
                    <InputText
                        divSize={'col-sm-12'}
                        labelSize={'col-sm-12'}
                        size={'col-sm-12'}
                        label={'Knoptekst'}
                        name={'buttonText'}
                        value={widget.buttonText}
                        onChangeAction={handleInputChange}
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
                        onChangeAction={handleInputChange}
                    />
                </Col>
            </div>
            {showCropImageModal && (
                <AddPortalSettingsDashboardWidgetImageCropModal
                    closeShowCropWidgetImage={closeShowCropWidgetImage}
                    image={widget.image}
                    cropLogo={cropWidgetImage}
                />
            )}
        </Modal>
    );
};

AddPortalSettingsDashboardWidgetModal.defaultProps = {
    title: 'Widget toevoegen',
};

AddPortalSettingsDashboardWidgetModal.propTypes = {
    title: PropTypes.string,
    toggleModal: PropTypes.func.isRequired,
};

export default AddPortalSettingsDashboardWidgetModal;
