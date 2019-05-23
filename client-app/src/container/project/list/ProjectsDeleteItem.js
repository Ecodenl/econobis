import React from 'react';

import Modal from '../../../components/modal/Modal';
import ProjectDetailsAPI from '../../../api/project/ProjectDetailsAPI';

const ProjectsDeleteItem = props => {
    const confirmAction = () => {
        ProjectDetailsAPI.deleteProject(props.id).then(() => {
            props.fetchProjectsData();
        });
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
            Verwijder project <strong>{props.code}</strong>?
        </Modal>
    );
};

export default ProjectsDeleteItem;
