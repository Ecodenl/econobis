import React, { Component } from 'react';
const Dropzone = require('react-dropzone').default;

import Modal from '../../../../components/modal/Modal';

class PortalLogoNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
            errorMaxSize: false,
        };
    }

    onDropAccepted(file) {
        this.props.addLogo(file);
        setTimeout(() => {
            this.props.toggleShowNewLogo();
        }, 500);
    }

    onDropRejected() {
        this.setState({
            errorMaxSize: true,
        });
    }

    render() {
        return (
            <Modal
                closeModal={this.props.toggleShowNewLogo}
                showConfirmAction={false}
                title="Upload logo bestand (PNG)"
            >
                <div className="upload-file-content">
                    <Dropzone
                        accept="image/png"
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
                </div>
                {this.state.error && (
                    <p className="has-error-message">Uploaden mislukt. Probeer nogmaals een bestand te uploaden.</p>
                )}
                {this.state.errorMaxSize && (
                    <p className="has-error-message">
                        Uploaden mislukt. Het bestand moet bestandstype PNG zijn en mag maximaal 6MB groot zijn.
                    </p>
                )}
            </Modal>
        );
    }
}

export default PortalLogoNew;
