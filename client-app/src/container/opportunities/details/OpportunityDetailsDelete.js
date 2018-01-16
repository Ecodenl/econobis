import React from 'react';
import { hashHistory } from 'react-router';

import Modal from '../../../components/modal/Modal';
import OpportunityAPI from '../../../api/opportunity/OpportunityDetailsAPI';

const OpportunityDetailsDelete = (props) => {
    const confirmAction = () => {
        OpportunityAPI.deleteOpportunity(props.id).then(() => {
            hashHistory.push('/kansen');
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
            <p>Weet u zeker dat u deze kans wilt verwijderen?</p>
      </Modal>
    );
};

export default OpportunityDetailsDelete;
