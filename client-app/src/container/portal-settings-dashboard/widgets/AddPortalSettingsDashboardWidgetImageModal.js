import React, { Component } from 'react';
const Dropzone = require('react-dropzone').default;

import Modal from '../../../components/modal/Modal';

class AddPortalSettingsDashboardWidgetImageModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
            errorMaxSize: false,
        };
    }

    onDropAccepted(file) {
        this.props.addWidgetImage(file);
        setTimeout(() => {
            this.props.closeNewWidgetImage();
        }, 500);
    }

    onDropRejected() {
        this.setState({
            errorMaxSize: true,
        });
    }

    render() {
        const acceptedFiles = ['image/png', 'image/jpeg'];
        return (
            <Modal
                closeModal={this.props.closeNewWidgetImage}
                showConfirmAction={false}
                title="Upload widget image bestand (PNG of JPEG)"
            >
                <p>Alleen image bestanden met bestandstype PNG of JPEG kunnen gebruikt worden.</p>
                <p>
                    Breedte en hoogte zijn variabel en afhankelijk van window breedte/hoogte. Breedte/Hoogte verhouding
                    images blijft behouden en images zullen wel volledig getoond worden. Bij genoeg window breedte
                    worden widgets per 2 naast elkaar getoond, anders onder elkaar. Aanbevolen afmeting (in pixels):
                    453x151 (3:1 verhouding).
                </p>
                <div className="upload-file-content">
                    <Dropzone
                        accept={acceptedFiles}
                        multiple={false}
                        className="dropzone"
                        onDropAccepted={this.onDropAccepted.bind(this)}
                        onDropRejected={this.onDropRejected.bind(this)}
                        maxSize={6291456}
                    >
                        <p>Klik hier voor het uploaden van een bestand</p>
                        <p>
                            <strong>of</strong> sleep het bestand hierheen
                        </p>
                    </Dropzone>
                </div>
                {this.state.error && (
                    <p className="has-error-message">Uploaden mislukt. Probeer nogmaals een bestand te uploaden.</p>
                )}
                {this.state.errorMaxSize && (
                    <p className="has-error-message">
                        Uploaden mislukt. Het bestand moet bestandstype PNG of JPEG zijn en mag maximaal 6MB groot zijn.
                    </p>
                )}
            </Modal>
        );
    }
}

export default AddPortalSettingsDashboardWidgetImageModal;
