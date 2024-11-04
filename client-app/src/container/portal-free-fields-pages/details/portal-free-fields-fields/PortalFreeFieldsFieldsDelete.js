import React from 'react';

import Modal from '../../../../components/modal/Modal';
import PortalFreeFieldsPageAPI from '../../../../api/portal-free-fields/PortalFreeFieldsPageAPI';

const PortalFreeFieldsFieldsDelete = props => {
    const confirmAction = () => {
        PortalFreeFieldsPageAPI.deletePortalFreeFieldsField(props.portalFreeFieldsField.id)
            .then(payload => {
                props.toggleDelete();
                props.removeResult(props.portalFreeFieldsField.id);
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
                Wil je dit vrije veld <strong>{props.portalFreeFieldsField.freeFieldsField.fieldName}</strong>{' '}
                ontkoppelen van deze vrije veld pagina?
            </p>
        </Modal>
    );
};

export default PortalFreeFieldsFieldsDelete;
