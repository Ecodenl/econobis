import React from 'react';
import { connect } from 'react-redux';

import CampaignDetailsOpportunityItem from './CampaignDetailsOpportunityItem';

const CampaignDetailsOpportunitiesList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-2">Nummer</div>
                <div className="col-sm-2">Datum</div>
                <div className="col-sm-3">Naam</div>
                <div className="col-sm-3">Maatregel categorie</div>
                <div className="col-sm-1">Status</div>
                <div className="col-sm-1">Aantal offertes</div>
                <div className="col-sm-1" />
            </div>
            {props.opportunities.length > 0 ? (
                props.opportunities.map(opportunity => {
                    return <CampaignDetailsOpportunityItem key={opportunity.id} opportunity={opportunity} />;
                })
            ) : (
                <div>Geen kansen bekend.</div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        opportunities: state.campaignDetails.opportunities,
    };
};
export default connect(mapStateToProps)(CampaignDetailsOpportunitiesList);
