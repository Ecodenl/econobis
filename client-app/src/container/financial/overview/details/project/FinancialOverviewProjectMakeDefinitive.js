import React from 'react';

import Modal from '../../../../../components/modal/Modal';
import moment from 'moment';

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
            {props.financialOverviewProject.projectDateEntry !== null ? (
                <p className={'text-danger'}>
                    <strong>
                        Standaard ingangsdatum mutaties (
                        {moment(props.financialOverviewProject.projectDateEntry).format('DD-MM-YYYY')}) bij dit project
                        zal komen te vervallen.
                    </strong>
                    <br />
                </p>
            ) : null}

            {props.totalFinancialOverviewProjectsInProgress === 0 &&
            props.totalFinancialOverviewProjectsConcept === 1 ? (
                <p className={'text-danger'}>
                    <strong>
                        Dit is het laatste project dat definitief gemaakt wordt in deze waardestaat. Hiermee wordt de
                        totale waardestaat definitief. Hierna kan je geen wijzigingen meer aanbrengen in deze
                        waardestaat. Weet je het zeker?
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
