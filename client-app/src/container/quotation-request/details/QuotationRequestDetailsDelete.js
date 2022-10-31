import React from 'react';

import Modal from '../../../components/modal/Modal';
import { deleteQuotationRequest } from '../../../actions/quotation-request/QuotationRequestDetailsActions';
import { connect } from 'react-redux';

const QuotationRequestDetailsDelete = props => {
    const confirmAction = () => {
        props.deleteQuotationRequest(props.id);
        props.closeDeleteItemModal();
    };

    let opportunityActionName = props.opportunityAction ? props.opportunityAction.name : 'actie';
    let measureCategoryName =
        props.opportunity && props.opportunity && props.opportunity.measureCategory
            ? props.opportunity.measureCategory.name
            : '';
    let fullName =
        props.opportunity && props.opportunity.intake && props.opportunity.intake.contact
            ? props.opportunity.intake.contact.fullName
            : '';
    let fullAddress = props.opportunity && props.opportunity.intake ? props.opportunity.intake.fullAddress : '';
    let quotationDeleteText = `${opportunityActionName} ${measureCategoryName} voor ${fullName} op ${fullAddress}`;

    return (
        <Modal
            buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={props.closeDeleteItemModal}
            confirmAction={() => confirmAction()}
            title="Verwijderen"
        >
            <p>Verwijder {quotationDeleteText}</p>
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteQuotationRequest: id => {
        dispatch(deleteQuotationRequest(id));
    },
});

export default connect(null, mapDispatchToProps)(QuotationRequestDetailsDelete);
