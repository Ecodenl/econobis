import React, { Component } from 'react';
const Dropzone = require('react-dropzone').default;

import Modal from '../../../../components/modal/Modal';

class PortalImageBgLoginLayoutNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
            errorMaxSize: false,
        };
    }

    onDropAccepted(file) {
        this.props.addImageBgLogin(file);
        setTimeout(() => {
            this.props.toggleShowNewImageBgLogin();
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
                closeModal={this.props.toggleShowNewImageBgLogin}
                showConfirmAction={false}
                title="Upload background image bestand (PNG) tbv login pagina"
            >
                <p>Alleen image bestanden met bestandstype PNG kunnen gebruikt worden.</p>
                <p>
                    Breedte en hoogte zijn variabel en afhankelijk van window breedte/hoogte. Image zal gecentreerd over
                    de hele breedte/hoogte getoond worden. Breedte/Hoogte verhouding background image blijft behouden.
                    Aanbevolen afmeting (in pixels): tussen de 800 x450 en 1200x675 voor best view op een PC (verhouding
                    16:9) of 400x800 voor best view op een mobiel (verhouding 1:2).
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

export default PortalImageBgLoginLayoutNew;
