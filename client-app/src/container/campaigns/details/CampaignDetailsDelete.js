import React from 'react';
import { hashHistory } from 'react-router';

import Modal from '../../../components/modal/Modal';
import CampaignDetailsAPI from '../../../api/campaign/CampaignDetailsAPI';

const CampaignDetailsDelete = (props) => {
    const confirmAction = () => {
        CampaignDetailsAPI.deleteCampaign(props.id).then(() => {
            hashHistory.push('/campagnes');
        });


    };

    return (
        <Modal
        buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={props.closeDeleteItemModal}
            confirmAction={() => confirmAction()}
            title="Verwijderen"
      >
            <p>Weet u zeker dat u deze campagne wilt verwijderen?</p>
      </Modal>
    );
};

export default CampaignDetailsDelete;
