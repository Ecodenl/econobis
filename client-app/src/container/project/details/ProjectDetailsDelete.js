import React from 'react';
import { useDispatch } from 'react-redux';

import Modal from '../../../components/modal/Modal';
import { deleteProject } from '../../../actions/project/ProjectDetailsActions';

const ProjectDetailsDelete = ({ id, closeDeleteItemModal }) => {
    const dispatch = useDispatch();

    const confirmAction = () => {
        dispatch(deleteProject(id));
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
            <p>Weet u zeker dat u dit project wilt verwijderen?</p>
        </Modal>
    );
};

export default ProjectDetailsDelete;
