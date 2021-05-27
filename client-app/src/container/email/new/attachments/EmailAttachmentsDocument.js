import React, { Component } from 'react';

import Modal from '../../../../components/modal/Modal';

class EmailAttachmentsDocument extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
            errorDocumentId: false,
        };
    }

    render() {
        return (
            <Modal closeModal={this.props.toggleSelectDocument} showConfirmAction={false} title="Selecteer document">
                <h1>Under construction</h1>
            </Modal>
        );
    }
}

export default EmailAttachmentsDocument;
