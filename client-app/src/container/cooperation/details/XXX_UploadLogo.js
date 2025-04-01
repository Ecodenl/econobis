import React, { useState } from 'react';
const Dropzone = require('react-dropzone').default;

import Modal from '../../../components/modal/Modal';

function CooperationUploadLogo({ addAttachment, toggleShowUploadLogo }) {
    const [errorMaxSize, setErrorMaxSize] = useState(false);

    function onDropAccepted(file) {
        addAttachment(file[0]);
        setTimeout(() => {
            toggleShowUploadLogo();
        }, 500);
    }

    function onDropRejected() {
        setErrorMaxSize(true);
    }

    return (
        <Modal closeModal={toggleShowUploadLogo} showConfirmAction={false} title="Upload bestand">
            <div className="upload-file-content">
                <Dropzone
                    accept="image/jpeg, image/png, image/jpg"
                    multiple={false}
                    className="dropzone"
                    onDropAccepted={onDropAccepted}
                    onDropRejected={onDropRejected}
                    maxSize={6291456}
                >
                    <p>Klik hier voor het uploaden van een bestand</p>
                    <p>
                        <strong>of</strong> sleep het bestand hierheen
                    </p>
                </Dropzone>
            </div>
            {errorMaxSize && (
                <p className="has-error-message">Uploaden mislukt. Het bestand mag maximaal 6MB groot zijn.</p>
            )}
        </Modal>
    );
}

export default CooperationUploadLogo;
