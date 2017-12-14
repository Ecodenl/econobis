import React from 'react';
import { connect } from 'react-redux';

import { fetchOpportunities } from '../../../actions/OpportunitiesActions';
import Modal from '../../../components/modal/Modal';
import OpportunityAPI from './../../../api/OpportunityAPI';


const OpportunityDeleteItem = (props) => {

    const confirmAction = () => {
        OpportunityAPI.deleteOpportunity(props.id).then(() => {
            props.fetchOpportunities();
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
            Verwijder kans van contact <strong>{ props.contactName }</strong> met maatregel <strong>{ props.measureName }</strong>?
      </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    fetchOpportunities: () => {
        dispatch(fetchOpportunities());
    },
});

export default connect(null, mapDispatchToProps)(OpportunityDeleteItem);
