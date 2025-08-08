import React from 'react';
import { useDispatch } from 'react-redux';

import Modal from '../../../components/modal/Modal';
import { deleteOpportunity } from '../../../actions/opportunity/OpportunityDetailsActions';

const OpportunityDetailsDelete = ({ id, contactId, closeDeleteItemModal }) => {
    const dispatch = useDispatch();

    const confirmAction = () => {
        dispatch(deleteOpportunity(id, contactId));
        closeDeleteItemModal();
    };

    return (
        <Modal
            buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={closeDeleteItemModal}
            confirmAction={confirmAction}
            title="Verwijderen"
        >
            <p>Weet u zeker dat u deze kans wilt verwijderen?</p>
        </Modal>
    );
};

export default OpportunityDetailsDelete;
