import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../../../components/modal/Modal';
import { deleteRevenuePartsKwh } from '../../../../../../actions/project/ProjectDetailsActions';

const RevenuePartsKwhListFormDelete = props => {
    const confirmAction = () => {
        props.deleteRevenuePartsKwh(props.id);
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
    deleteRevenuePartsKwh: id => {
        dispatch(deleteRevenuePartsKwh(id));
    },
});

export default connect(null, mapDispatchToProps)(RevenuePartsKwhListFormDelete);
