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
                buttonCancelText={this.props.cancelButtonText}
                closeModal={this.props.closeModal}
                confirmAction={this.props.confirmAction}
                title="Duplicaat gevonden"
            >
                <div dangerouslySetInnerHTML={{ __html: this.props.duplicateText }} />
            </Modal>
        );
    }
}

export default ContactNewFormPersonalDuplicateModal;
