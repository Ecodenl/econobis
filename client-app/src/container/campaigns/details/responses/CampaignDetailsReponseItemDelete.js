import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../components/modal/Modal';
import { fetchCampaign } from '../../../../actions/campaign/CampaignDetailsActions';
import CampaignDetailsAPI from '../../../../api/campaign/CampaignDetailsAPI';

const CampaignDetailsReponseItemDelete = props => {
    const confirmAction = () => {
        CampaignDetailsAPI.detachResponse(props.campaignId, props.contactId).then(() => {
            props.fetchCampaign(props.campaignId, null);
            props.toggleDelete();
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
            <p>Wil je deze response ontkoppelen van deze campagne?</p>
        </Modal>
    );
};

const mapStateToProps = state => {
    return {
        campaignId: state.campaignDetails.details.id,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchCampaign: (id, pagination) => {
        dispatch(fetchCampaign(id, pagination));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(CampaignDetailsReponseItemDelete);
