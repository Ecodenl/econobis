import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../../components/modal/Modal';
import { deleteRevenuesKwh } from '../../../../../actions/project/ProjectDetailsActions';

const RevenuesKwhListFormDelete = props => {
    const confirmAction = () => {
        props.deleteRevenuesKwh(props.id);
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
            <p>Verwijder opbrengst?</p>
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteRevenuesKwh: id => {
        dispatch(deleteRevenuesKwh(id));
    },
});

export default connect(null, mapDispatchToProps)(RevenuesKwhListFormDelete);
