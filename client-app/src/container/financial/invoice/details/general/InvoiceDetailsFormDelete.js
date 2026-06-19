import React from 'react';
import { useDispatch } from 'react-redux';

import Modal from '../../../../../components/modal/Modal';
import { deleteInvoice } from '../../../../../actions/invoice/InvoiceDetailsActions';

const InvoiceDetailsFormDelete = ({ id, number, closeDeleteItemModal }) => {
    const dispatch = useDispatch();

    const confirmAction = () => {
        dispatch(deleteInvoice(id));
        closeDeleteItemModal();
    };

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
