import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Modal from '../../../../components/modal/Modal';
import { deleteOrder } from '../../../../actions/order/OrdersActions';
import { useNavigate } from 'react-router-dom';

const OrderDeleteItem = ({ id, subject, closeDeleteItemModal }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const deleteSuccess = useSelector(state => state.orderDetails?.deleteSuccess);

    const confirmAction = () => {
        dispatch(deleteOrder(id));
        closeDeleteItemModal();
    };

    useEffect(() => {
        if (deleteSuccess) {
            navigate(-1);
            dispatch({ type: 'RESET_DELETE_ORDER_SUCCESS' });
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
            Verwijder Order: <strong> {subject} </strong>?
        </Modal>
    );
};

export default OrderDeleteItem;
