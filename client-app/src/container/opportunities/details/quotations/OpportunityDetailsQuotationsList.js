import React from 'react';
import {connect} from 'react-redux';

import OpportunityDetailsQuotationsItem from "./OpportunityDetailsQuotationsItem";

const OpportunityDetailsQuotationsList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-2">Kans</div>
                <div className="col-sm-2">Organisatie</div>
                <div className="col-sm-2">Datum aanvraag</div>
                <div className="col-sm-2">Offerte status</div>
                <div className="col-sm-1">Datum opname</div>
                <div className="col-sm-1">Geldig tot</div>
                <div className="col-sm-1">Datum uitvoering</div>
                <div className="col-sm-1"></div>
            </div>
            {
                props.quotations.length > 0 ?
                    props.quotations.map(quotation => {
                        return <OpportunityDetailsQuotationsItem
                            key={quotation.id}
                            quotation={quotation}
                            opportunityMeasure={props.opportunityMeasure}
                            opportunityStatus={props.opportunityStatus}
                        />;
                    })
                    :
                    <div>Geen offertes bekend</div>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        opportunityMeasure: state.opportunityDetails.measure.name,
        opportunityStatus: state.opportunityDetails.status.name,
        quotations: state.opportunityDetails.quotations,
    };
};
export default connect(mapStateToProps)(OpportunityDetailsQuotationsList);

