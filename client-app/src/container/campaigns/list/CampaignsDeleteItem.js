import React from 'react';

import Modal from '../../../components/modal/Modal';
import CampaignDetailsAPI from '../../../api/campaign/CampaignDetailsAPI';

const CampaignsDeleteItem = (props) => {

    const confirmAction = () => {
        CampaignDetailsAPI.deleteCampaign(props.id).then(() => {
            props.fetchCampaignsData();
        });
        props.closeDeleteItemModal();
    };

    return (
        <Modal
        buttonConfirmText="Verwijder"
            buttonClassName={'btn-danger'}
            closeModal={props.closeDeleteItemModal}
            confirmAction={() => confirmAction()}
            title="Verwijderen"
      >
            Verwijder campagne <strong>{ props.name }</strong>?
      </Modal>
    );
};

export default CampaignsDeleteItem;
