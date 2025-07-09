import React from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from '../../../components/modal/Modal';
import TaskDetailsAPI from '../../../api/task/TaskDetailsAPI';

const TaskDetailsDuplicate = props => {
    const navigate = useNavigate();

    const confirmAction = () => {
        TaskDetailsAPI.duplicateTask(props.id).then(payload => {
            const id = payload.data.data.id;

            navigate(`/taak/${id}`);
            props.closeModal();
        });
    };

    return (
        <Modal
            buttonConfirmText="Dupliceer"
            closeModal={props.closeModal}
            confirmAction={() => confirmAction()}
            title="Dupliceer taak"
        >
            <p>
                Dupliceer taak: <strong> {`${props.noteSummary}`} </strong>
            </p>
        </Modal>
    );
};

export default TaskDetailsDuplicate;
