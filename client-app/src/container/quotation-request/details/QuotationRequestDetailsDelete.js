import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Modal from '../../../components/modal/Modal';
import { deleteQuotationRequest } from '../../../actions/quotation-request/QuotationRequestDetailsActions';

const QuotationRequestDetailsDelete = ({ id, opportunity, opportunityAction, closeDeleteItemModal }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const deleteSuccess = useSelector(state => state.quotationRequestDetails?.deleteSuccess);

    const confirmAction = () => {
        dispatch(deleteQuotationRequest(id));
        closeDeleteItemModal();
    };

    useEffect(() => {
        if (deleteSuccess) {
            navigate('/offerteverzoeken');
            dispatch({ type: 'RESET_DELETE_QUOTATION_REQUEST_SUCCESS' });
        }
    }, [deleteSuccess, navigate, dispatch]);

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
