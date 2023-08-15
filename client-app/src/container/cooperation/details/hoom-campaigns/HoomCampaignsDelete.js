import React from 'react';

import Modal from '../../../../components/modal/Modal';
import CooperationDetailsAPI from '../../../../api/cooperation/CooperationDetailsAPI';

const HoomCampaignsDelete = props => {
    const confirmAction = () => {
        CooperationDetailsAPI.deleteHoomCampaign(props.hoomCampaign.id)
            .then(payload => {
                props.toggleDelete();
                props.removeResult(props.hoomCampaign.id);
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
                Wil je deze campagne <strong>{props.hoomCampaign.campaignName}</strong> met maatregel{' '}
                <strong>{props.hoomCampaign.measureId ? props.hoomCampaign.measureName : '- Alle -'}</strong>{' '}
                ontkoppelen van cooperatie?
            </p>
        </Modal>
    );
};

export default HoomCampaignsDelete;
