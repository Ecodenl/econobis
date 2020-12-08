import React from 'react';

import Modal from '../../../../../components/modal/Modal';

const ProjectDelete = props => {
    // todo WM: opschonen log regels
    console.log('ProjectDelete');
    console.log(props);

    const confirmAction = () => {
        props.deleteProject(props.financialOverviewProject.id);
        props.closeDeleteItemModal();
    };
    let allowDelete = false;
    if (!props.financialOverviewProject.definitive) {
        allowDelete = true;
    }

    return (
        <Modal
            buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={props.closeDeleteItemModal}
            confirmAction={() => confirmAction()}
            showConfirmAction={allowDelete}
            title="Verwijderen"
        >
            <p>
                Verwijder project uit waardestaat: <strong> {`${props.financialOverviewProject.project.name}`} </strong>
            </p>

            {props.financialOverviewProject.definitive ? (
                <p className={'text-danger'}>
                    <strong>Fout!</strong> Dit project heeft al een definitieve waardestaat en kan niet meer worden
                    verwijderd.
                    <br />
                </p>
            ) : null}
        </Modal>
    );
};

// const mapDispatchToProps = dispatch => ({
//     deleteProject: id => {
//         dispatch(deleteProject(id));
//     },
// });

// export default connect(null, mapDispatchToProps)(ProjectDelete);
export default ProjectDelete;
