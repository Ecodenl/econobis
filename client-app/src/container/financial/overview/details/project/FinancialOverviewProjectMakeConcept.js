import React from 'react';

import Modal from '../../../../../components/modal/Modal';

const FinancialOverviewProjectMakeConcept = props => {
    let allowMakeConcept = false;
    if (props.financialOverviewProject.definitive) {
        allowMakeConcept = true;
    }

    return (
        <Modal
            buttonConfirmText="Bevestig"
            buttonClassName={'btn-danger'}
            closeModal={props.closeMakeConceptItemModal}
            confirmAction={props.makeConceptProject}
            showConfirmAction={allowMakeConcept}
            title="Concept maken"
        >
            <p>
                Maak project <strong> {`${props.financialOverviewProject.projectName}`} </strong> weer concept in
                waardestaat.
            </p>

            {!props.financialOverviewProject.definitive ? (
                <p className={'text-danger'}>
                    <strong>Fout!</strong> Dit project is al concept in waardestaat en kan niet meer worden gewijzigd.
                    <br />
                </p>
            ) : null}
        </Modal>
    );
};

export default FinancialOverviewProjectMakeConcept;
