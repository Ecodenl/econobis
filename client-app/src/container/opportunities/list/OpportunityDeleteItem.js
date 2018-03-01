import React from 'react';

import Modal from '../../../components/modal/Modal';
import OpportunityAPI from '../../../api/opportunity/OpportunityDetailsAPI';


const OpportunityDeleteItem = (props) => {

    const confirmAction = () => {
        OpportunityAPI.deleteOpportunity(props.id).then(() => {
            props.fetchOpportunitiesData();
        });
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
            Verwijder kans van contact <strong>{ props.contactName }</strong> met maatregel <strong>{ props.measureCategoryName }</strong>?
      </Modal>
    );
};

export default OpportunityDeleteItem;
