import React from 'react';

import Modal from '../../../../components/modal/Modal';
import CooperationDetailsAPI from '../../../../api/cooperation/CooperationDetailsAPI';

const CleanupContactsExcludedGroupDelete = props => {
    const confirmAction = () => {
        CooperationDetailsAPI.deleteCleanupContactsExcludedGroup(props.cleanupContactsExcludedGroup.id)
            .then(payload => {
                props.toggleDelete();
                props.removeResult(props.cleanupContactsExcludedGroup.id);
            })
            .catch(error => {
                alert('Er is iets misgegaan met opslaan. Probeer het nogmaals');
            });
    };

    return (
        <Modal
            buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={props.toggleDelete}
            confirmAction={() => confirmAction()}
            title="Verwijderen"
        >
            <p>
                Wil je deze uitzonderingsgroep voor opschonen contacten{' '}
                <strong>{props.cleanupContactsExcludedGroup.contactGroupName}</strong> ontkoppelen van cooperatie?
            </p>
        </Modal>
    );
};

export default CleanupContactsExcludedGroupDelete;
