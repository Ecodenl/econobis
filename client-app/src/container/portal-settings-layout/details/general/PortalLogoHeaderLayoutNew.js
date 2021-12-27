import React, { Component } from 'react';
const Dropzone = require('react-dropzone').default;

import Modal from '../../../../components/modal/Modal';

class PortalLogoHeaderLayoutNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
            errorMaxSize: false,
        };
    }

    onDropAccepted(file) {
        this.props.addLogoHeader(file);
        setTimeout(() => {
            this.props.toggleShowNewLogoHeader();
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
                closeModal={this.props.toggleShowNewLogoHeader}
                showConfirmAction={false}
                title="Upload logo bestand (PNG) tbv de portaal header"
            >
                <p>Alleen image bestanden met bestandstype PNG kunnen gebruikt worden.</p>
                <p>
                    Maximale hoogte van image zal 100px zijn. Maximale breedte van image zal 450px zijn als window
                    breedte &gt; 480px is en 150px als window breedte &lt; 480px. Breedte/Hoogte verhouding logo blijft
                    behouden. Aanbevolen afmeting (in pixels): tussen de 450x100 voor maximale benutting op een PC of
                    100x100 voor best view op een mobiel.
                </p>
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

export default PortalLogoHeaderLayoutNew;
