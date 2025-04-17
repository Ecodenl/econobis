import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Modal from '../../../components/modal/Modal';
import { deleteOpportunity } from '../../../actions/opportunity/OpportunityDetailsActions';

const OpportunityDetailsDelete = ({ id, contactId, closeDeleteItemModal }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const deleteSuccess = useSelector(state => state.opportunityDetails?.deleteSuccess);

    const confirmAction = () => {
        dispatch(deleteOpportunity(id, contactId));
        closeDeleteItemModal();
    };

    useEffect(() => {
        if (deleteSuccess) {
            if (contactId == 0) {
                navigate(`/kansen`);
            } else {
                navigate(`/contact/` + contactId);
            }
            dispatch({ type: 'RESET_DELETE_OPPORTUNITY_SUCCESS' });
        }
    }, [deleteSuccess, navigate, dispatch]);

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
