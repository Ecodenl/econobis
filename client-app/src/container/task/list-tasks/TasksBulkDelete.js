import React from 'react';

import Modal from '../../../components/modal/Modal';
import TaskDetailsAPI from '../../../api/task/TaskDetailsAPI';
import { setError } from '../../../actions/general/ErrorActions';
import { useDispatch } from 'react-redux';

const TasksBulkDelete = props => {
    const dispatch = useDispatch();

    const confirmAction = () => {
        if (props.taskIds && props.taskIds.length > 0) {
            TaskDetailsAPI.deleteBulkTasks(props.taskIds)
                .then(payload => {
                    if (payload.data.length > 0) {
                        dispatch(setError(200, payload.data));
                    }
                    props.confirmActionsBulkDelete();
                })
                .catch(error => {
                    console.log('hier de error:');
                    console.log(error);
                    props.confirmActionsBulkDelete();
                });
        }
    };

    return (
        <Modal
            buttonConfirmText="Verwijderen taken"
            buttonClassName={'btn-danger'}
            closeModal={props.closeBulkDeleteModal}
            confirmAction={() => confirmAction()}
            title="Verwijderen taken"
        >
            Verwijder alle <strong>{props.taskIds.length} geselecteerde taken.</strong> Weet je het zeker?
        </Modal>
    );
};

export default TasksBulkDelete;
