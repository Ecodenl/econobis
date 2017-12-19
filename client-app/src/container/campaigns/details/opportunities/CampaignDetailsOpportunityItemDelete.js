import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../components/modal/Modal';
import { fetchCampaign } from '../../../../actions/CampaignsActions';
import CampaignAPI from "../../../../api/CampaignAPI";

const CampaignDetailsOpportunityItemDelete = (props) => {
    const confirmAction = () => {
        CampaignAPI.dissociateOpportunity(props.opportunityId).then(() => {
            props.fetchCampaign(props.campaignId);
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
            <p>Wil je deze kans ontkoppelen van deze campagne?</p>



        </Modal>
    );
};

const mapStateToProps = (state) => {
    return {
        campaignId: state.campaign.id,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchCampaign: (id) => {
        dispatch(fetchCampaign(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(CampaignDetailsOpportunityItemDelete);
