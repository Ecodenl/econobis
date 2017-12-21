import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import CampaignFormGeneral from './form/CampaignFormGeneral';
import CampaignDetailsConclusionForm from './conclusion/CampaignDetailsConclusionForm';
import CampaignDetailsOpportunities from './opportunities/CampaignDetailsOpportunities';
import CampaignDetailsResponses from "./responses/CampaignDetailsResponses";
import CampaignDetailsOrganisations from "./organisations/CampaignDetailsOrganisations";

class CampaignDetailsForm extends Component {
    constructor(props){
        super(props);
    };


    render() {

        return (
            isEmpty(this.props.campaign) ?
                <div>Geen gegevens gevonden!</div>
                :
                <div>
                    <CampaignFormGeneral />
                    <CampaignDetailsOpportunities />
                    <CampaignDetailsResponses />
                    <CampaignDetailsOrganisations />
                    <CampaignDetailsConclusionForm />
                </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        campaign: state.campaign,
    }
};

export default connect(mapStateToProps)(CampaignDetailsForm);
