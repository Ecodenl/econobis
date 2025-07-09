import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Modal from '../../../components/modal/Modal';
import { deleteQuotationRequest } from '../../../actions/quotation-request/QuotationRequestDetailsActions';

const QuotationRequestDetailsDelete = ({ id, opportunity, opportunityAction, closeDeleteItemModal }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const confirmAction = () => {
        dispatch(
            deleteQuotationRequest(id, () => {
                // Eerst modal sluiten
                closeDeleteItemModal();

                // Daarna navigeren
                navigate('/offerteverzoeken');
            })
        );
    };

    let opportunityActionName = opportunityAction ? opportunityAction.name : 'actie';
    let measureCategoryName =
        opportunity && opportunity && opportunity.measureCategory ? opportunity.measureCategory.name : '';
    let fullName =
        opportunity && opportunity.intake && opportunity.intake.contact ? opportunity.intake.contact.fullName : '';
    let fullAddress = opportunity && opportunity.intake ? opportunity.intake.fullAddress : '';
    let quotationDeleteText = `${opportunityActionName} ${measureCategoryName} voor ${fullName} op ${fullAddress}`;

    return (
        <Modal
            buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={closeDeleteItemModal}
            confirmAction={confirmAction}
            title="Verwijderen"
        >
            <p>Verwijder {quotationDeleteText}</p>
        </Modal>
    );
};

export default QuotationRequestDetailsDelete;
