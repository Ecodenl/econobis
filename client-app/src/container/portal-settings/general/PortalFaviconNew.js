import React, { Component } from 'react';
const Dropzone = require('react-dropzone').default;

import Modal from '../../../components/modal/Modal';

class PortalFaviconNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
            errorMaxSize: false,
        };
    }

    onDropAccepted(file) {
        this.props.addFavicon(file);
        setTimeout(() => {
            this.props.toggleShowNewFavicon();
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
                closeModal={this.props.toggleShowNewFavicon}
                showConfirmAction={false}
                title="Upload favicon bestand (ICO)"
            >
                <div className="upload-file-content">
                    <Dropzone
                        accept=".ico"
                        multiple={false}
                        className="dropzone"
                        onDropAccepted={this.onDropAccepted.bind(this)}
                        onDropRejected={this.onDropRejected.bind(this)}
                        maxSize={1000000}
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
                        Uploaden mislukt. Het bestand moet bestandstype ICO zijn en mag maximaal 1MB groot zijn.
                    </p>
                )}
            </Modal>
        );
    }
}

export default PortalFaviconNew;
