import React from 'react';
import { connect } from 'react-redux';

import Modal from '../../../../components/modal/Modal';
import { fetchCampaign } from '../../../../actions/campaign/CampaignDetailsActions';
import CampaignDetailsAPI from '../../../../api/campaign/CampaignDetailsAPI';

const CampaignDetailsOrganisationDelete = props => {
    const confirmAction = () => {
        CampaignDetailsAPI.detachOrganisation(props.campaignId, props.organisationId).then(() => {
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
            <p>Wil je deze organisatie ontkoppelen van deze campagne?</p>
        </Modal>
    );
};

const mapStateToProps = state => {
    return {
        campaignId: state.campaignDetails.id,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchCampaign: id => {
        dispatch(fetchCampaign(id));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CampaignDetailsOrganisationDelete);
