import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../components/modal/Modal';
import { fetchCampaign } from '../../../../actions/CampaignsActions';
import CampaignAPI from "../../../../api/CampaignAPI";

const CampaignDetailsOrganisationDelete = (props) => {
    const confirmAction = () => {
        CampaignAPI.dettachOrganisation(props.organisationId).then(() => {
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

export default connect(mapStateToProps, mapDispatchToProps)(CampaignDetailsOrganisationDelete);
