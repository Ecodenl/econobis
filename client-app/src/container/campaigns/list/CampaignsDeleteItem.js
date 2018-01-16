import React from 'react';
import { connect } from 'react-redux';

import { fetchCampaigns } from '../../../actions/campaign/CampaignsActions';
import Modal from '../../../components/modal/Modal';
import CampaignDetailsAPI from '../../../api/campaign/CampaignDetailsAPI';

const CampaignsDeleteItem = (props) => {

    const confirmAction = () => {
        CampaignDetailsAPI.deleteCampaign(props.id).then(() => {
            props.fetchCampaigns();
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

const mapDispatchToProps = dispatch => ({
    fetchCampaigns: () => {
        dispatch(fetchCampaigns());
    },
});

export default connect(null, mapDispatchToProps)(CampaignsDeleteItem);
