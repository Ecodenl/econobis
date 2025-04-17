import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Modal from '../../../components/modal/Modal';
import { deleteProject } from '../../../actions/project/ProjectDetailsActions';

const ProjectDetailsDelete = ({ id, closeDeleteItemModal }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const deleteSuccess = useSelector(state => state.projectDetails?.deleteSuccess);

    const confirmAction = () => {
        dispatch(deleteProject(id));
        closeDeleteItemModal();
    };

    useEffect(() => {
        if (deleteSuccess) {
            navigate('/projecten');
            dispatch({ type: 'RESET_DELETE_PROJECT_SUCCESS' });
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
            <p>Weet u zeker dat u dit project wilt verwijderen?</p>
        </Modal>
    );
};

export default ProjectDetailsDelete;
