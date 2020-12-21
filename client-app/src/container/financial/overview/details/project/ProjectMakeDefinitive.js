import React from 'react';

import Modal from '../../../../../components/modal/Modal';

const ProjectMakeDefinitive = props => {
    const confirmAction = () => {
        props.makeDefinitiveProject(props.financialOverviewProject.id);
        props.closeMakeDefinitiveItemModal();
    };
    let allowMakeDefinitive = false;
    if (!props.financialOverviewProject.definitive) {
        allowMakeDefinitive = true;
    }

    return (
        <Modal
            buttonConfirmText="Bevestig"
            buttonClassName={'btn-danger'}
            closeModal={props.closeMakeDefinitiveItemModal}
            confirmAction={() => confirmAction()}
            showConfirmAction={allowMakeDefinitive}
            title="Definitief maken"
        >
            <p>
                Maak project <strong> {`${props.financialOverviewProject.project.name}`} </strong> definitief in
                waardestaat.
            </p>

            {props.financialOverviewProject.definitive ? (
                <p className={'text-danger'}>
                    <strong>Fout!</strong> Dit project is al definitief in waardestaat en kan niet meer worden
                    gewijzigd.
                    <br />
                </p>
            ) : null}
        </Modal>
    );
};

export default ProjectMakeDefinitive;
