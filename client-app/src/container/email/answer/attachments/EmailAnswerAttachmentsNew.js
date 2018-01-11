import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

import Modal from '../../../../components/modal/Modal';

class EmailAnswerAttachmentsNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
        };
    };

    onDrop(files) {
        this.props.addAttachment(files);
        this.props.toggleShowNew();
    }

    render() {
        return (
            <Modal
                closeModal={this.props.toggleShowNew}
                showConfirmAction={false}
                title="Upload file"
            >
                <div className="upload-file-content">
                    <Dropzone className="dropzone" onDrop={this.onDrop.bind(this)}>
                        <p>Druk hier voor het uploaden van een file</p>
                        <p><strong>of</strong> sleep het bestand hierheen</p>
                    </Dropzone>
                </div>
                {
                    this.state.error && <p className="has-error-message">Uploaden mislukt. Probeer nogmaals een bestand te uploaden.</p>
                }
            </Modal>
        );
    }
};



export default EmailAnswerAttachmentsNew;

