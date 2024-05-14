import React from 'react';
import Modal from '../../../components/modal/Modal';
import { deleteOpportunity } from '../../../actions/opportunity/OpportunityDetailsActions';
import { connect } from 'react-redux';

const OpportunityDeleteItem = props => {
    const confirmAction = () => {
        props.deleteOpportunity(props.id);
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
            Verwijder kans van contact <strong>{props.contactName}</strong> met maatregel{' '}
            <strong>{props.measureCategoryName}</strong>?
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteOpportunity: id => {
        dispatch(deleteOpportunity(id));
    },
});

export default connect(null, mapDispatchToProps)(OpportunityDeleteItem);
