import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Modal from '../../../components/modal/Modal';
import { deleteTask } from '../../../actions/task/TaskDetailsActions';

const TaskDetailsDelete = ({ id, noteSummary, closeDeleteItemModal }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const deleteSuccess = useSelector(state => state.taskDetails?.deleteSuccess);

    const confirmAction = () => {
        dispatch(deleteTask(id));
        closeDeleteItemModal();
    };

    useEffect(() => {
        if (deleteSuccess) {
            navigate('/taken');
            dispatch({ type: 'RESET_DELETE_TASK_SUCCESS' });
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
                Verwijder taak: <strong>{noteSummary}</strong>
            </p>
        </Modal>
    );
};

export default TaskDetailsDelete;
