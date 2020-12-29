import React from 'react';

import Modal from '../../../../../components/modal/Modal';

const FinancialOverviewProjectMakeDefinitive = props => {
    let allowMakeDefinitive = false;
    if (!props.financialOverviewProject.definitive) {
        allowMakeDefinitive = true;
    }

    return (
        <Modal
            buttonConfirmText="Bevestig"
            buttonClassName={'btn-danger'}
            closeModal={props.closeMakeDefinitiveItemModal}
            confirmAction={props.makeDefinitiveProject}
            showConfirmAction={allowMakeDefinitive}
            title="Definitief maken"
        >
            <p>
                Maak project <strong> {`${props.financialOverviewProject.projectName}`} </strong> definitief in
                waardestaat.
            </p>
            {props.totalFinancialOverviewProjectsInProgress === 0 &&
            props.totalFinancialOverviewProjectsConcept === 1 ? (
                <p className={'text-danger'}>
                    <strong>
                        Dit is laatste project die definitief gemaakt wordt in waardestaat. Hiermee wordt de totale
                        waarde staat definitief. Hierna kan je geen wijzigingen meer doen in deze waarde staat. Weet je
                        het zeker?
                    </strong>
                    <br />
                </p>
            ) : null}

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

export default FinancialOverviewProjectMakeDefinitive;
