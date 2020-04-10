import React from 'react';

import Modal from '../../../components/modal/Modal';
import { deleteOpportunity } from '../../../actions/opportunity/OpportunityDetailsActions';
import { connect } from 'react-redux';

const OpportunityDetailsDelete = props => {
    const confirmAction = () => {
        props.deleteOpportunity(props.id, props.contactId);
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
            <p>Weet u zeker dat u deze kans wilt verwijderen?</p>
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteOpportunity: (id, contactId) => {
        dispatch(deleteOpportunity(id, contactId));
    },
});

export default connect(
    null,
    mapDispatchToProps
)(OpportunityDetailsDelete);
