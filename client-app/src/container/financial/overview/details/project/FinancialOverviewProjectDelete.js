import React from 'react';

import Modal from '../../../../../components/modal/Modal';

const FinancialOverviewProjectDelete = props => {
    let allowDelete = false;
    if (!props.financialOverviewProject.definitive) {
        allowDelete = true;
    }

    return (
        <Modal
            buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={props.closeDeleteItemModal}
            confirmAction={props.deleteProject}
            showConfirmAction={allowDelete}
            title="Verwijderen"
        >
            <p>
                Verwijder project uit waardestaat: <strong> {`${props.financialOverviewProject.projectName}`} </strong>
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

export default FinancialOverviewProjectDelete;
