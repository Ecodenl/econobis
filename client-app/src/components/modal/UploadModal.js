import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import Modal from './Modal';

const UploadModal = ({title, errors, multiple, maxSize, toggleModal, onDropAccepted, onDropRejected}) => {
    const onDrop = (files) => {
        setTimeout(() => {
            onDropAccepted(files);
            toggleModal();
        }, 300);
    };

    return (
        <Modal
            closeModal={toggleModal}
            showConfirmAction={false}
            title={title}
        >
            <div className="upload-file-content">
                <Dropzone className="dropzone" onDropAccepted={onDrop.bind(this)} onDropRejected={onDropRejected.bind(this)} maxSize={maxSize} multiple={multiple}>
                    <p>Klik hier voor het uploaden van een file</p>
                    <p><strong>of</strong> sleep het bestand hierheen</p>
                </Dropzone>
            </div>
            {
                errors.uploadFailed && <p className="has-error-message">Uploaden mislukt. Probeer nogmaals het bestand te uploaden.</p>
            }
            {
                errors.uploadMaxSize && <p className="has-error-message">Uploaden mislukt. Het bestand mag maximaal 2MB groot zijn.</p>
            }
        </Modal>
    );
};

UploadModal.defaultProps = {
    errors: {},
    maxSize: 2000000,
    multiple: true,
    title: 'Upload file'
};

UploadModal.propTypes = {
    errors: PropTypes.object,
    maxSize: PropTypes.number,
    multiple: PropTypes.bool,
    onDropAccepted: PropTypes.func.isRequired,
    onDropRejected: PropTypes.func.isRequired,
    title: PropTypes.string,
    toggleModal: PropTypes.func.isRequired,
};

export default UploadModal;
