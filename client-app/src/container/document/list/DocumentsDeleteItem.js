import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../components/modal/Modal';
import { deleteDocument } from '../../../actions/document/DocumentsActions';

const DocumentsDeleteItem = props => {
    const confirmAction = () => {
        props.deleteDocument(props.id);
        props.closeDeleteItemModal();
    };

    return (
        <Modal
            buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={props.closeDeleteItemModal}
            confirmAction={() => confirmAction()}
            title="Verwijderen"
        >
            Verwijder document: <strong> {props.filename} </strong>
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteDocument: id => {
        dispatch(deleteDocument(id));
    },
});

export default connect(
    null,
    mapDispatchToProps
)(DocumentsDeleteItem);
