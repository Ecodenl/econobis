import React, { Component } from 'react';
import Modal from '../modal/Modal';
const Dropzone = require('react-dropzone').default;

class DropZone extends Component {
    constructor(props) {
        super(props);

        this.state = {
            maxSize: props.maxSize,
            maxSizeText: props.maxSizeText,
            error: false,
            errorMaxSize: false,
        };
    }

    onDropAccepted(files) {
        this.props.addUpload(files);
        setTimeout(() => {
            this.props.toggleShowUpload();
        }, 500);
    }

    onDropRejected() {
        this.setState({
            errorMaxSize: true,
        });
    }

    render() {
        return (
            <Modal closeModal={this.props.toggleShowUpload} showConfirmAction={false} title="Upload bestand">
                <div className="upload-file-content">
                    <Dropzone
                        className="dropzone"
                        onDropAccepted={this.onDropAccepted.bind(this)}
                        onDropRejected={this.onDropRejected.bind(this)}
                        maxSize={this.state.maxSize}
                    >
                        <p>Klik hier voor het uploaden van een bestand</p>
                        <p>
                            <strong>of</strong> sleep het bestand hierheen
                        </p>
                    </Dropzone>
                </div>
                {this.state.error && (
                    <p className="has-error">Uploaden mislukt. Probeer nogmaals een bestand te uploaden.</p>
                )}
                {this.state.errorMaxSize && (
                    <p className="has-error">
                        Uploaden mislukt. Het bestand mag maximaal {this.state.maxSizeText} groot zijn.
                    </p>
                )}
            </Modal>
        );
    }
}

export default DropZone;
