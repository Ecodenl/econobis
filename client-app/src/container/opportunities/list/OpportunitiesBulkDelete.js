import React from 'react';

import Modal from '../../../components/modal/Modal';
import OpportunityDetailsAPI from '../../../api/opportunity/OpportunityDetailsAPI';
import { setError } from '../../../actions/general/ErrorActions';
import { useDispatch } from 'react-redux';

const OpportunitiesBulkDelete = props => {
    const dispatch = useDispatch();

    const confirmAction = () => {
        if (props.opportunityIds && props.opportunityIds.length > 0) {
            OpportunityDetailsAPI.deleteBulkOpportunities(props.opportunityIds)
                .then(payload => {
                    if (payload.data.length > 0) {
                        dispatch(setError(200, payload.data));
                    }
                    props.confirmActionsBulkDelete();
                })
                .catch(error => {
                    console.log('hier de error:');
                    console.log(error);
                    props.confirmActionsBulkDelete();
                });
        }
    };

    return (
        <Modal
            buttonConfirmText="Verwijderen kansen"
            buttonClassName={'btn-danger'}
            closeModal={props.closeBulkDeleteModal}
            confirmAction={() => confirmAction()}
            title="Verwijderen kansen"
        >
            Verwijder alle <strong>{props.opportunityIds.length} geselecteerde kansen.</strong> Weet je het zeker?
        </Modal>
    );
};

export default OpportunitiesBulkDelete;
