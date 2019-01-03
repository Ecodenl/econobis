import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import CampaignFormGeneral from './form/CampaignFormGeneral';
import CampaignDetailsConclusionForm from './conclusion/CampaignDetailsConclusionForm';
import CampaignDetailsOpportunities from './opportunities/CampaignDetailsOpportunities';
import CampaignDetailsResponses from "./responses/CampaignDetailsResponses";
import CampaignDetailsOrganisations from "./organisations/CampaignDetailsOrganisations";
import CampaignDetailsIntakes from "./intakes/CampaignDetailsIntakes";

class CampaignDetailsForm extends Component {
    constructor(props){
        super(props);
    };

    render() {

        let loadingText = '';
        let loading = true;

        if (this.props.hasError) {
            loadingText = 'Fout bij het ophalen van campagne.';
        }
        else if (this.props.isLoading) {
            loadingText = 'Gegevens aan het laden.';
        }
        else if (isEmpty(this.props.campaign)) {
            loadingText = 'Geen campagne gevonden!';
        }
        else {
            loading = false;
        }

        return (
            loading ?
                <div>{loadingText}</div>
                :
                <div>
                    <CampaignFormGeneral />
                    <CampaignDetailsOrganisations />
                    <CampaignDetailsIntakes />
                    <CampaignDetailsOpportunities />
                    <CampaignDetailsResponses />
                    <CampaignDetailsConclusionForm />
                </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        campaign: state.campaignDetails,
        isLoading: state.loadingData.isLoading,
        hasError: state.loadingData.hasError,
    }
};

export default connect(mapStateToProps)(CampaignDetailsForm);
