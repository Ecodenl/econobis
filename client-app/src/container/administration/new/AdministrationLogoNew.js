import React, { Component } from 'react';
const Dropzone = require('react-dropzone').default;

import Modal from '../../../components/modal/Modal';

class AdministrationLogoNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
            errorMaxSize: false,
        };
    }

    onDropAccepted(file) {
        this.props.addAttachment(file);
        setTimeout(() => {
            this.props.closeUploadImage();
        }, 500);
    }

    onDropRejected() {
        this.setState({
            errorMaxSize: true,
        });
    }

    render() {
        return (
            <Modal closeModal={this.props.closeUploadImage} showConfirmAction={false} title="Upload bestand">
                <div className="upload-file-content">
                    <Dropzone
                        accept="image/jpeg, image/png, image/jpg"
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
                    <p className="has-error-message">Uploaden mislukt. Het bestand mag maximaal 6MB groot zijn.</p>
                )}
            </Modal>
        );
    }
}

export default AdministrationLogoNew;
