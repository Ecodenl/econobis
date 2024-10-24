import React from 'react';
import PropTypes from 'prop-types';
const Dropzone = require('react-dropzone').default;

import Modal from './Modal';

const UploadModal = ({ title, errors, multiple, maxSize, toggleModal, onDropAccepted, onDropRejected }) => {
    const onDrop = files => {
        setTimeout(() => {
            onDropAccepted(files);
            toggleModal();
        }, 300);
    };

    return (
        <Modal closeModal={toggleModal} showConfirmAction={false} title={title}>
            <div className="upload-file-content">
                <Dropzone
                    className="dropzone"
                    onDropAccepted={onDrop.bind(this)}
                    onDropRejected={onDropRejected.bind(this)}
                    maxSize={maxSize}
                    multiple={multiple}
                >
                    <p>Klik hier voor het uploaden van een file (max. {maxSize / 1048576}MB)</p>
                    <p>
                        <strong>of</strong> sleep het bestand hierheen
                    </p>
                </Dropzone>
            </div>
            {errors.uploadFailed && (
                <p className="has-error-message">Uploaden mislukt. Probeer nogmaals het bestand te uploaden.</p>
            )}
            {errors.uploadMaxSize && (
                <p className="has-error-message">
                    Uploaden mislukt. Het bestand mag maximaal {maxSize / 1048576}MB groot zijn.
                </p>
            )}
        </Modal>
    );
};

UploadModal.defaultProps = {
    errors: {},
    maxSize: 21495808,
    multiple: true,
    title: 'Upload bestand',
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
