import React from 'react';
import {connect} from 'react-redux';

import IntakeDetailsOpportunityItem from "./IntakeDetailsOpportunityItem";

const IntakeDetailsOpportunitiesList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-2">Nummer</div>
                <div className="col-sm-3">Datum</div>
                <div className="col-sm-3">Maatregel</div>
                <div className="col-sm-2">Status</div>
                <div className="col-sm-2">Aantal offertes</div>
            </div>
            {
                props.opportunities.length > 0 ?
                    props.opportunities.map(opportunity => {
                        return <IntakeDetailsOpportunityItem
                            key={opportunity.id}
                            opportunity={opportunity}
                        />;
                    })
                    :
                    <div>Geen kansen bekend.</div>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        opportunities: state.intakeDetails.opportunities,
    };
};

export default connect(mapStateToProps)(IntakeDetailsOpportunitiesList);

