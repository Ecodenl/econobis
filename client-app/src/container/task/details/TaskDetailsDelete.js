import React from 'react';

import Modal from '../../../components/modal/Modal';
import { deleteTask } from '../../../actions/task/TaskDetailsActions';
import { connect } from 'react-redux';

const TaskDetailsDelete = props => {
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
            <p>
                Verwijder taak: <strong> {`${props.noteSummary}`} </strong>
            </p>
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteTask: id => {
        dispatch(deleteTask(id));
    },
});

export default connect(
    null,
    mapDispatchToProps
)(TaskDetailsDelete);
