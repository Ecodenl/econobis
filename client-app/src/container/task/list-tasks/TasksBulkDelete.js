import React from 'react';

import Modal from '../../../components/modal/Modal';
import TaskDetailsAPI from '../../../api/task/TaskDetailsAPI';
import { hashHistory } from 'react-router';

const TasksBulkDelete = props => {
    const confirmAction = () => {
        if (props.taskIds && props.taskIds.length > 0) {
            TaskDetailsAPI.deleteBulkTasks(props.taskIds).then(() => {
                props.confirmActionsBulkDelete();
                hashHistory.push(`/taken`);
            });
        }
        props.confirmActionsBulkDelete();
    };

    return (
        <Modal
            buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={props.closeBulkDeleteModal}
            confirmAction={() => confirmAction()}
            title="Verwijderen"
        >
            Verwijder alle <strong>{props.taskIds.length} geselecteerde taken.</strong>
            Weet je het zeker?
        </Modal>
    );
};

export default TasksBulkDelete;
