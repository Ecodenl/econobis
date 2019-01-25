import React from 'react';

import Modal from '../../../components/modal/Modal';
import { deleteProject } from '../../../actions/project/ProjectDetailsActions';
import { connect } from 'react-redux';

const ProjectDetailsDelete = props => {
    const confirmAction = () => {
        props.deleteProject(props.id);
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
            <p>Weet u zeker dat u dit project wilt verwijderen?</p>
        </Modal>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteProject: id => {
        dispatch(deleteProject(id));
    },
});

export default connect(
    null,
    mapDispatchToProps
)(ProjectDetailsDelete);
