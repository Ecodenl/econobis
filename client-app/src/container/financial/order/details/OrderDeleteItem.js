import React from 'react';
import { useDispatch } from 'react-redux';

import Modal from '../../../../components/modal/Modal';
import { deleteOrder } from '../../../../actions/order/OrdersActions';

const OrderDeleteItem = ({ id, subject, closeDeleteItemModal }) => {
    const dispatch = useDispatch();

    const confirmAction = () => {
        dispatch(deleteOrder(id));
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
            Verwijder Order: <strong> {subject} </strong>?
        </Modal>
    );
};

export default OrderDeleteItem;
