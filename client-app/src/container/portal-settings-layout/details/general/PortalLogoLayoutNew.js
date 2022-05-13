import React, { Component } from 'react';
const Dropzone = require('react-dropzone').default;

import Modal from '../../../../components/modal/Modal';

class PortalLogoLayoutNew extends Component {
    constructor(props) {
        super(props);

        switch (this.props.imageLayoutItemName) {
            case 'logo-login':
                this.title = 'Upload logo bestand (PNG) tbv login pagina';
                this.descriptionImage =
                    'Maximale breedte van image zal 200px zijn.' +
                    ' De hoogte is variabel.' +
                    ' Breedte/Hoogte verhouding logo blijft behouden.' +
                    ' Aanbevolen afmeting (in pixels): 200 x 200.';
                break;
            case 'logo-header':
                this.title = 'Upload logo bestand (PNG) tbv de portaal header';
                this.descriptionImage =
                    'Maximale hoogte van image zal 100px zijn.' +
                    ' Maximale breedte van image zal 200px zijn als window breedte > 480px is en 150px als window breedte < 480px.' +
                    ' Breedte/Hoogte verhouding logo blijft behouden.' +
                    ' Aanbevolen afmeting (in pixels): tussen de 200x100 voor maximale benutting op een PC of 100x100 voor best view op een mobiel.';
                break;
            case 'image-bg-login':
                this.title = 'Upload background image bestand (PNG) tbv login pagina';
                this.descriptionImage =
                    'Breedte en hoogte zijn variabel en afhankelijk van window breedte/hoogte. ' +
                    ' Image zal gecentreerd over de hele breedte/hoogte getoond worden.' +
                    ' Breedte/Hoogte verhouding background image blijft behouden.' +
                    ' Aanbevolen afmeting (in pixels): tussen de 800 x450 en 1200x675 voor best view op een PC (verhouding 16:9) of 400x800 voor best view op een mobiel (verhouding 1:2).';
                break;
            case 'image-bg-header':
                this.title = 'Upload background image bestand (PNG) tbv de portaal header';
                this.descriptionImage =
                    'Maximale hoogte van image zal 128px zijn.' +
                    ' De breedte is afhankelijk van window breedte.' +
                    ' Image zal gecentreerd over de hele breedte getoond worden.' +
                    ' Breedte/Hoogte verhouding background image blijft behouden.' +
                    ' Aanbevolen afmeting (in pixels): tussen de 1200 x 128 voor waarschijnlijk maximale benutting op een PC of 360x128 voor waarschijnlijk maximaal benutting op een mobiel.';
                break;
            default:
                this.title = '';
                this.descriptionImage = '';
                break;
        }

        this.state = {
            error: false,
            errorMaxSize: false,
        };
    }

    onDropAccepted(file) {
        this.props.addLogo(file, this.props.imageLayoutItemName);
        setTimeout(() => {
            this.props.closeNewLogo();
        }, 500);
    }

    onDropRejected() {
        this.setState({
            errorMaxSize: true,
        });
    }

    render() {
        return (
            <Modal closeModal={this.props.closeNewLogo} showConfirmAction={false} title={this.title}>
                <p>Alleen image bestanden met bestandstype PNG kunnen gebruikt worden.</p>
                <p>{this.descriptionImage}</p>
                <div className="upload-file-content">
                    <Dropzone
                        accept="image/png"
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
                        Uploaden mislukt. Het bestand moet bestandstype PNG zijn en mag maximaal 6MB groot zijn.
                    </p>
                )}
            </Modal>
        );
    }
}

export default PortalLogoLayoutNew;
