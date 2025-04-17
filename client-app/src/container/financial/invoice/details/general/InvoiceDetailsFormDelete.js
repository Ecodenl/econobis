import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Modal from '../../../../../components/modal/Modal';
import { deleteInvoice } from '../../../../../actions/invoice/InvoiceDetailsActions';

const InvoiceDetailsFormDelete = ({ id, number, closeDeleteItemModal }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const deleteSuccess = useSelector(state => state.invoiceDetails?.deleteSuccess);

    const confirmAction = () => {
        dispatch(deleteInvoice(id));
        closeDeleteItemModal();
    };

    useEffect(() => {
        if (deleteSuccess) {
            navigate(-1);
            dispatch({ type: 'RESET_DELETE_INVOICE_SUCCESS' });
        }
    }, [deleteSuccess, navigate, dispatch]);

    return (
        <Modal
            buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={closeDeleteItemModal}
            confirmAction={confirmAction}
            title="Verwijderen"
        >
            <p>
                Verwijder nota: <strong> {`${number}?`}</strong>
            </p>
        </Modal>
    );
};

export default InvoiceDetailsFormDelete;
