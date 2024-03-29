import React, { Component } from 'react';

import Modal from '../../../components/modal/Modal';

class ContactNewFormPersonalDuplicateModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal
                modalClassName={'modal-lg'}
                buttonConfirmText="Aanmaken"
                closeModal={this.props.closeModal}
                confirmAction={this.props.confirmAction}
                title="Duplicaat gevonden"
            >
                <span>{this.props.duplicateText}</span>
            </Modal>
        );
    }
}

export default ContactNewFormPersonalDuplicateModal;
