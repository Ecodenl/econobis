import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../../../components/modal/Modal';
import { deleteRevenuePartsKwh, fetchRevenuesKwh } from '../../../../../../actions/project/ProjectDetailsActions';
import RevenuePartsKwhAPI from '../../../../../../api/project/RevenuePartsKwhAPI';

const RevenuePartsKwhListFormDelete = props => {
    const confirmAction = () => {
        RevenuePartsKwhAPI.deleteRevenuePartsKwh(props.id).then(() => {
            props.closeDeleteItemModal();
            props.fetchRevenuesKwh(props.revenueId);
        });
    };

    return (
        <Modal
            buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={props.closeDeleteItemModal}
            confirmAction={() => confirmAction()}
            title="Verwijderen"
        >
            <p>Verwijder laatste opbrengst deelperiode?</p>
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteRevenuePartsKwh: id => {
        dispatch(deleteRevenuePartsKwh(id));
    },
    fetchRevenuesKwh: id => {
        dispatch(fetchRevenuesKwh(id));
    },
});

export default connect(null, mapDispatchToProps)(RevenuePartsKwhListFormDelete);
