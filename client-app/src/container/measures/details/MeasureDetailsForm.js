import React, {Component} from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import MeasureFormGeneral from './form/MeasureFormGeneral';
import MeasureDetailsFaqs from './FAQs/MeasureDetailsFaqs';
// import CampaignDetailsConclusionForm from './conclusion/CampaignDetailsConclusionForm';
// import CampaignDetailsOpportunities from './opportunities/CampaignDetailsOpportunities';
// import CampaignDetailsResponses from "./responses/CampaignDetailsResponses";
// import CampaignDetailsOrganisations from "./organisations/CampaignDetailsOrganisations";

class MeasureDetailsForm extends Component {
    constructor(props){
        super(props);
    };


    render() {

        return (
            isEmpty(this.props.measure) ?
                <div>Geen gegevens gevonden!</div>
                :
                <div>
                    <MeasureFormGeneral />
                    <MeasureDetailsFaqs />
                    {/*<CampaignDetailsResponses />*/}
                    {/*<CampaignDetailsOrganisations />*/}
                    {/*<CampaignDetailsConclusionForm />*/}
                </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        measure: state.measure,
    }
};

export default connect(mapStateToProps)(MeasureDetailsForm);
