import React from 'react';
import {connect} from 'react-redux';

import MeasureDetailsOpportunityItem from "./MeasureDetailsOpportunityItem";

const MeasureDetailsOpportunityList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-2">Kans</div>
                <div className="col-sm-3">Datum</div>
                <div className="col-sm-3">Contact</div>
                <div className="col-sm-3">Campagne</div>
                <div className="col-sm-1"></div>
            </div>
            {
                props.opportunities.length > 0 ?
                    props.opportunities.map(opportunity => {
                        return <MeasureDetailsOpportunityItem
                            key={opportunity.id}
                            opportunity={opportunity}
                        />;
                    })
                    :
                    <div>Geen gerelateerde kansen bekend</div>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        opportunities: state.measure.opportunities,
    };
};
export default connect(mapStateToProps)(MeasureDetailsOpportunityList);

