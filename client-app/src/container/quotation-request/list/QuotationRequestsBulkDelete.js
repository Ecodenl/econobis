import React from 'react';

import Modal from '../../../components/modal/Modal';
import QuotationRequestDetailsAPI from '../../../api/quotation-request/QuotationRequestDetailsAPI';
import { setError } from '../../../actions/general/ErrorActions';
import { useDispatch } from 'react-redux';

const QuotationRequestsBulkDelete = props => {
    const dispatch = useDispatch();

    const confirmAction = () => {
        if (props.quotationRequestIds && props.quotationRequestIds.length > 0) {
            QuotationRequestDetailsAPI.deleteBulkQuotationRequests(props.quotationRequestIds)
                .then(payload => {
                    if (payload.data.length > 0) {
                        dispatch(setError(200, payload.data));
                    }
                    props.confirmActionsBulkDelete();
                })
                .catch(error => {
                    console.log('hier de error:');
                    console.log(error);
                });
        }
        props.confirmActionsBulkDelete();
    };

    return (
        <Modal
            buttonConfirmText="Verwijderen kansacties"
            buttonClassName={'btn-danger'}
            closeModal={props.closeBulkDeleteModal}
            confirmAction={() => confirmAction()}
            title="Verwijderen kansacties"
        >
            Verwijder alle <strong>{props.quotationRequestIds.length} geselecteerde kansacties.</strong> Weet je het
            zeker?
        </Modal>
    );
};

export default QuotationRequestsBulkDelete;
