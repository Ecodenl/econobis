import React from 'react';
import { useDispatch } from 'react-redux';

import Modal from '../../../components/modal/Modal';
import { deleteTask } from '../../../actions/task/TaskDetailsActions';

const TaskDetailsDelete = ({ id, noteSummary, closeDeleteItemModal }) => {
    const dispatch = useDispatch();

    const confirmAction = () => {
        dispatch(deleteTask(id));
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
                Verwijder taak: <strong>{noteSummary}</strong>
            </p>
        </Modal>
    );
};

export default TaskDetailsDelete;
