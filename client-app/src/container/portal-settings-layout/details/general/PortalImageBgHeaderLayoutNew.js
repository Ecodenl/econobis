import React, { Component } from 'react';
const Dropzone = require('react-dropzone').default;

import Modal from '../../../../components/modal/Modal';

class PortalImageBgHeaderLayoutNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
            errorMaxSize: false,
        };
    }

    onDropAccepted(file) {
        this.props.addImageBgHeader(file);
        setTimeout(() => {
            this.props.toggleShowNewImageBgHeader();
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
                closeModal={this.props.toggleShowNewImageBgHeader}
                showConfirmAction={false}
                title="Upload background image bestand (PNG) tbv de portaal header"
            >
                <p>Alleen image bestanden met bestandstype PNG kunnen gebruikt worden.</p>
                <p>
                    Maximale hoogte van image zal 128px zijn. De breedte is afhankelijk van window breedte. Image zal
                    gecentreerd over de hele breedte getoond worden. Breedte/Hoogte verhouding background image blijft
                    behouden. Aanbevolen afmeting (in pixels): tussen de 1200 x 128 voor waarschijnlijk maximale
                    benutting op een PC of 360x128 voor waarschijnlijk maximaal benutting op een mobiel.
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

export default PortalImageBgHeaderLayoutNew;
