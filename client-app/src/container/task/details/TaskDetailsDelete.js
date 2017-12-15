import React from 'react';
import { hashHistory } from 'react-router';

import Modal from '../../../components/modal/Modal';
import TaskDetailsAPI from '../../../api/task/TaskDetailsAPI';

const TaskDetailsDelete = (props) => {
    const confirmAction = () => {
        TaskDetailsAPI.deleteTask(props.id).then((payload) => {
            hashHistory.push('/taken');
        });
    };

    return (
      <Modal
          buttonConfirmText="Verwijder"
          buttonClassName={'btn-danger'}
          closeModal={props.closeDeleteItemModal}
          confirmAction={() => confirmAction()}
          title="Verwijderen"
      >
          <p>Verwijder taak: <strong> {`${props.name}` } </strong></p>
        </Modal>
    );
};

export default TaskDetailsDelete;
