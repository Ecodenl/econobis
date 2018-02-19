import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../components/modal/Modal';
import { deleteTask } from '../../../actions/task/TaskDetailsActions';

const TasksDeleteItem = (props) => {
    const confirmAction = () => {
        props.deleteTask(props.id);
        props.closeDeleteItemModal();
    };

    return (
        <Modal
        buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={props.closeDeleteItemModal}
            confirmAction={() => confirmAction()}
            title="Verwijderen"
      >
            Verwijder taak: <strong> { props.name } </strong>
      </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteTask: (id) => {
        dispatch(deleteTask(id));
    },
});

export default connect(null, mapDispatchToProps)(TasksDeleteItem);
