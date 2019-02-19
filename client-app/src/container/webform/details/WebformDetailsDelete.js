import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../components/modal/Modal';
import { deleteWebform } from '../../../actions/webform/WebformsActions';
import { hashHistory } from 'react-router';

const WebformDetailsDelete = props => {
    const confirmAction = () => {
        props.deleteWebform(props.id);
        props.closeDeleteItemModal();
        hashHistory.push(`/webformulieren`);
    };

    return (
        <Modal
            buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={props.closeDeleteItemModal}
            confirmAction={() => confirmAction()}
            title="Verwijderen"
        >
            Verwijder webformulier: <strong> {props.name} </strong>
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteWebform: id => {
        dispatch(deleteWebform(id));
    },
});

export default connect(
    null,
    mapDispatchToProps
)(WebformDetailsDelete);
